const recentDeepOutputKey = "tarotRecentDeepOutputsV2";

function countBy(items, getKey) {
  return (items || []).reduce((accumulator, item) => {
    const key = getKey(item);
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});
}

function findDeepCard(readingCards, positionKey) {
  return (readingCards || []).find((item) => getPositionKey(item.position) === positionKey);
}

function suitToElement(suit) {
  return tarotSuitElements[suit] || "major";
}

function getRankNumber(card) {
  if (!card) return null;
  if (typeof card.number === "number") return card.number;
  const court = { page:11, knight:12, queen:13, king:14 };
  return court[card.rank] || Number.parseInt(card.rank, 10) || null;
}

function classifyNumberPattern(cards) {
  const ranks = cards.map((item) => getRankNumber(item.card)).filter((value) => Number.isFinite(value));
  const courtCount = cards.filter((item) => ["page","knight","queen","king"].includes(item.card?.rank)).length;
  if (courtCount >= 2) return "court";
  if (new Set(ranks).size < ranks.length) return "repeated";
  if (ranks.length >= 3 && ranks.every((value, index) => index === 0 || value > ranks[index - 1])) return "ascending";
  if (ranks.length >= 3 && ranks.every((value, index) => index === 0 || value < ranks[index - 1])) return "descending";
  if (ranks.length && ranks.filter((value) => value <= 3).length >= Math.ceil(ranks.length / 2)) return "initiation";
  if (ranks.length && ranks.filter((value) => value >= 9).length >= Math.ceil(ranks.length / 2)) return "completion";
  return "none";
}

function getOrientationFlow(presentCard, futureCard) {
  const presentOpen = presentCard?.orientation !== "reversed";
  const futureOpen = futureCard?.orientation !== "reversed";
  if (presentOpen && futureOpen) return "open_open";
  if (presentOpen && !futureOpen) return "open_blocked";
  if (!presentOpen && futureOpen) return "blocked_open";
  return "blocked_blocked";
}

function getElementRelation(cards, presentCard, futureCard) {
  const majorCount = cards.filter((item) => item.card?.arcana === "major").length;
  if (majorCount > 0 && majorCount < cards.length) return "major_mix";
  const presentElement = presentCard?.card?.element || "major";
  const futureElement = futureCard?.card?.element || presentElement;
  if (presentElement === futureElement && ["fire","water","air","earth"].includes(presentElement)) return `same_${presentElement}`;
  const order = ["fire","water","air","earth"];
  const pair = [presentElement, futureElement].filter((element) => order.includes(element)).sort((left, right) => order.indexOf(left) - order.indexOf(right));
  return pair.length === 2 ? pair.join("_") : "none";
}

function analyzeSpreadPattern(readingCards) {
  const cards = Array.isArray(readingCards) ? readingCards.filter((item) => item?.card) : [];
  const pastCard = findDeepCard(cards, "past") || cards[0] || null;
  const presentCard = findDeepCard(cards, "present") || findDeepCard(cards, "single") || cards[Math.min(1, cards.length - 1)] || cards[0] || null;
  const futureCard = findDeepCard(cards, "future") || cards[cards.length - 1] || presentCard;
  const majorCount = cards.filter((item) => item.card.arcana === "major").length;
  const reversedCount = cards.filter((item) => item.orientation === "reversed").length;
  const suitCounts = countBy(cards, (item) => item.card.suit);
  const elementCounts = countBy(cards, (item) => item.card.element);
  const sortedSuits = Object.entries(suitCounts).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const sortedElements = Object.entries(elementCounts).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const hasSuitTie = sortedSuits.length > 1 && sortedSuits[0][1] === sortedSuits[1][1];
  const dominantSuit = hasSuitTie ? "mixed" : sortedSuits[0]?.[0] || "major";
  const dominantElement = sortedElements[0]?.[0] || "major";
  const orientationFlow = getOrientationFlow(presentCard, futureCard);
  const numberPattern = classifyNumberPattern(cards);
  const elementRelation = getElementRelation(cards, presentCard, futureCard);
  const hasManyReversed = cards.length > 1 && reversedCount >= Math.ceil(cards.length / 2);
  const hasMajorTheme = cards.length > 1 && majorCount >= Math.ceil(cards.length / 2);
  return {
    cards,
    cardCount:cards.length,
    pastCard,
    presentCard,
    futureCard,
    majorCount,
    reversedCount,
    uprightCount:cards.length - reversedCount,
    suitCounts,
    elementCounts,
    dominantSuit,
    dominantElement,
    hasSuitTie,
    hasManyReversed,
    hasMajorTheme,
    orientationFlow,
    numberPattern,
    elementRelation,
    energyShift:presentCard && futureCard && presentCard.card.suit !== futureCard.card.suit ? `${presentCard.card.suit}_to_${futureCard.card.suit}` : "none",
    tensionPairs:detectTensionPairs(cards.map((item) => item.card.suit))
  };
}

