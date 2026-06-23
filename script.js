const tarotDeck = [
  { nameCn: "愚者", nameEn: "The Fool", keywords: ["开始", "自由", "未知", "冒险"], upright: "正位提醒你用开放的心态面对新阶段，允许自己在探索中学习。", reversed: "逆位可能提示准备不足、冲动或逃避现实，需要先看清风险。" },
  { nameCn: "魔术师", nameEn: "The Magician", keywords: ["行动", "资源", "创造", "表达"], upright: "正位表示你可能已经拥有可用资源，适合把想法转化为行动。", reversed: "逆位提醒你留意分心、沟通不清，或没有善用手中的条件。" },
  { nameCn: "女祭司", nameEn: "The High Priestess", keywords: ["直觉", "沉静", "观察", "内在智慧"], upright: "正位提醒你倾听内在感受，暂时不急着做出判断。", reversed: "逆位可能表示你忽略了真实感受，或被表象与焦虑干扰。" },
  { nameCn: "皇后", nameEn: "The Empress", keywords: ["滋养", "关系", "丰盛", "接纳"], upright: "正位强调温柔照顾、稳定支持，以及让事情自然生长。", reversed: "逆位提醒你避免过度付出，也要照顾自己的需求和边界。" },
  { nameCn: "皇帝", nameEn: "The Emperor", keywords: ["秩序", "责任", "边界", "规划"], upright: "正位提示你建立规则、承担责任，并用清晰计划推进事情。", reversed: "逆位可能提醒你不要过度控制，也要避免缺少结构和承诺。" },
  { nameCn: "教皇", nameEn: "The Hierophant", keywords: ["传统", "学习", "信念", "指引"], upright: "正位提示你可以参考经验、规则或值得信任的建议。", reversed: "逆位提醒你思考旧有观念是否仍适合当下，不必盲目顺从。" },
  { nameCn: "恋人", nameEn: "The Lovers", keywords: ["选择", "关系", "价值观", "连接"], upright: "正位强调真诚连接、价值观对齐，以及认真面对选择。", reversed: "逆位可能提示关系失衡、犹豫，或内在需求没有被清楚表达。" },
  { nameCn: "战车", nameEn: "The Chariot", keywords: ["前进", "意志", "控制", "突破"], upright: "正位表示适合集中力量前进，用自律带来突破。", reversed: "逆位提醒你留意方向混乱、急躁或过度用力。" },
  { nameCn: "力量", nameEn: "Strength", keywords: ["勇气", "耐心", "温柔", "内在力量"], upright: "正位提示你可以用稳定、耐心和温柔的方式处理挑战。", reversed: "逆位可能表示信心不足、情绪压抑，或需要重新找回内在力量。" },
  { nameCn: "隐士", nameEn: "The Hermit", keywords: ["独处", "反思", "寻找", "沉淀"], upright: "正位提醒你放慢脚步，通过独处和反思看清方向。", reversed: "逆位可能提示过度封闭，或在逃避必要的沟通与连接。" },
  { nameCn: "命运之轮", nameEn: "Wheel of Fortune", keywords: ["变化", "周期", "机会", "转折"], upright: "正位表示局势可能进入变化期，可以顺势调整。", reversed: "逆位提醒你接受暂时的不稳定，并留意重复出现的模式。" },
  { nameCn: "正义", nameEn: "Justice", keywords: ["公平", "判断", "因果", "清晰"], upright: "正位提示你用理性和事实看待问题，重视责任与平衡。", reversed: "逆位可能提醒你避免偏见，也要面对被忽略的事实。" },
  { nameCn: "倒吊人", nameEn: "The Hanged Man", keywords: ["暂停", "换位", "等待", "释放"], upright: "正位提醒你暂停推进，从不同角度重新理解处境。", reversed: "逆位可能表示无谓拖延、抗拒改变，或不愿放下旧方式。" },
  { nameCn: "死神", nameEn: "Death", keywords: ["结束", "转化", "放下", "更新"], upright: "正位象征一个阶段的结束和更新，提醒你为新变化腾出空间。", reversed: "逆位可能提示你抗拒结束，或仍抓着已经不适合的模式。" },
  { nameCn: "节制", nameEn: "Temperance", keywords: ["平衡", "整合", "疗愈", "耐心"], upright: "正位提示你用温和、渐进的方式整合资源与情绪。", reversed: "逆位提醒你留意失衡、过度消耗，或节奏过快。" },
  { nameCn: "恶魔", nameEn: "The Devil", keywords: ["束缚", "欲望", "依赖", "看见阴影"], upright: "正位提醒你看见让自己受困的习惯、执念或依赖。", reversed: "逆位可能表示你正在意识到束缚，并有机会逐步松动它。" },
  { nameCn: "高塔", nameEn: "The Tower", keywords: ["冲击", "真相", "重建", "觉醒"], upright: "正位提示旧结构可能需要被看见和调整，变化中也有重建空间。", reversed: "逆位可能提醒你已经感到不安，但仍在回避必要的改变。" },
  { nameCn: "星星", nameEn: "The Star", keywords: ["希望", "疗愈", "信任", "愿景"], upright: "正位带来温和的希望，提醒你相信长期修复和成长。", reversed: "逆位可能表示暂时缺少信心，需要重新连接自己的愿望。" },
  { nameCn: "月亮", nameEn: "The Moon", keywords: ["不确定", "潜意识", "情绪", "迷雾"], upright: "正位提醒你承认不确定感，先分辨情绪、想象和事实。", reversed: "逆位可能表示迷雾正在散开，但仍需要谨慎确认信息。" },
  { nameCn: "太阳", nameEn: "The Sun", keywords: ["清晰", "活力", "喜悦", "坦诚"], upright: "正位提示事情可能更适合以坦诚、积极和清晰的方式推进。", reversed: "逆位提醒你不要勉强乐观，可以先处理被遮住的真实感受。" },
  { nameCn: "审判", nameEn: "Judgement", keywords: ["觉醒", "复盘", "召唤", "更新"], upright: "正位提醒你复盘过去，从新的理解中做出更成熟的回应。", reversed: "逆位可能表示自我批判过重，或还没有准备好面对重要呼唤。" },
  { nameCn: "世界", nameEn: "The World", keywords: ["完成", "整合", "成就", "新阶段"], upright: "正位象征阶段性完成和整合，提醒你看见已经获得的成长。", reversed: "逆位可能提示临门一脚仍需补足，或某个循环尚未真正收尾。" }
];

