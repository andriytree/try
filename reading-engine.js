function containsChineseCharacters(text) {
  const value = String(text || "");
  return /(感情|单张牌|單張牌|整体总结|整體總結|关键词|關鍵詞|可以采取的行动|可以採取的行動|需要避免的误区|需要避免的誤區|反思问题|反思問題|抽到的牌|牌义解释|牌義解釋)/.test(value);
}
function warnIfChineseText(text, language, field) {
  if (!language.startsWith("zh") && containsChineseCharacters(text)) console.warn(`Chinese characters detected in ${field} for ${language}`);
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
  const positionText = pickVariant(bank.positionBank[position.key] || bank.positionBank.single, seed);
  const elementText = pickVariant(bank.suitBank[item.card.suit] || bank.suitBank.major, `${seed}-suit`);
  const orientationText = pickVariant(bank.orientationBank[item.orientation], `${seed}-orientation`);
  const typeText = pickVariant(bank.questionTypeBank[selectedType], `${seed}-type`);
  const title = `${getPositionName(position.key, currentLanguage)}: ${cardText.name} (${getI18nValue(currentLanguage, `tarot.${item.orientation}`)})`;
  const result = { title, positionMeaning: `${positionText}`, cardMeaning: `${cardText.uprightMeaning && item.orientation === "upright" ? cardText.uprightMeaning : cardText.reversedMeaning} ${elementText} ${orientationText}`, relation: `${typeText} ${getI18nValue(currentLanguage, "result.relationToQuestion")}: ${formatQuestionForLanguage(question, currentLanguage)}`, reminder: `${cardText.advice} ${cardText.warning}` };
  Object.entries(result).forEach(([key, value]) => warnIfChineseText(value, currentLanguage, `cardReading.${key}`));
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
  const line = pickVariant(actionList, `${target.card.id}-${target.orientation}-${question}-${currentLanguage}`);
  const text = `${line} ${cardText.advice}`;
  warnIfChineseText(text, currentLanguage, "actionAdvice");
  return text;
}
function generateWarning(readingCards, questionType, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage);
  const text = `${pickVariant(bank.warningBank, readingCards.map(i=>i.card.id).join("|"))} ${readingCards.map(i => getLocalizedCard(i.card, currentLanguage).warning).slice(0, 2).join(" ")}`;
  warnIfChineseText(text, currentLanguage, "warning");
  return text;
}
function generateReflectionQuestion(readingCards, questionType, question, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage);
  const text = pickVariant(bank.reflectionBank, `${questionType}-${question}-${readingCards.map(i=>i.card.id).join("|")}`);
  warnIfChineseText(text, currentLanguage, "reflection");
  return text;
}
function generateOverallSummary(readingCards, questionType, question, currentLanguage = "en") {
  return { actionAdvice: generateActionAdvice(readingCards, questionType, question, currentLanguage), warning: generateWarning(readingCards, questionType, currentLanguage), reflectionQuestion: generateReflectionQuestion(readingCards, questionType, question, currentLanguage) };
}