function detectTensionPairs(suits) {
  const set = new Set(suits || []);
  const pairs = [];
  if (set.has("cups") && set.has("swords")) pairs.push("cupsSwords");
  if (set.has("wands") && set.has("pentacles")) pairs.push("wandsPentacles");
  if (set.has("cups") && set.has("pentacles")) pairs.push("cupsPentacles");
  if (set.has("swords") && set.has("wands")) pairs.push("swordsWands");
  return pairs;
}

function makeDeepSeed(readingCards, questionType, question, section, language = "en") {
  const semantics = analyzeQuestionSemantics(question, questionType, language);
  const cards = (readingCards || []).map((item) => `${item.card?.id}:${item.orientation}:${getPositionKey(item.position)}`).join("|");
  return [language, section, semantics.selectedType, semantics.intent, semantics.terms.join("|"), cards].join("::");
}

function pickWeightedVariant(list, context = "", language = "en", field = "deep.variant") {
  return selectDeterministicVariant(list, context, field, language);
}

function getPatternLine(bank, group, key, seed, language) {
  const candidates = bank[group]?.[key] || bank[group]?.none || [];
  return selectDeterministicVariant(candidates, `${seed}|${group}|${key}`, `deep.pattern.${group}.${key}`, language);
}

function getCardOrientationContent(item, language) {
  const content = getLocalizedCard(item.card, language);
  return {
    content,
    meaningList:item.orientation === "reversed" ? content.reversedMeanings : content.uprightMeanings,
    keywordList:item.orientation === "reversed" ? content.reversedKeywords : content.uprightKeywords,
    adviceList:content.adviceVariants[item.orientation] || content.adviceVariants.upright,
    warningList:content.warningVariants[item.orientation] || content.warningVariants.upright
  };
}

function joinSummaryPieces(pieces, language, field) {
  return sanitizeUserVisibleText(pieces.filter(Boolean).join(" "), language, field);
}

function composePositionConnection(firstItem, secondItem, language, seed) {
  if (!firstItem || !secondItem || firstItem === secondItem) return "";
  const first = getCardOrientationContent(firstItem, language);
  const second = getCardOrientationContent(secondItem, language);
  const firstKeyword = first.keywordList[hashString(`${seed}|first`) % first.keywordList.length];
  const secondKeyword = second.keywordList[hashString(`${seed}|second`) % second.keywordList.length];
  if (language === "zh-CN" || language === "zh-TW") {
    return `${first.content.name}留下的“${firstKeyword}”正在进入${second.content.name}所呈现的“${secondKeyword}”；两者之间的变化就是当前真正的转折点。`;
  }
  if (language === "en") {
    return `${first.content.name} carries ${firstKeyword} into ${second.content.name}'s expression of ${secondKeyword}; that change is the spread's active hinge.`;
  }
  return `${first.content.positionMeanings.past[0]} ${second.content.positionMeanings.present[0]}`;
}