const questionInput = document.querySelector("#questionInput");
const questionType = document.querySelector("#questionType");
const spreadType = document.querySelector("#spreadType");
const startButton = document.querySelector("#startButton");
const safetyMessage = document.querySelector("#safetyMessage");
const shuffleArea = document.querySelector("#shuffleArea");
const cutArea = document.querySelector("#cutArea");
const cutButton = document.querySelector("#cutButton");
const resultArea = document.querySelector("#resultArea");
const cardsContainer = document.querySelector("#cardsContainer");
const readingArea = document.querySelector("#readingArea");
const readingContainer = document.querySelector("#readingContainer");
const summaryArea = document.querySelector("#summaryArea");
const summaryContainer = document.querySelector("#summaryContainer");
const resetButton = document.querySelector("#resetButton");

let currentQuestion = "";
let currentType = "love";
let currentSpread = "one";

const typeText = {
  love: "感情关系、沟通、边界和真实感受",
  career: "事业目标、行动节奏、合作和长期规划",
  study: "学习方法、专注度、积累和考试心态",
  relationship: "人际沟通、界限感、误解和信任",
  self: "内在需求、情绪模式、自我理解和成长方向",
  other: "当前处境、选择、提醒和行动方向"
};

const blockedRules = [
  { words: ["疾病", "癌症", "诊断", "治疗", "吃药", "用药", "手术", "医院", "医生", "怀孕", "流产"], message: "这个问题涉及医疗或健康判断，塔罗不适合替代医生或专业诊断。你可以改成：“面对这件事，我可以如何照顾自己的情绪？”" },
  { words: ["股票", "基金", "投资", "彩票", "中奖", "赌博", "下注", "赢钱", "亏钱", "暴富"], message: "这个问题涉及财务、投资或赌博结果，塔罗不能提供这类判断。你可以改成：“我在面对金钱选择时，需要注意什么心态？”" },
  { words: ["官司", "诉讼", "判决", "坐牢", "违法", "犯罪", "警察", "律师", "规避法律"], message: "这个问题涉及法律判断，建议咨询专业人士。你可以改成：“这件事提醒我需要如何更负责任地处理？”" },
  { words: ["自杀", "自残", "不想活", "伤害别人", "杀人", "报复", "毁掉"], message: "这个问题听起来可能涉及安全风险。塔罗不能处理自伤或伤害他人的问题。如果你正处在危险中，请尽快联系身边可信任的人或当地紧急求助服务。你也可以改成：“我现在可以做什么来让自己安全一点？”" },
  { words: ["未成年", "儿童", "色情", "强迫", "侵犯", "暴力"], message: "这个问题可能涉及未成年人、暴力或违法内容，当前工具不能继续占卜。你可以改成更安全的自我探索问题。" },
  { words: ["什么时候死", "会不会死", "死亡", "灾难", "地震", "车祸", "空难", "末日"], message: "这个问题涉及死亡、灾难或极端事件预测，塔罗不适合做这类判断。你可以改成：“我如何面对当前的不安？”" },
  { words: ["一定会", "一定不会", "必然", "保证", "百分百", "肯定会", "肯定不会", "会不会复合", "会不会发财", "什么时候发财"], message: "这个问题要求确定性承诺，塔罗更适合自我反思而不是保证结果。你可以改成：“我现在应该如何看待这件事？”或“这件事对我的提醒是什么？”" }
];

