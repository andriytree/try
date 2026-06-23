const recentDeepOutputKey = "tarotRecentDeepOutputs";
function analyzeSpreadPattern(readingCards) {
  const cards = Array.isArray(readingCards) ? readingCards : [];
  const pastCard = findDeepCard(cards, "past") || cards[0] || null;
  const presentCard = findDeepCard(cards, "present") || cards[0] || null;
  const futureCard = findDeepCard(cards, "future") || cards[cards.length - 1] || null;
  const majorCount = cards.filter(item => item.card?.arcana === "major").length;
  const reversedCount = cards.filter(item => item.orientation === "reversed").length;
  const suitCounts = countBy(cards, item => item.card?.suit || "major");
  const dominantSuit = Object.entries(suitCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || "major";
  return { majorCount, reversedCount, dominantSuit, dominantElement: suitToElement(dominantSuit), hasManyReversed: reversedCount >= 2, hasMajorTheme: majorCount >= 2, pastCard, presentCard, futureCard, energyShift: presentCard && futureCard && presentCard.card.suit !== futureCard.card.suit ? `${presentCard.card.suit}_to_${futureCard.card.suit}` : "none", tensionPairs: detectTensionPairs(cards.map(item=>item.card?.suit)) };
}
function generateDeepCurrentState(readingCards, questionType, question, currentLanguage = "en") {
  const pattern = analyzeSpreadPattern(readingCards); const bank = getInterpretationBank(currentLanguage); const i = i18n[currentLanguage];
  const present = pattern.presentCard || readingCards[0]; const past = pattern.pastCard; const selectedType = normalizeQuestionType(questionType, question, currentLanguage);
  const presentText = getLocalizedCard(present.card, currentLanguage); const pastText = past ? getLocalizedCard(past.card, currentLanguage) : presentText;
  const seed = makeDeepSeed(readingCards, selectedType, question, "current", currentLanguage);
  const text = `${pickWeightedVariant(bank.questionTypeBank[selectedType], seed)} ${pickWeightedVariant(bank.positionBank.present, seed)} ${i.result.currentState}: ${presentText.name} ${i.tarot[present.orientation]} — ${present.orientation === "upright" ? presentText.uprightMeaning : presentText.reversedMeaning} ${past && past !== present ? `${i.positions.past}: ${pastText.name}.` : ""}`;
  warnIfChineseText(text, currentLanguage, "deep.currentState"); return text;
}
function generateDeepDevelopmentTrend(readingCards, questionType, question, currentLanguage = "en") {
  const pattern = analyzeSpreadPattern(readingCards); const bank = getInterpretationBank(currentLanguage); const i = i18n[currentLanguage]; const future = pattern.futureCard || readingCards[readingCards.length - 1] || readingCards[0]; const futureText = getLocalizedCard(future.card, currentLanguage); const seed = makeDeepSeed(readingCards, questionType, question, "trend", currentLanguage);
  const shift = pattern.energyShift !== "none" ? pickWeightedVariant(bank.combinationBank.energyShift, seed) : pickWeightedVariant(bank.suitBank[future.card.suit] || bank.suitBank.major, seed);
  const text = `${pickWeightedVariant(bank.positionBank.future, seed)} ${i.result.developmentTrend}: ${futureText.name} ${i.tarot[future.orientation]}. ${future.orientation === "upright" ? futureText.uprightMeaning : futureText.reversedMeaning} ${shift}`;
  warnIfChineseText(text, currentLanguage, "deep.developmentTrend"); return text;
}
function generateDeepActionAdvice(readingCards, questionType, question, currentLanguage = "en") {
  const pattern = analyzeSpreadPattern(readingCards); const bank = getInterpretationBank(currentLanguage); const selectedType = normalizeQuestionType(questionType, question, currentLanguage); const present = pattern.presentCard || readingCards[0]; const future = pattern.futureCard || readingCards[readingCards.length - 1] || present; const seed = makeDeepSeed(readingCards, selectedType, question, "action", currentLanguage);
  const actionList = bank.actionBank[selectedType]?.[future.card.suit] || bank.actionBank.other?.[future.card.suit] || bank.flatActionBank[`${selectedType}_${future.card.suit}`] || bank.flatActionBank.other_major;
  const presentText = getLocalizedCard(present.card, currentLanguage); const futureText = getLocalizedCard(future.card, currentLanguage);
  const combo = buildCombinationInsight(pattern, seed, currentLanguage);
  const text = `${pickWeightedVariant(actionList, seed)} ${presentText.advice} ${futureText.advice} ${combo}`;
  warnIfChineseText(text, currentLanguage, "deep.actionAdvice"); return text;
}
function generateDeepWarning(readingCards, questionType, currentLanguage = "en") {
  const pattern = analyzeSpreadPattern(readingCards); const bank = getInterpretationBank(currentLanguage); const seed = makeDeepSeed(readingCards, questionType, "", "warning", currentLanguage); const cardWarnings = readingCards.map(item => getLocalizedCard(item.card, currentLanguage).warning).slice(0,2).join(" ");
  const combo = pattern.hasManyReversed ? pickWeightedVariant(bank.combinationBank.manyReversed, seed) : pickWeightedVariant(bank.warningBank, seed);
  const text = `${combo} ${cardWarnings}`; warnIfChineseText(text, currentLanguage, "deep.warning"); return text;
}
function generateDeepReflectionQuestion(readingCards, questionType, question, currentLanguage = "en") {
  const bank = getInterpretationBank(currentLanguage); const text = pickWeightedVariant(bank.reflectionBank, makeDeepSeed(readingCards, questionType, question, "reflection", currentLanguage)); warnIfChineseText(text, currentLanguage, "deep.reflection"); return text;
}
function generateDeepOverallSummary(readingCards, questionType, question, currentLanguage = "en") { return { currentState: generateDeepCurrentState(readingCards, questionType, question, currentLanguage), developmentTrend: generateDeepDevelopmentTrend(readingCards, questionType, question, currentLanguage), actionAdvice: generateDeepActionAdvice(readingCards, questionType, question, currentLanguage), warning: generateDeepWarning(readingCards, questionType, currentLanguage), reflectionQuestion: generateDeepReflectionQuestion(readingCards, questionType, question, currentLanguage) }; }
function pickWeightedVariant(list, context = "") { const candidates = Array.isArray(list) && list.length ? list : [getI18nValue("en", "fallback.unknown")]; const recent = readRecentDeepOutputs(); const seed = `${context}-${new Date().getMinutes()}`; const start = hashString(seed) % candidates.length; for (let offset=0; offset<candidates.length; offset+=1) { const candidate = candidates[(start+offset)%candidates.length]; if (!recent.includes(candidate)) { rememberDeepOutput(candidate); return candidate; } } const fallback = candidates[start]; rememberDeepOutput(fallback); return fallback; }
function buildCombinationInsight(pattern, seed, language = "en") { const bank = getInterpretationBank(language); const keys = []; if (pattern.hasMajorTheme) keys.push("manyMajor"); if (pattern.hasManyReversed) keys.push("manyReversed"); if (pattern.dominantSuit === "wands") keys.push("manyWands"); if (pattern.dominantSuit === "cups") keys.push("manyCups"); if (pattern.dominantSuit === "swords") keys.push("manySwords"); if (pattern.dominantSuit === "pentacles") keys.push("manyPentacles"); if (pattern.energyShift !== "none") keys.push("energyShift"); pattern.tensionPairs.forEach(pair => keys.push(pair)); const key = keys[hashString(seed) % Math.max(keys.length, 1)] || "energyShift"; return pickWeightedVariant(bank.combinationBank[key] || bank.combinationBank.energyShift, `${seed}-${key}`); }
function detectTensionPairs(suits) { const set = new Set(suits); const pairs = []; if (set.has("cups") && set.has("swords")) pairs.push("cupsSwords"); if (set.has("wands") && set.has("pentacles")) pairs.push("wandsPentacles"); if (set.has("cups") && set.has("pentacles")) pairs.push("cupsPentacles"); if (set.has("swords") && set.has("wands")) pairs.push("swordsWands"); return pairs; }
function countBy(items, getKey) { return items.reduce((acc, item) => { const key = getKey(item); acc[key] = (acc[key] || 0) + 1; return acc; }, {}); }
function findDeepCard(readingCards, positionKey) { return readingCards.find(item => item.position?.key === positionKey); }
function suitToElement(suit) { return ({ major:"major", wands:"fire", cups:"water", swords:"air", pentacles:"earth" })[suit] || "major"; }
function makeDeepSeed(readingCards, questionType, question, section, language = "en") { const cards = readingCards.map(item => `${item.card?.id}-${item.orientation}-${item.position?.key}`).join("|"); const keywords = detectQuestionKeywords(question || "").map(item => item.word).join("|"); return `${language}-${section}-${questionType}-${keywords}-${cards}`; }
function hashString(value) { let hash = 0; for (let i=0; i<value.length; i+=1) hash = (hash * 33 + value.charCodeAt(i)) >>> 0; return hash; }
function readRecentDeepOutputs() { try { return JSON.parse(localStorage.getItem(recentDeepOutputKey) || "[]"); } catch (error) { return []; } }
function rememberDeepOutput(text) { try { const recent = readRecentDeepOutputs().filter(item => item !== text); recent.unshift(text); localStorage.setItem(recentDeepOutputKey, JSON.stringify(recent.slice(0, 20))); } catch (error) {} }
