function detectQuestionKeywords(question) {
  const keywordGroups = {
    love: ["感情", "喜欢", "喜歡", "复合", "復合", "分手", "暧昧", "曖昧", "婚姻", "他", "她"],
    career: ["工作", "事业", "事業", "老板", "同事", "跳槽", "机会", "機會", "项目", "項目"],
    money: ["钱", "錢", "收入", "投资", "投資", "消费", "財務", "财务", "资源", "資源"],
    study: ["学习", "學習", "考试", "考試", "成绩", "成績", "学校", "學校"],
    relationship: ["朋友", "合作", "人际", "人際", "沟通", "溝通", "冲突", "衝突"],
    self: ["自我", "成长", "成長", "内在", "內在", "情绪", "情緒"]
  };

  const matched = [];
  Object.entries(keywordGroups).forEach(([type, words]) => {
    words.forEach((word) => {
      if (question.includes(word)) {
        matched.push({ type, word });
      }
    });
  });

  return matched;
}

function pickVariant(list, seed = "") {
  if (!Array.isArray(list) || list.length === 0) {
    return "";
  }

  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return list[hash % list.length];
}

function generateCardReading(item, position, questionType, question) {
  const card = item.card;
  const selectedType = normalizeQuestionType(questionType, question);
  const seed = `${card.id}-${item.orientation}-${position.key}-${question}-${selectedType}`;
  const meaning = item.orientation === "upright" ? card.uprightMeaning : card.reversedMeaning;
  const positionText = pickVariant(interpretationBank.positions[position.key] || interpretationBank.positions.presentHint, seed);
  const elementText = pickVariant(interpretationBank.elements[card.suit] || interpretationBank.elements.major, seed + "element");
  const orientationText = pickVariant(interpretationBank.orientations[item.orientation], seed + "orientation");
  const typeText = pickVariant(interpretationBank.questionTypes[selectedType], seed + "type");
  const actionText = pickVariant(interpretationBank.actionByElement[card.suit]?.[item.orientation] || interpretationBank.actionByElement.major[item.orientation], seed + "action");

  return {
    title: `${getPositionName(position.key)}：${card.nameCn} / ${card.nameEn}（${item.orientation === "upright" ? "正位" : "逆位"}）`,
    positionMeaning: `${positionText}，它会影响你如何理解这次抽到的「${card.nameCn}」。`,
    cardMeaning: `${meaning} ${elementText}。${orientationText}。`,
    relation: `结合你提出的“${question}”，这张牌可能把焦点放在${typeText}上，并通过「${card.keywords.join("、")}」这些关键词提醒你观察现实处境。`,
    reminder: `${actionText}${card.advice}${card.warning}`
  };
}

function generateOverallSummary(readingCards, questionType, question) {
  const selectedType = normalizeQuestionType(questionType, question);
  const past = findEngineCard(readingCards, "past") || readingCards[0];
  const present = findEngineCard(readingCards, "present") || readingCards[0];
  const future = findEngineCard(readingCards, "future") || readingCards[readingCards.length - 1];
  const majorCount = readingCards.filter((item) => item.card.arcana === "major").length;
  const reversedCount = readingCards.filter((item) => item.orientation === "reversed").length;
  const dominantSuit = getDominantSuit(readingCards);
  const seed = readingCards.map((item) => `${item.card.id}-${item.orientation}`).join("|") + question + selectedType;
  const typeText = pickVariant(interpretationBank.questionTypes[selectedType], seed + "summary-type");
  const elementText = pickVariant(interpretationBank.elements[dominantSuit], seed + "summary-element");
  const majorText = majorCount > 0 ? `牌面中有 ${majorCount} 张大阿卡纳，说明这次问题可能不只是表层事件，也牵涉更深的选择或阶段性课题。` : "这组牌更多落在日常层面，适合从具体行动、沟通和资源安排入手。";
  const reversedText = reversedCount >= 2 ? "多张逆位提示你先修正节奏、期待或沟通方式，再考虑推进。" : "正逆位比例相对温和，说明你可以边观察边调整，不必急着给出最终判断。";

  return {
    currentStatus: `从牌面来看，当前状态更贴近${typeText}。现在位置的「${present.card.nameCn}」显示，你可以先关注「${present.card.keywords[0]}」带来的提醒。`,
    developmentTrend: `过去的「${past.card.nameCn}」提供背景，未来的「${future.card.nameCn}」提示下一阶段可能更需要处理${getSuitFocusText(future.card.suit)}。${elementText}。${majorText}`,
    actionAdvice: generateActionAdvice(readingCards, selectedType, question),
    warning: generateWarning(readingCards, selectedType),
    reflectionQuestion: generateReflectionQuestion(readingCards, selectedType),
    reversedNote: reversedText
  };
}