// 检查问题是否为空或触及不适合塔罗回答的范围。
function checkQuestionSafety(question) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return { passed: false, message: "请先输入一个适合自我探索的问题。" };
  }

  for (const rule of blockedRules) {
    if (rule.words.some((word) => trimmedQuestion.includes(word))) {
      return { passed: false, message: rule.message };
    }
  }

  return { passed: true, message: "" };
}

// 开始占卜，先做合规检查，再进入洗牌状态。
function startReading() {
  currentQuestion = questionInput.value.trim();
  currentType = questionType.value;
  currentSpread = spreadType.value;

  resetResultOnly();

  const safetyResult = checkQuestionSafety(currentQuestion);
  if (!safetyResult.passed) {
    safetyMessage.textContent = safetyResult.message;
    return;
  }

  safetyMessage.textContent = "";
  startButton.disabled = true;
  shuffleArea.classList.remove("hidden");

  setTimeout(showCutStep, 2000);
}

// 洗牌结束后显示切牌提示。
function showCutStep() {
  cutArea.classList.remove("hidden");
}

// 按选择的牌阵抽牌并生成全部结果。
function cutAndDrawCards() {
  const cardCount = currentSpread === "three" ? 3 : 1;
  const drawnCards = drawCards(cardCount);

  shuffleArea.classList.add("hidden");
  cutArea.classList.add("hidden");
  renderCards(drawnCards);
  renderReadings(drawnCards);
  renderSummary(drawnCards);
  resetButton.classList.remove("hidden");
}

// 从复制后的牌组中随机抽牌，确保不会重复。
function drawCards(count) {
  const deckCopy = [...tarotDeck];
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0];
    result.push({ card, orientation: getRandomOrientation(), position: getPositionName(i, count) });
  }

  return result;
}

// 随机决定牌是正位还是逆位。
function getRandomOrientation() {
  return Math.random() > 0.5 ? "upright" : "reversed";
}

// 根据牌阵和序号返回牌阵位置。
function getPositionName(index, count) {
  if (count === 1) {
    return "当下提示";
  }

  return ["过去", "现在", "未来"][index];
}

// 将抽到的牌展示在页面上。
function renderCards(drawnCards) {
  cardsContainer.innerHTML = "";
  cardsContainer.className = `cards-container ${drawnCards.length === 3 ? "three-card-spread" : ""}`;

  drawnCards.forEach((item) => {
    const orientationText = item.orientation === "upright" ? "正位" : "逆位";
    const cardElement = document.createElement("article");
    cardElement.className = "tarot-card";
    cardElement.innerHTML = `
      <span class="card-position">${item.position}</span>
      <span class="orientation-badge ${item.orientation === "reversed" ? "reversed" : ""}">${orientationText}</span>
      <h3 class="card-name">${item.card.nameCn}</h3>
      <p class="card-en">${item.card.nameEn}</p>
      <p class="keyword-list"><strong>关键词：</strong>${item.card.keywords.join("、")}</p>
    `;
    cardsContainer.appendChild(cardElement);
  });

  resultArea.classList.remove("hidden");
}