function generateDeepCurrentState(readingCards, questionType, question, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const pattern = analyzeSpreadPattern(readingCards);
  if (!pattern.presentCard) return getNaturalFallback(language, "deep.current");
  const bank = getInterpretationBank(language);
  const seed = makeDeepSeed(pattern.cards, questionType, question, "current", language);
  const bridge = selectDeterministicVariant(bank.summaryBridges.current, `${seed}|bridge`, "deep.current.bridge", language);
  const present = getCardOrientationContent(pattern.presentCard, language);
  const presentMeaning = selectDeterministicVariant(present.meaningList, `${seed}|present`, `deep.current.${pattern.presentCard.card.id}`, language);
  const connection = composePositionConnection(pattern.pastCard, pattern.presentCard, language, seed);
  const output = joinSummaryPieces([bridge, presentMeaning, connection], language, "deep.currentState");
  validateReadingOutput(output, language, { section:"summary.current" });
  return output;
}

function generateDeepDevelopmentTrend(readingCards, questionType, question, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const pattern = analyzeSpreadPattern(readingCards);
  if (!pattern.futureCard) return getNaturalFallback(language, "deep.trend");
  const bank = getInterpretationBank(language);
  const seed = makeDeepSeed(pattern.cards, questionType, question, "trend", language);
  const bridge = selectDeterministicVariant(bank.summaryBridges.trend, `${seed}|bridge`, "deep.trend.bridge", language);
  const future = getCardOrientationContent(pattern.futureCard, language);
  const futureMeaning = selectDeterministicVariant(future.meaningList, `${seed}|future`, `deep.trend.${pattern.futureCard.card.id}`, language);
  const orientationLine = getPatternLine(bank, "orientationFlows", pattern.orientationFlow, seed, language);
  const elementLine = getPatternLine(bank, "elementRelations", pattern.elementRelation, seed, language);
  const numberLine = getPatternLine(bank, "numberPatterns", pattern.numberPattern, seed, language);
  const output = joinSummaryPieces([bridge, futureMeaning, orientationLine, elementLine, numberLine], language, "deep.developmentTrend");
  validateReadingOutput(output, language, { section:"summary.trend" });
  return output;
}

function buildCombinationInsight(pattern, seed, language = "en") {
  const bank = getInterpretationBank(language);
  const insights = [
    getPatternLine(bank, "elementRelations", pattern.elementRelation, seed, language),
    getPatternLine(bank, "orientationFlows", pattern.orientationFlow, seed, language),
    getPatternLine(bank, "numberPatterns", pattern.numberPattern, seed, language)
  ];
  return insights[hashString(`${seed}|combination`) % insights.length];
}

function generateDeepActionAdvice(readingCards, questionType, question, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const pattern = analyzeSpreadPattern(readingCards);
  const presentItem = pattern.presentCard || pattern.cards[0];
  const futureItem = pattern.futureCard || presentItem;
  if (!presentItem) return getNaturalFallback(language, "deep.action");
  const bank = getInterpretationBank(language);
  const seed = makeDeepSeed(pattern.cards, questionType, question, "action", language);
  const bridge = selectDeterministicVariant(bank.summaryBridges.action, `${seed}|bridge`, "deep.action.bridge", language);
  const present = getCardOrientationContent(presentItem, language);
  const future = getCardOrientationContent(futureItem, language);
  const immediateAction = selectDeterministicVariant(present.adviceList, `${seed}|present`, `deep.action.${presentItem.card.id}.${presentItem.orientation}`, language);
  const nextAction = futureItem === presentItem ? "" : selectDeterministicVariant(future.adviceList, `${seed}|future`, `deep.action.${futureItem.card.id}.${futureItem.orientation}`, language);
  const combo = buildCombinationInsight(pattern, seed, language);
  const output = joinSummaryPieces([bridge, immediateAction, nextAction, combo], language, "deep.actionAdvice");
  validateReadingOutput(output, language, { section:"summary.action" });
  return output;
}

function chooseWarningTarget(pattern) {
  const reversedFuture = pattern.futureCard?.orientation === "reversed" ? pattern.futureCard : null;
  const reversedPresent = pattern.presentCard?.orientation === "reversed" ? pattern.presentCard : null;
  return reversedFuture || reversedPresent || pattern.cards.find((item) => item.orientation === "reversed") || pattern.futureCard || pattern.presentCard || pattern.cards[0];
}

