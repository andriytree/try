function containsChineseCharacters(text) {
  const value = String(text || "");
  return /[\u4e00-\u9fff]/.test(value) || /(感情|单张牌|單張牌|整体总结|整體總結|关键词|關鍵詞|可以采取的行动|可以採取的行動|需要避免的误区|需要避免的誤區|反思问题|反思問題|抽到的牌|牌义解释|牌義解釋)/.test(value);
}
function warnIfChineseText(text, language, field) {
  if (!language.startsWith("zh") && containsChineseCharacters(text)) console.warn(`Chinese characters detected in ${field} for ${language}`);
}

function getNaturalFallback(language = "en", field = "reading") {
  const label = getI18nValue(language, "result.cardReminder") || getI18nValue("en", "result.cardReminder");
  const action = getI18nValue(language, "result.actionAdvice") || getI18nValue("en", "result.actionAdvice");
  const trend = getI18nValue(language, "result.developmentTrend") || getI18nValue("en", "result.developmentTrend");
  if (field.includes("reflection")) return `${label}: ${trend}?`;
  if (field.includes("warning")) return `${label}: ${getI18nValue(language, "result.warning") || getI18nValue("en", "result.warning")}.`;
  return `${label}: ${action}.`;
}

function hasUnsafeVisibleToken(text, language = "en") {
  const value = String(text ?? "");
  const unsafePatterns = [
    /undefined|null|\[object Object\]/i,
    /\b(manyReversed|manyMajor|manyWands|manyCups|manySwords|manyPentacles|cupsSwords|swordsWands|wandsPentacles|cupsPentacles|energyShift|pastMajor|presentReversed|futureReversed)\b/,
    /reflectionQuestion\s*\d+/i,
    /反思問題\s*\d+|反思问题\s*\d+/,
    /professionalAdvice|fallback\.|noAdvice|noWarning|unknown/i,
    /牌面已經展開|牌面已经展开/,
    /本工具不能替代專業建議|本工具不能替代专业建议|does not replace professional advice|professional advice/i
  ];
  return unsafePatterns.some((pattern) => pattern.test(value));
}

function dedupeSentences(text) {
  const parts = String(text || "").split(/(?<=[。！？.!?])\s+/).map((part) => part.trim()).filter(Boolean);
  const seen = new Set();
  return parts.filter((part) => {
    if (seen.has(part)) return false;
    seen.add(part);
    return true;
  }).join(" ");
}

function sanitizeUserVisibleText(text, currentLanguage = "en", field = "reading") {
  const value = dedupeSentences(String(text ?? "").trim());
  if (!value || hasUnsafeVisibleToken(value, currentLanguage)) {
    console.warn(`Unsafe reading text replaced: ${field}`, value);
    return getNaturalFallback(currentLanguage, field);
  }
  warnIfChineseText(value, currentLanguage, field);
  return value;
}

function getBankVariant(list, language, field, seed = "") {
  const candidate = pickVariant(Array.isArray(list) ? list : [], seed);
  return sanitizeUserVisibleText(candidate, language, field);
}

function validateReadingOutput(output, currentLanguage = "en") {
  const serialized = typeof output === "string" ? output : JSON.stringify(output || {});
  if (hasUnsafeVisibleToken(serialized, currentLanguage)) {
    console.warn("Reading output contains unsafe visible text", serialized);
    return false;
  }
  const disclaimerMatches = serialized.match(/本工具不能替代專業建議|本工具不能替代专业建议|professional advice/gi) || [];
  if (disclaimerMatches.length > 1) {
    console.warn("Repeated disclaimer detected in reading output", disclaimerMatches.length);
    return false;
  }
  if (!currentLanguage.startsWith("zh") && containsChineseCharacters(serialized)) {
    console.warn(`Chinese text detected in non-Chinese output: ${currentLanguage}`);
    return false;
  }
  return true;
}

