const recentDeepOutputKey = "tarotRecentDeepOutputs";

function analyzeSpreadPattern(readingCards) {
  const cards = Array.isArray(readingCards) ? readingCards : [];
  const pastCard = findDeepCard(cards, "past") || cards[0] || null;
  const presentCard = findDeepCard(cards, "present") || cards[0] || null;
  const futureCard = findDeepCard(cards, "future") || cards[cards.length - 1] || null;
  const majorCount = cards.filter((item) => item.card?.arcana === "major").length;
  const reversedCount = cards.filter((item) => item.orientation === "reversed").length;
  const suitCounts = countBy(cards, (item) => item.card?.suit || "major");
  const dominantSuit = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "major";
  const dominantElement = suitToElement(dominantSuit);
  const tensionPairs = detectTensionPairs(cards.map((item) => item.card?.suit));

  return {
    majorCount,
    reversedCount,
    dominantSuit,
    dominantElement,
    hasManyReversed: reversedCount >= 2,
    hasMajorTheme: majorCount >= 2,
    pastCard,
    presentCard,
    futureCard,
    energyShift: presentCard && futureCard && presentCard.card.suit !== futureCard.card.suit
      ? `${presentCard.card.suit}_to_${futureCard.card.suit}`
      : "none",
    tensionPairs
  };
}

function generateDeepCurrentState(readingCards, questionType, question) {
  const pattern = analyzeSpreadPattern(readingCards);
  const present = pattern.presentCard || readingCards[0];
  const past = pattern.pastCard;
  const seed = makeDeepSeed(readingCards, questionType, question, "current");
  const typeLine = pickWeightedVariant(getDeepTypeBank(questionType), `${seed}-type`);
  const presentLine = pickWeightedVariant(getDeepSuitBank(present?.card?.suit), `${seed}-present-suit`);
  const orientationLine = pickWeightedVariant(getDeepOrientationBank(present?.orientation), `${seed}-present-orientation`);
  const pastLine = past && past !== present
    ? `过去位置的「${past.card.nameCn}」让这个问题带有${getDeepSuitLabel(past.card.suit)}的背景，它更像是在说明：眼前的反应并不是突然出现，而是和此前累积的模式有关。`
    : "单张牌阵更强调当下线索，因此可以先把注意力放在这张牌指出的核心状态上。";
  const cardLine = present
    ? `现在牌「${present.card.nameCn}」${present.orientation === "reversed" ? "逆位" : "正位"}显示，当前最需要看见的是「${present.card.keywords[0]}」如何影响你的判断与行动。${orientationLine}`
    : "当前牌面信息有限，可以先从问题本身的真实需求开始整理。";

  return `${typeLine}${pastLine}${cardLine}${presentLine}`;
}

function generateDeepDevelopmentTrend(readingCards, questionType, question) {
  const pattern = analyzeSpreadPattern(readingCards);
  const future = pattern.futureCard || readingCards[readingCards.length - 1];
  const seed = makeDeepSeed(readingCards, questionType, question, "trend");
  const futureLine = pickWeightedVariant(getDeepPositionBank("future"), `${seed}-future-position`);
  const suitLine = pickWeightedVariant(getDeepSuitBank(future?.card?.suit), `${seed}-future-suit`);
  const orientationLine = pickWeightedVariant(getDeepOrientationBank(future?.orientation), `${seed}-future-orientation`);
  const shiftLine = pattern.energyShift !== "none"
    ? `现在牌到未来牌出现了能量切换，说明事情的发展可能需要你从${getDeepSuitLabel(pattern.presentCard.card.suit)}转向${getDeepSuitLabel(pattern.futureCard.card.suit)}，而不是继续用同一种方式处理。`
    : `现在牌和未来牌的能量较为接近，说明同一个主题可能会延续，关键在于你是否愿意调整回应方式。`;
  const futureCardLine = future
    ? `未来牌「${future.card.nameCn}」${future.orientation === "reversed" ? "逆位" : "正位"}并不是最终结论，而是在提示如果维持当前状态，局面可能继续围绕「${future.card.keywords[0]}」展开。`
    : "未来趋势需要通过当下行动逐步观察。";

  return `${futureLine}${futureCardLine}${orientationLine}${suitLine}${shiftLine}如果你愿意调整行动方式，牌面显示更容易打开新的反馈空间；如果继续沿用旧节奏，则可能重复当前卡点。`;
}