function generateActionAdvice(readingCards, questionType, question) {
  const selectedType = normalizeQuestionType(questionType, question);
  const present = findEngineCard(readingCards, "present") || readingCards[0];
  const future = findEngineCard(readingCards, "future") || readingCards[readingCards.length - 1];
  const targetCards = readingCards.length === 1 ? [readingCards[0]] : [present, future];
  const seed = targetCards.map((item) => `${item.card.id}-${item.orientation}`).join("|") + question + selectedType;
  const typeText = pickVariant(interpretationBank.questionTypes[selectedType], seed + "action-type");

  const phrases = targetCards.map((item, index) => {
    const action = pickVariant(interpretationBank.actionByElement[item.card.suit]?.[item.orientation] || interpretationBank.actionByElement.major[item.orientation], seed + item.card.id + index);
    const positionText = item.position?.key === "future" ? "接下来" : item.position?.key === "present" ? "现在" : "当前";
    const orientationText = item.orientation === "upright" ? "顺势发挥" : "先修正或放慢";
    return `${positionText}可以参考「${item.card.nameCn}」的${orientationText}方向：${action}${item.card.advice}`;
  });

  return `围绕“${question}”，建议你把重点放在${typeText}。${phrases.join(" ")}`;
}

function generateWarning(readingCards, questionType) {
  const reversedCount = readingCards.filter((item) => item.orientation === "reversed").length;
  const seed = readingCards.map((item) => item.card.warning).join("|") + questionType;
  const cardWarnings = readingCards.map((item) => item.card.warning).slice(0, 2).join(" ");
  const risk = pickVariant(interpretationBank.riskReminders, seed);
  const reversedText = reversedCount > 0 ? `另外，${reversedCount} 张逆位提醒你不要忽略卡点、拖延或过度期待。` : "牌面没有集中逆位，但仍建议保持观察和弹性。";
  return `${cardWarnings} ${reversedText}${risk}`;
}

function generateReflectionQuestion(readingCards, questionType) {
  const seed = readingCards.map((item) => `${item.card.id}-${item.orientation}`).join("|") + questionType;
  const selectedType = normalizeQuestionType(questionType, "");
  return pickVariant(interpretationBank.reflectionQuestions[selectedType] || interpretationBank.reflectionQuestions.other, seed);
}

function normalizeQuestionType(questionType, question) {
  if (questionType && interpretationBank.questionTypes[questionType]) {
    return questionType;
  }

  const detected = detectQuestionKeywords(question || "");
  return detected[0]?.type || "other";
}

function findEngineCard(readingCards, positionKey) {
  return readingCards.find((item) => item.position?.key === positionKey);
}

function getDominantSuit(readingCards) {
  const counts = readingCards.reduce((acc, item) => {
    acc[item.card.suit] = (acc[item.card.suit] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "major";
}

function getSuitFocusText(suit) {
  const focusMap = {
    major: "核心课题与关键选择",
    wands: "行动、事业推进和热情",
    cups: "情绪、关系和内在感受",
    swords: "思维、沟通和判断",
    pentacles: "资源、工作和现实稳定"
  };
  return focusMap[suit] || focusMap.major;
}

function getPositionName(positionKey) {
  const map = {
    past: "过去",
    present: "现在",
    future: "未来",
    presentHint: "当下提示"
  };
  return map[positionKey] || "当下提示";
}