function formatQuestionForLanguage(question, language) {
  return !language.startsWith("zh") && containsChineseCharacters(question) ? getI18nValue(language, "form.questionLabel") : question;
}
function detectQuestionKeywords(question) {
  const keywordGroups = { love:["love","relationship","amor","amour","любов","恋","사랑","حب","प्रेम","感情"], career:["work","career","trabajo","travail","работ","仕事","직업","مهنة","करियर","工作"], money:["money","dinero","argent","geld","день","お金","돈","مال","धन","钱"], study:["study","exam","estudio","étude","учё","勉強","공부","دراسة","अध्ययन","学习"], relationship:["friend","communication","conflict","ami","comunicación","общ","友","친구","تواصل","रिश्ते","朋友"], self:["self","growth","soi","selbst","само","自分","자기","ذات","स्व","自我"] };
  return Object.entries(keywordGroups).flatMap(([type, words]) => words.filter(word => String(question).toLowerCase().includes(word.toLowerCase())).map(word => ({ type, word })));
}
function pickVariant(list, seed = "") {
  const arr = Array.isArray(list) && list.length ? list : [""];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[hash % arr.length];
}
function normalizeQuestionType(questionType, question, language = "en") {
  const bank = getInterpretationBank(language);
  if (questionType && bank.questionTypeBank[questionType]) return questionType;
  return detectQuestionKeywords(question || "")[0]?.type || "other";
}
function getPositionName(positionKey, language = "en") {
  return getI18nValue(language, `positions.${positionKey === "presentHint" ? "single" : positionKey}`);
}
function generateCardReading(item, position, questionType, question, currentLanguage = "en") {
  const cardText = getLocalizedCard(item.card, currentLanguage);
  const bank = getInterpretationBank(currentLanguage);
  const selectedType = normalizeQuestionType(questionType, question, currentLanguage);
  const seed = `${item.card.id}-${item.orientation}-${position.key}-${question}-${selectedType}-${currentLanguage}`;
  const positionText = getBankVariant(bank.positionBank[position.key] || bank.positionBank.single, currentLanguage, "card.position", seed);
  const elementText = getBankVariant(bank.suitBank[item.card.suit] || bank.suitBank.major, currentLanguage, "card.element", `${seed}-suit`);
  const orientationText = getBankVariant(bank.orientationBank[item.orientation], currentLanguage, "card.orientation", `${seed}-orientation`);
  const typeText = getBankVariant(bank.questionTypeBank[selectedType], currentLanguage, "card.type", `${seed}-type`);
  const title = sanitizeUserVisibleText(`${getPositionName(position.key, currentLanguage)}: ${cardText.name} (${getI18nValue(currentLanguage, `tarot.${item.orientation}`)})`, currentLanguage, "card.title");
  const meaning = item.orientation === "upright" ? cardText.uprightMeaning : cardText.reversedMeaning;
  const result = {
    title,
    positionMeaning: sanitizeUserVisibleText(positionText, currentLanguage, "card.positionMeaning"),
    cardMeaning: sanitizeUserVisibleText(`${meaning} ${elementText} ${orientationText}`, currentLanguage, "card.cardMeaning"),
    relation: sanitizeUserVisibleText(`${typeText} ${getI18nValue(currentLanguage, "result.relationToQuestion")}: ${formatQuestionForLanguage(question, currentLanguage)}`, currentLanguage, "card.relation"),
    reminder: sanitizeUserVisibleText(`${cardText.advice} ${cardText.warning}`, currentLanguage, "card.reminder")
  };
  validateReadingOutput(result, currentLanguage);
  return result;
}
function findEngineCard(readingCards, positionKey) { return readingCards.find((item) => item.position?.key === positionKey); }
function getDominantSuit(readingCards) { const counts = readingCards.reduce((acc, item) => { acc[item.card.suit] = (acc[item.card.suit] || 0) + 1; return acc; }, {}); return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] || "major"; }
function generateActionAdvice(readingCards, questionType, question, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage);
  const selectedType = normalizeQuestionType(questionType, question, currentLanguage);
  const present = findEngineCard(readingCards, "present") || readingCards[0];
  const future = findEngineCard(readingCards, "future") || readingCards[readingCards.length - 1] || present;
  const target = future || present;
  const cardText = getLocalizedCard(target.card, currentLanguage);
  const actionList = bank.actionBank[selectedType]?.[target.card.suit] || bank.actionBank.other?.[target.card.suit] || bank.flatActionBank[`${selectedType}_${target.card.suit}`] || bank.flatActionBank.other_major;
  const line = getBankVariant(actionList, currentLanguage, "actionAdvice.bank", `${target.card.id}-${target.orientation}-${question}-${currentLanguage}`);
  const text = sanitizeUserVisibleText(`${line} ${cardText.advice}`, currentLanguage, "actionAdvice");
  validateReadingOutput(text, currentLanguage);
  return text;
}
function generateWarning(readingCards, questionType, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage);
  const text = sanitizeUserVisibleText(`${getBankVariant(bank.warningBank, currentLanguage, "warning.bank", readingCards.map(i=>i.card.id).join("|"))} ${readingCards.map(i => getLocalizedCard(i.card, currentLanguage).warning).slice(0, 2).join(" ")}`, currentLanguage, "warning");
  validateReadingOutput(text, currentLanguage);
  return text;
}
function generateReflectionQuestion(readingCards, questionType, question, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage);
  const text = getBankVariant(bank.reflectionBank, currentLanguage, "reflection", `${questionType}-${question}-${readingCards.map(i=>i.card.id).join("|")}`);
  validateReadingOutput(text, currentLanguage);
  return text;
}
function generateOverallSummary(readingCards, questionType, question, currentLanguage = "en") {
  return { actionAdvice: generateActionAdvice(readingCards, questionType, question, currentLanguage), warning: generateWarning(readingCards, questionType, currentLanguage), reflectionQuestion: generateReflectionQuestion(readingCards, questionType, question, currentLanguage) };
}