function generateDeepActionAdvice(readingCards, questionType, question) {
  const pattern = analyzeSpreadPattern(readingCards);
  const present = pattern.presentCard || readingCards[0];
  const future = pattern.futureCard || readingCards[readingCards.length - 1] || present;
  const seed = makeDeepSeed(readingCards, questionType, question, "action");
  const primarySuit = future?.card?.suit || present?.card?.suit || "major";
  const actionLine = pickWeightedVariant(getDeepActionBank(questionType, primarySuit), `${seed}-action-main`);
  const presentAdvice = present?.card?.advice || "先从一个可控行动开始观察反馈。";
  const futureAdvice = future?.card?.advice || "保留弹性，不急着追求最终答案。";
  const comboLine = buildCombinationInsight(pattern, `${seed}-combo-action`);
  const orientationLine = future?.orientation === "reversed"
    ? `由于未来牌是逆位，行动上更适合先修正方式：不要急着推动外部结果，而是检查沟通、资源或期待是否已经失衡。`
    : `由于未来牌是正位，行动上可以顺势发挥它的优势，但仍要把节奏放在可执行范围内。`;

  return `${actionLine}${orientationLine}现在牌「${present.card.nameCn}」给出的行动线索是：${presentAdvice}未来牌「${future.card.nameCn}」补充的方向是：${futureAdvice}${comboLine}你可以先做一件能被验证的小行动，并暂时不要把尚未发生的部分当成事实。`;
}

function generateDeepWarning(readingCards, questionType) {
  const pattern = analyzeSpreadPattern(readingCards);
  const seed = makeDeepSeed(readingCards, questionType, "", "warning");
  const baseWarning = pickWeightedVariant(interpretationBank.deep.warningBank, `${seed}-base`);
  const reversedLine = pattern.hasManyReversed
    ? "多张逆位说明阻力并不只来自外部，也可能来自内耗、误读或期待过重；此时越急着推进，越容易把问题推回旧循环。"
    : "逆位没有形成强烈集中，但仍需要留意自己是否只选择性看见想要的信号。";
  const suitLine = pattern.dominantSuit === "swords"
    ? "宝剑能量较强时，尤其要避免在没有充分事实的情况下反复推演或争辩。"
    : pattern.dominantSuit === "pentacles"
      ? "星币能量较强时，不要忽略时间、资源、承诺和现实条件。"
      : pattern.dominantSuit === "cups"
        ? "圣杯能量较强时，避免把对方回应或情绪波动直接等同于自我价值。"
        : pattern.dominantSuit === "wands"
          ? "权杖能量较强时，避免因为想尽快看到进展而消耗过度。"
          : "大阿卡纳能量较强时，不要把深层课题简化成单次事件的输赢。";
  return `${baseWarning}${reversedLine}${suitLine}塔罗适合提供自我观察角度，涉及医疗、法律、财务风险或人身安全时，仍应回到专业支持与现实证据。`;
}

function generateDeepReflectionQuestion(readingCards, questionType, question) {
  const pattern = analyzeSpreadPattern(readingCards);
  const seed = makeDeepSeed(readingCards, questionType, question, "reflection");
  const baseQuestion = pickWeightedVariant(interpretationBank.deep.reflectionBank, `${seed}-base`);
  const anchor = pattern.presentCard || pattern.futureCard;
  if (!anchor) {
    return baseQuestion;
  }
  return `结合「${anchor.card.nameCn}」的${anchor.orientation === "reversed" ? "逆位" : "正位"}提醒：${baseQuestion}`;
}

function generateDeepOverallSummary(readingCards, questionType, question) {
  return {
    currentState: generateDeepCurrentState(readingCards, questionType, question),
    developmentTrend: generateDeepDevelopmentTrend(readingCards, questionType, question),
    actionAdvice: generateDeepActionAdvice(readingCards, questionType, question),
    warning: generateDeepWarning(readingCards, questionType),
    reflectionQuestion: generateDeepReflectionQuestion(readingCards, questionType, question)
  };
}

