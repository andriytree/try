const readingVariantHistoryKey = "tarotReadingVariantHistoryV2";
const readingVariantCache = new Map();

function hashString(value) {
  let hash = 2166136261;
  const text = String(value || "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function containsHanCharacters(text) {
  return /[\u3400-\u4dbf\u4e00-\u9fff]/u.test(String(text || ""));
}

function containsUnexpectedChinese(text, language) {
  if (language === "zh-CN" || language === "zh-TW" || language === "ja") return false;
  return containsHanCharacters(text);
}

const forbiddenVisiblePatterns = [
  { label:"empty value", pattern:/\b(?:undefined|null)\b|\[object Object\]/i },
  { label:"combination key", pattern:/\b(?:manyReversed|manyMajor|manyWands|manyCups|manySwords|manyPentacles|cupsSwords|swordsWands|wandsPentacles|cupsPentacles|energyShift|pastMajor|presentReversed|futureReversed|open_open|open_blocked|blocked_open|blocked_blocked|same_fire|same_water|same_air|same_earth|fire_water|fire_air|fire_earth|water_air|water_earth|air_earth|major_mix)\b/ },
  { label:"reflection index", pattern:/\breflectionQuestion\s*\d+|反思问题\s*\d+|反思問題\s*\d+/i },
  { label:"fallback key", pattern:/\b(?:professionalAdvice|fallback\.|noAdvice|noWarning|noMeaning|unknown)\b/i },
  { label:"result placeholder", pattern:/牌面已经展开|牌面已經展開/i },
  { label:"disclaimer in reading", pattern:/本工具不能替代专业建议|本工具不能替代專業建議|does not replace professional advice|does not substitute for professional advice/i }
];

function findUnsafeVisibleTokens(text) {
  const value = String(text ?? "");
  return forbiddenVisiblePatterns.filter(({ pattern }) => pattern.test(value)).map(({ label }) => label);
}

function dedupeSentences(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  const parts = value.match(/[^。！？.!?]+[。！？.!?]?/gu) || [value];
  const seen = new Set();
  return parts.map((part) => part.trim()).filter((part) => {
    const key = part.replace(/[\s。！？.!?]+/gu, "").toLocaleLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join(" ");
}

function stripMarkup(text) {
  return String(text ?? "").replace(/<[^>]*>/gu, " ").replace(/[<>]/gu, "").replace(/\s+/gu, " ").trim();
}

function getNaturalFallback(language = "en", field = "reading") {
  const bank = getInterpretationBank(language);
  const fallbackKey = field.includes("reflection") ? "reflection"
    : field.includes("warning") ? "warning"
      : field.includes("trend") ? "trend"
        : field.includes("current") ? "current"
          : field.includes("position") ? "position"
            : field.includes("relation") ? "relation"
              : "action";
  return bank.fallbacks[fallbackKey] || englishInterpretationBank.fallbacks[fallbackKey];
}

function sanitizeUserVisibleText(text, currentLanguage = "en", field = "reading") {
  const stripped = stripMarkup(text);
  const localized = currentLanguage === "zh-TW" ? toTraditionalChinese(stripped) : stripped;
  const value = dedupeSentences(localized);
  const unsafeTokens = findUnsafeVisibleTokens(value);
  if (!value || unsafeTokens.length) {
    console.warn(`Unsafe reading text replaced: ${field}`, { unsafeTokens, value });
    return getNaturalFallback(currentLanguage, field);
  }
  if (containsUnexpectedChinese(value, currentLanguage)) {
    console.warn(`Unexpected Chinese content replaced: ${field}.${currentLanguage}`, value);
    return getNaturalFallback(currentLanguage, field);
  }
  return value;
}

function readVariantHistory() {
  if (typeof StorageAdapter === "undefined") return {};
  return StorageAdapter.getJson(readingVariantHistoryKey, {}) || {};
}

function rememberVariant(namespace, text) {
  if (typeof StorageAdapter === "undefined") return;
  const history = readVariantHistory();
  const previous = Array.isArray(history[namespace]) ? history[namespace] : [];
  history[namespace] = [text, ...previous.filter((item) => item !== text)].slice(0, 12);
  StorageAdapter.setJson(readingVariantHistoryKey, history);
}

function selectDeterministicVariant(list, seed = "", namespace = "reading.variant", language = "en", avoidRecent = true) {
  const candidates = Array.isArray(list) ? list.filter((item) => typeof item === "string" && item.trim()) : [];
  if (!candidates.length) return getNaturalFallback(language, namespace);
  const cacheKey = `${namespace}|${language}|${seed}`;
  if (readingVariantCache.has(cacheKey)) return readingVariantCache.get(cacheKey);
  const start = hashString(cacheKey) % candidates.length;
  const recent = avoidRecent ? (readVariantHistory()[namespace] || []) : [];
  let selected = candidates[start];
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(start + offset) % candidates.length];
    if (!recent.includes(candidate)) {
      selected = candidate;
      break;
    }
  }
  const sanitized = sanitizeUserVisibleText(selected, language, namespace);
  readingVariantCache.set(cacheKey, sanitized);
  if (avoidRecent) rememberVariant(namespace, sanitized);
  return sanitized;
}

function pickVariant(list, seed = "") {
  const candidates = Array.isArray(list) && list.length ? list : [""];
  return candidates[hashString(seed) % candidates.length];
}

function getBankVariant(list, language, field, seed = "") {
  return selectDeterministicVariant(list, seed, field, language);
}

const questionSemanticLexicon = {
  types: {
    love: ["love","lover","romance","dating","partner","crush","感情","爱情","愛情","恋爱","戀愛","复合","復合","amor","pareja","amour","couple","liebe","beziehung","любов","роман","恋愛","연애","사랑","حب","प्यार"],
    career: ["career","work","job","boss","project","promotion","事业","事業","工作","职场","職場","升职","升職","trabajo","carrera","travail","carrière","arbeit","karriere","работ","карьер","仕事","職場","직장","경력","عمل","مهنة","काम","करियर"],
    study: ["study","exam","school","course","learn","thesis","学习","學習","考试","考試","学校","學校","estudio","examen","étude","examen","lernen","prüfung","учёб","экзам","勉強","試験","공부","시험","دراسة","امتحان","पढ़","परीक्षा"],
    money: ["money","income","salary","saving","debt","investment","金钱","金錢","收入","财务","財務","投资","投資","dinero","ingreso","argent","revenu","geld","einkommen","деньг","доход","お金","収入","돈","수입","مال","دخل","पैसा","आय"],
    relationship: ["friend","family","colleague","communication","conflict","relationship","朋友","家人","同事","沟通","溝通","冲突","衝突","关系","關係","amigo","familia","ami","famille","freund","familie","друг","семь","友人","家族","친구","가족","صديق","عائلة","दोस्त","परिवार"],
    self: ["self","growth","identity","emotion","habit","healing","自己","自我","成长","成長","情绪","情緒","习惯","習慣","soi","croissance","selbst","wachstum","себ","рост","自分","成長","자기","성장","ذات","نمو","स्वयं","विकास"]
  },
  intents: {
    decision: ["should i","which","choose","decision","要不要","是否","选择","選擇","哪个","哪個","debo","elegir","choisir","soll","wählen","стоит","выбр","べき","選ぶ","해야","선택","هل","اختيار","क्या","चुन"],
    communication: ["say","tell","talk","communicat","表达","表達","沟通","溝通","怎么说","怎麼說","decir","hablar","dire","parler","sagen","reden","сказать","говор","伝え","話","말하","소통","أقول","تواصل","कह","बात"],
    reconciliation: ["reconcile","get back","repair","forgive","复合","復合","和好","修复关系","修復關係","reconcili","volver","réconcil","zurück","versöhn","вернут","помир","復縁","화해","재회","تصالح","عودة","सुलह","वापस"],
    timing: ["when","timing","how long","什么时候","什麼時候","多久","时机","時機","cuándo","quand","wann","когда","いつ","언제","متى","कब"],
    boundary: ["boundary","limit","protect","say no","边界","邊界","底线","底線","拒绝","拒絕","límite","limite","grenze","границ","境界","경계","حدود","सीमा"],
    planning: ["plan","step","prepare","strategy","计划","計劃","下一步","准备","準備","策略","plan","étape","schritt","planen","план","шаг","計画","단계","계획","خطة","خطوة","योजना","कदम"],
    growth: ["grow","improve","learn","change myself","成长","成長","提升","改善","改变自己","改變自己","mejorar","grandir","verbessern","рост","улучш","成長","改善","성장","개선","نمو","تحسين","विकास","सुधार"],
    release: ["leave","end","let go","move on","放下","结束","結束","离开","離開","告别","告別","soltar","terminar","lâcher","finir","loslassen","enden","отпуст","законч","手放","終","놓아","끝","ترك","نهاية","छोड़","अंत" ]
  }
};

function normalizeQuestionText(question) {
  return String(question || "").normalize("NFKC").toLocaleLowerCase().replace(/[\u0000-\u001f<>]/gu, " ").replace(/\s+/gu, " ").trim();
}

function matchSemanticGroup(normalizedQuestion, groups) {
  const scores = Object.entries(groups).map(([key, words]) => {
    const matches = words.filter((word) => normalizedQuestion.includes(String(word).toLocaleLowerCase()));
    return { key, matches, score: matches.reduce((total, word) => total + Math.max(1, String(word).length / 3), 0) };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || b.matches[0].length - a.matches[0].length);
  return scores;
}

function extractQuestionTerms(normalizedQuestion, language = "en") {
  const stopWords = new Set(["the","and","with","that","this","what","how","when","should","would","could","about","into","from","have","will","your","我的","我想","应该","應該","如何","怎么","怎麼","什么","什麼","現在","现在","一个","一個","可以","是否","还是","還是"]);
  const terms = normalizedQuestion.match(/[\p{L}\p{N}]{2,}/gu) || [];
  return [...new Set(terms.filter((term) => !stopWords.has(term) && term.length <= 24))].slice(0, 5);
}

function analyzeQuestionSemantics(question, explicitType = "", language = "en") {
  const normalized = normalizeQuestionText(question);
  const typeMatches = matchSemanticGroup(normalized, questionSemanticLexicon.types);
  const intentMatches = matchSemanticGroup(normalized, questionSemanticLexicon.intents);
  const selectedType = explicitType && ["love","career","study","money","relationship","self","other"].includes(explicitType)
    ? explicitType
    : typeMatches[0]?.key || "other";
  const intent = intentMatches[0]?.key || "uncertainty";
  const matchedTerms = [...new Set([...typeMatches.flatMap((item) => item.matches), ...intentMatches.flatMap((item) => item.matches)])].slice(0, 6);
  const terms = [...new Set([...matchedTerms, ...extractQuestionTerms(normalized, language)])].slice(0, 6);
  return { normalized, selectedType, intent, matchedTerms, terms, typeMatches, intentMatches };
}

function detectQuestionKeywords(question) {
  const semantics = analyzeQuestionSemantics(question);
  return semantics.typeMatches.flatMap((item) => item.matches.map((word) => ({ type:item.key, word })));
}

function normalizeQuestionType(questionType, question, language = "en") {
  return analyzeQuestionSemantics(question, questionType, language).selectedType;
}

function getPositionName(positionKey, language = "en") {
  const normalized = positionKey === "presentHint" ? "single" : positionKey;
  return getI18nValue(language, `positions.${normalized}`) || getI18nValue("en", `positions.${normalized}`);
}

function getPositionKey(position) {
  const key = position?.key || "single";
  return key === "presentHint" ? "single" : key;
}

function buildCardSeed(item, position, semantics, question, language, section) {
  return [language, section, item.card.id, item.orientation, getPositionKey(position), semantics.selectedType, semantics.intent, semantics.terms.join("|"), normalizeQuestionText(question)].join("::");
}

function formatQuestionFocus(semantics, language) {
  const bank = getInterpretationBank(language);
  const focusList = bank.questionTypes[semantics.selectedType] || bank.questionTypes.other;
  return selectDeterministicVariant(focusList, `${semantics.normalized}|${semantics.intent}`, "question.focus", language, false);
}

function composeRelationText(cardText, item, semantics, question, language, seed) {
  const bank = getInterpretationBank(language);
  const domainList = cardText.domainMeanings[semantics.selectedType] || cardText.domainMeanings.other;
  const domainLine = selectDeterministicVariant(domainList, `${seed}|domain`, `card.domain.${item.card.id}`, language);
  const intentLine = selectDeterministicVariant(bank.intents[semantics.intent] || bank.intents.uncertainty, `${seed}|intent`, `question.intent.${semantics.intent}`, language);
  const opener = selectDeterministicVariant(bank.relationOpeners, `${seed}|opener`, "card.relation.opener", language);
  const keyword = (item.orientation === "reversed" ? cardText.reversedKeywords : cardText.uprightKeywords)[hashString(seed) % 8];
  const focus = formatQuestionFocus(semantics, language);
  if (language === "zh-CN" || language === "zh-TW") {
    return `${opener}${domainLine} ${intentLine} 这张牌把“${keyword}”落在“${focus}”上，请用现实反馈检验你的理解。`;
  }
  if (language === "en") {
    return `${opener} ${domainLine} ${intentLine} The card places ${keyword} inside ${focus}; test that interpretation against real feedback.`;
  }
  return `${domainLine} ${intentLine}`;
}

function generateCardReading(item, position, questionType, question, currentLanguage = "en") {
  if (!item?.card) {
    console.warn("generateCardReading received an invalid card", item);
    const fallback = getNaturalFallback(currentLanguage, "card");
    return { title:fallback, positionMeaning:fallback, cardMeaning:fallback, relation:fallback, reminder:fallback };
  }
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const cardText = getLocalizedCard(item.card, language);
  const semantics = analyzeQuestionSemantics(question, questionType, language);
  const positionKey = getPositionKey(position);
  const seed = buildCardSeed(item, position, semantics, question, language, "card");
  const orientationKeywords = item.orientation === "reversed" ? cardText.reversedKeywords : cardText.uprightKeywords;
  const meaningList = item.orientation === "reversed" ? cardText.reversedMeanings : cardText.uprightMeanings;
  const adviceList = cardText.adviceVariants[item.orientation] || cardText.adviceVariants.upright;
  const warningList = cardText.warningVariants[item.orientation] || cardText.warningVariants.upright;
  const positionList = cardText.positionMeanings[positionKey] || cardText.positionMeanings.single;
  const positionMeaning = selectDeterministicVariant(positionList, `${seed}|position`, `card.position.${item.card.id}.${positionKey}`, language);
  const cardMeaning = selectDeterministicVariant(meaningList, `${seed}|meaning`, `card.meaning.${item.card.id}.${item.orientation}`, language);
  const relation = composeRelationText(cardText, item, semantics, question, language, seed);
  const advice = selectDeterministicVariant(adviceList, `${seed}|advice`, `card.advice.${item.card.id}.${item.orientation}`, language);
  const warning = selectDeterministicVariant(warningList, `${seed}|warning`, `card.warning.${item.card.id}.${item.orientation}`, language);
  const title = `${getPositionName(positionKey, language)}: ${cardText.name} (${getI18nValue(language, `tarot.${item.orientation}`)})`;
  const result = {
    title: sanitizeUserVisibleText(title, language, "card.title"),
    positionMeaning: sanitizeUserVisibleText(positionMeaning, language, "card.positionMeaning"),
    cardMeaning: sanitizeUserVisibleText(cardMeaning, language, "card.cardMeaning"),
    relation: sanitizeUserVisibleText(relation, language, "card.relation"),
    reminder: sanitizeUserVisibleText(`${advice} ${warning}`, language, "card.reminder"),
    keywords: orientationKeywords.map((keyword) => sanitizeUserVisibleText(keyword, language, "card.keyword"))
  };
  validateReadingOutput(result, language, { section:"card", cardId:item.card.id });
  return result;
}

function validateReadingOutput(output, currentLanguage = "en", context = {}) {
  const serialized = typeof output === "string" ? output : JSON.stringify(output || {});
  const issues = [];
  const unsafeTokens = findUnsafeVisibleTokens(serialized);
  if (unsafeTokens.length) issues.push(...unsafeTokens);
  if (containsUnexpectedChinese(serialized, currentLanguage)) issues.push("unexpected Chinese text");
  if (context.section === "card" && /professional advice|专业建议|專業建議/i.test(serialized)) issues.push("disclaimer inside card reading");
  const disclaimerCount = (serialized.match(/professional advice|专业建议|專業建議/gi) || []).length;
  if (disclaimerCount > 1) issues.push("repeated disclaimer");
  if (typeof output === "object" && output) {
    Object.entries(output).forEach(([field, value]) => {
      if (typeof value === "string" && !value.trim()) issues.push(`empty field: ${field}`);
    });
  }
  if (issues.length) console.warn("Reading output validation failed", { ...context, language:currentLanguage, issues });
  return { valid:issues.length === 0, issues };
}

function findEngineCard(readingCards, positionKey) {
  return (readingCards || []).find((item) => getPositionKey(item.position) === positionKey);
}

function getDominantSuit(readingCards) {
  const counts = (readingCards || []).reduce((accumulator, item) => {
    const suit = item.card?.suit || "major";
    accumulator[suit] = (accumulator[suit] || 0) + 1;
    return accumulator;
  }, {});
  return Object.entries(counts).sort((left, right) => right[1] - left[1])[0]?.[0] || "major";
}

function generateActionAdvice(readingCards, questionType, question, currentLanguage = "en") {
  const cards = Array.isArray(readingCards) ? readingCards : [];
  const target = findEngineCard(cards, "future") || findEngineCard(cards, "present") || cards[cards.length - 1];
  if (!target) return getNaturalFallback(currentLanguage, "action");
  const content = getLocalizedCard(target.card, currentLanguage);
  const list = content.adviceVariants[target.orientation] || content.adviceVariants.upright;
  return selectDeterministicVariant(list, `${questionType}|${question}|${target.card.id}|${target.orientation}`, "overall.action", currentLanguage);
}

function generateWarning(readingCards, questionType, currentLanguage = "en") {
  const cards = Array.isArray(readingCards) ? readingCards : [];
  const target = cards.find((item) => item.orientation === "reversed") || cards[cards.length - 1];
  if (!target) return getNaturalFallback(currentLanguage, "warning");
  const content = getLocalizedCard(target.card, currentLanguage);
  const list = content.warningVariants[target.orientation] || content.warningVariants.upright;
  return selectDeterministicVariant(list, `${questionType}|${cards.map((item) => item.card.id).join("|")}`, "overall.warning", currentLanguage);
}

function generateReflectionQuestion(readingCards, questionType, question, currentLanguage = "en") {
  const cards = Array.isArray(readingCards) ? readingCards : [];
  const target = findEngineCard(cards, "future") || findEngineCard(cards, "present") || cards[0];
  if (!target) return getNaturalFallback(currentLanguage, "reflection");
  const content = getLocalizedCard(target.card, currentLanguage);
  return selectDeterministicVariant(content.reflectionVariants, `${questionType}|${question}|${target.card.id}`, "overall.reflection", currentLanguage);
}

function generateOverallSummary(readingCards, questionType, question, currentLanguage = "en") {
  if (typeof generateDeepOverallSummary === "function") return generateDeepOverallSummary(readingCards, questionType, question, currentLanguage);
  return {
    actionAdvice: generateActionAdvice(readingCards, questionType, question, currentLanguage),
    warning: generateWarning(readingCards, questionType, currentLanguage),
    reflectionQuestion: generateReflectionQuestion(readingCards, questionType, question, currentLanguage)
  };
}