// 为每张牌生成分层解读。
function renderReadings(drawnCards) {
  readingContainer.innerHTML = "";

  drawnCards.forEach((item) => {
    const meaning = item.orientation === "upright" ? item.card.upright : item.card.reversed;
    const block = document.createElement("article");
    block.className = "reading-block";
    block.innerHTML = `
      <h3>${item.position}：${item.card.nameCn}（${item.orientation === "upright" ? "正位" : "逆位"}）</h3>
      <p><strong>牌阵位置含义：</strong>${getPositionMeaning(item.position)}</p>
      <p><strong>牌本身关键词：</strong>${item.card.keywords.join("、")}。</p>
      <p><strong>正位 / 逆位含义：</strong>${meaning}</p>
      <p><strong>和用户问题的关系：</strong>结合你提出的“${currentQuestion}”，这张牌可能提醒你从${typeText[currentType]}这些角度观察当前处境。</p>
      <p><strong>给你的提醒：</strong>${createAdvice(item)}</p>
    `;
    readingContainer.appendChild(block);
  });

  readingArea.classList.remove("hidden");
}

// 返回每个牌阵位置的解释。
function getPositionMeaning(position) {
  const meanings = {
    "当下提示": "这张牌代表你当前可以关注的核心提醒。",
    "过去": "这个位置代表过去的影响、旧有模式或已经发生的背景。",
    "现在": "这个位置代表你此刻的状态、重点和需要看见的现实。",
    "未来": "这个位置不是绝对预测，而是提示一种可能的发展倾向。"
  };

  return meanings[position];
}

// 根据牌的方向生成温和行动建议。
function createAdvice(item) {
  if (item.orientation === "upright") {
    return `你可以关注“${item.card.keywords[0]}”带来的积极提醒，尝试用更清晰、温和的方式回应当下。`;
  }

  return `你可以留意“${item.card.keywords[0]}”背后的卡点，先放慢节奏，避免急着要求一个确定答案。`;
}

// 综合所有牌生成整体总结。
function renderSummary(drawnCards) {
  const firstKeywords = drawnCards.map((item) => item.card.keywords[0]).join("、");
  const futureCard = drawnCards[drawnCards.length - 1];

  summaryContainer.innerHTML = `
    <div class="summary-list">
      <p><strong>当前能量：</strong>这组牌呈现出的核心能量和“${firstKeywords}”有关，可能提醒你先理解自己的真实状态。</p>
      <p><strong>事情可能的发展倾向：</strong>从牌面看，事情更倾向于通过观察、调整和逐步行动来展开，尤其可以参考“${futureCard.card.nameCn}”带来的提醒。</p>
      <p><strong>可以采取的行动建议：</strong>你可以把问题拆小，先处理最清楚、最能行动的一步，同时保持沟通、边界和自我照顾。</p>
      <p><strong>需要避免的误区：</strong>避免把塔罗当成确定答案，也不要因为一次结果就做医疗、法律、财务或人生重大决策。</p>
    </div>
  `;

  summaryArea.classList.remove("hidden");
}

// 只清空结果区域，保留用户输入。
function resetResultOnly() {
  safetyMessage.textContent = "";
  shuffleArea.classList.add("hidden");
  cutArea.classList.add("hidden");
  resultArea.classList.add("hidden");
  readingArea.classList.add("hidden");
  summaryArea.classList.add("hidden");
  resetButton.classList.add("hidden");
  cardsContainer.innerHTML = "";
  readingContainer.innerHTML = "";
  summaryContainer.innerHTML = "";
}

// 重置整个页面，方便重新开始一次占卜。
function resetAll() {
  questionInput.value = "";
  questionType.value = "love";
  spreadType.value = "one";
  startButton.disabled = false;
  resetResultOnly();
}

startButton.addEventListener("click", startReading);
cutButton.addEventListener("click", cutAndDrawCards);
resetButton.addEventListener("click", resetAll);