function pickWeightedVariant(list, context = "") {
  const candidates = Array.isArray(list) && list.length > 0 ? list : ["从牌面来看，可以先回到事实、感受和可控行动之间重新整理。"];
  const recent = readRecentDeepOutputs();
  const minute = new Date().getMinutes();
  const seed = `${context}-${minute}`;
  let startIndex = hashString(seed) % candidates.length;

  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(startIndex + offset) % candidates.length];
    if (!recent.includes(candidate)) {
      rememberDeepOutput(candidate);
      return candidate;
    }
  }

  const fallback = candidates[startIndex];
  rememberDeepOutput(fallback);
  return fallback;
}

function buildCombinationInsight(pattern, seed) {
  const keys = [];
  if (pattern.hasMajorTheme) keys.push("manyMajor");
  if (pattern.hasManyReversed) keys.push("manyReversed");
  if (pattern.dominantSuit === "wands") keys.push("manyWands");
  if (pattern.dominantSuit === "cups") keys.push("manyCups");
  if (pattern.dominantSuit === "swords") keys.push("manySwords");
  if (pattern.dominantSuit === "pentacles") keys.push("manyPentacles");
  if (pattern.pastCard?.card?.arcana === "major") keys.push("pastMajor");
  if (pattern.presentCard?.orientation === "reversed") keys.push("presentReversed");
  if (pattern.futureCard?.orientation === "reversed") keys.push("futureReversed");
  if (pattern.energyShift !== "none") keys.push("energyShift");
  pattern.tensionPairs.forEach((pair) => keys.push(pair));
  const selectedKey = keys[hashString(seed) % Math.max(keys.length, 1)] || "energyShift";
  return pickWeightedVariant(interpretationBank.deep.combinationBank[selectedKey] || interpretationBank.deep.combinationBank.energyShift, `${seed}-${selectedKey}`);
}

function getDeepTypeBank(questionType) {
  return interpretationBank.deep.questionTypeBank[questionType] || interpretationBank.deep.questionTypeBank.other;
}

function getDeepSuitBank(suit) {
  return interpretationBank.deep.suitBank[suit] || interpretationBank.deep.suitBank.major;
}

function getDeepOrientationBank(orientation) {
  return interpretationBank.deep.orientationBank[orientation] || interpretationBank.deep.orientationBank.upright;
}

function getDeepPositionBank(position) {
  return interpretationBank.deep.positionBank[position] || interpretationBank.deep.positionBank.present;
}

function getDeepActionBank(questionType, suit) {
  return interpretationBank.deep.actionBank[`${questionType}_${suit}`]
    || interpretationBank.deep.actionBank[`${questionType}_swords`]
    || interpretationBank.deep.actionBank[`${questionType}_cups`]
    || interpretationBank.deep.actionBank.self_major;
}

function detectTensionPairs(suits) {
  const set = new Set(suits);
  const pairs = [];
  if (set.has("cups") && set.has("swords")) pairs.push("cupsSwords");
  if (set.has("wands") && set.has("pentacles")) pairs.push("wandsPentacles");
  if (set.has("cups") && set.has("pentacles")) pairs.push("cupsPentacles");
  if (set.has("swords") && set.has("wands")) pairs.push("swordsWands");
  return pairs;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function findDeepCard(readingCards, positionKey) {
  return readingCards.find((item) => item.position?.key === positionKey);
}

function suitToElement(suit) {
  const map = { major: "major", wands: "fire", cups: "water", swords: "air", pentacles: "earth" };
  return map[suit] || "major";
}

function getDeepSuitLabel(suit) {
  const map = { major: "核心课题", wands: "行动与推进", cups: "情绪与关系", swords: "思维与沟通", pentacles: "资源与现实" };
  return map[suit] || map.major;
}

function makeDeepSeed(readingCards, questionType, question, section) {
  const cards = readingCards.map((item) => `${item.card?.id}-${item.orientation}-${item.position?.key}`).join("|");
  const keywords = detectQuestionKeywords(question || "").map((item) => item.word).join("|");
  return `${section}-${questionType}-${keywords}-${cards}`;
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function readRecentDeepOutputs() {
  try {
    return JSON.parse(localStorage.getItem(recentDeepOutputKey) || "[]");
  } catch (error) {
    return [];
  }
}

function rememberDeepOutput(text) {
  try {
    const recent = readRecentDeepOutputs().filter((item) => item !== text);
    recent.unshift(text);
    localStorage.setItem(recentDeepOutputKey, JSON.stringify(recent.slice(0, 20)));
  } catch (error) {
    // localStorage may be unavailable in some restricted contexts; generation still works without it.
  }
}