function generateDeepWarning(readingCards, questionType, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const pattern = analyzeSpreadPattern(readingCards);
  const targetItem = chooseWarningTarget(pattern);
  if (!targetItem) return getNaturalFallback(language, "deep.warning");
  const bank = getInterpretationBank(language);
  const seed = makeDeepSeed(pattern.cards, questionType, "", "warning", language);
  const bridge = selectDeterministicVariant(bank.summaryBridges.warning, `${seed}|bridge`, "deep.warning.bridge", language);
  const target = getCardOrientationContent(targetItem, language);
  const warning = selectDeterministicVariant(target.warningList, `${seed}|card`, `deep.warning.${targetItem.card.id}.${targetItem.orientation}`, language);
  const shadow = selectDeterministicVariant(target.content.shadowMeanings, `${seed}|shadow`, `deep.shadow.${targetItem.card.id}`, language);
  const patternLine = pattern.hasManyReversed
    ? getPatternLine(bank, "orientationFlows", pattern.orientationFlow, `${seed}|reversed`, language)
    : getPatternLine(bank, "elementRelations", pattern.elementRelation, `${seed}|element`, language);
  const output = joinSummaryPieces([bridge, warning, shadow, patternLine], language, "deep.warning");
  validateReadingOutput(output, language, { section:"summary.warning" });
  return output;
}

function ensureQuestionPunctuation(text, language) {
  const value = String(text || "").trim();
  if (/[?？]$/u.test(value)) return value;
  return `${value}${language.startsWith("zh") || language === "ja" ? "？" : "?"}`;
}

function generateDeepReflectionQuestion(readingCards, questionType, question, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const pattern = analyzeSpreadPattern(readingCards);
  const targetItem = pattern.futureCard || pattern.presentCard || pattern.cards[0];
  if (!targetItem) return getNaturalFallback(language, "deep.reflection");
  const seed = makeDeepSeed(pattern.cards, questionType, question, "reflection", language);
  const target = getLocalizedCard(targetItem.card, language);
  const questionLine = selectDeterministicVariant(target.reflectionVariants, `${seed}|card`, `deep.reflection.${targetItem.card.id}`, language);
  const clean = sanitizeUserVisibleText(ensureQuestionPunctuation(questionLine, language), language, "deep.reflection");
  validateReadingOutput(clean, language, { section:"summary.reflection" });
  return clean;
}

function removeCrossSectionDuplicates(summary, language) {
  const seen = new Set();
  return Object.fromEntries(Object.entries(summary).map(([field, value]) => {
    const sentences = String(value || "").match(/[^。！？.!?]+[。！？.!?]?/gu) || [value];
    const unique = sentences.filter((sentence) => {
      const normalized = sentence.replace(/[\s。！？.!?]+/gu, "").toLocaleLowerCase();
      if (!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    }).join(" ").trim();
    return [field, sanitizeUserVisibleText(unique || getNaturalFallback(language, `deep.${field}`), language, `deep.${field}`)];
  }));
}

function generateDeepOverallSummary(readingCards, questionType, question, currentLanguage = "en") {
  const language = tarotLanguageCodes.includes(currentLanguage) ? currentLanguage : "en";
  const summary = {
    currentState:generateDeepCurrentState(readingCards, questionType, question, language),
    developmentTrend:generateDeepDevelopmentTrend(readingCards, questionType, question, language),
    actionAdvice:generateDeepActionAdvice(readingCards, questionType, question, language),
    warning:generateDeepWarning(readingCards, questionType, language),
    reflectionQuestion:generateDeepReflectionQuestion(readingCards, questionType, question, language)
  };
  const deduped = removeCrossSectionDuplicates(summary, language);
  validateReadingOutput(deduped, language, { section:"summary.overall" });
  return deduped;
}

function readRecentDeepOutputs() {
  if (typeof StorageAdapter === "undefined") return [];
  return StorageAdapter.getJson(recentDeepOutputKey, []) || [];
}

function rememberDeepOutput(text) {
  if (typeof StorageAdapter === "undefined") return;
  const recent = readRecentDeepOutputs();
  StorageAdapter.setJson(recentDeepOutputKey, [text, ...recent.filter((item) => item !== text)].slice(0, 30));
}
