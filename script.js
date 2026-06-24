const questionInput = document.querySelector("#questionInput");
const questionType = document.querySelector("#questionType");
const spreadType = document.querySelector("#spreadType");
const languageSelect = document.querySelector("#languageSelect");
const startButton = document.querySelector("#startButton");
const safetyMessage = document.querySelector("#safetyMessage");
const shuffleArea = document.querySelector("#shuffleArea");
const shuffleStage = document.querySelector("#shuffleStage");
const shufflePrompt = document.querySelector("#shufflePrompt");
const shuffleActionButton = document.querySelector("#shuffleActionButton");
const resultArea = document.querySelector("#resultArea");
const cardsContainer = document.querySelector("#cardsContainer");
const readingArea = document.querySelector("#readingArea");
const readingContainer = document.querySelector("#readingContainer");
const summaryArea = document.querySelector("#summaryArea");
const summaryContainer = document.querySelector("#summaryContainer");
const resetButton = document.querySelector("#resetButton");
const stepInputLabel = document.querySelector("#stepInputLabel");
const stepProcessLabel = document.querySelector("#stepProcessLabel");
const stepResultLabel = document.querySelector("#stepResultLabel");
const processTitle = document.querySelector("#processTitle");
const questionSummary = document.querySelector("#questionSummary");
const backToInputButton = document.querySelector("#backToInputButton");
const backToProcessButton = document.querySelector("#backToProcessButton");
const saveResultButton = document.querySelector("#saveResultButton");
const shareResultButton = document.querySelector("#shareResultButton");

let appState = "idle";
let currentQuestion = "";
let currentType = "love";
let currentSpread = "one";
let currentLanguage = "zh-CN";
let currentDrawnCards = [];


const stepActionLabels = {
  "zh-CN": { save: "保存结果", share: "分享结果" },
  "zh-TW": { save: "保存結果", share: "分享結果" },
  en: { save: "Save result", share: "Share result" },
  ja: { save: "結果を保存", share: "結果を共有" },
  ko: { save: "결과 저장", share: "결과 공유" },
  es: { save: "Guardar resultado", share: "Compartir resultado" },
  fr: { save: "Enregistrer", share: "Partager" },
  de: { save: "Ergebnis speichern", share: "Ergebnis teilen" },
  pt: { save: "Salvar resultado", share: "Compartilhar" },
  ru: { save: "Сохранить результат", share: "Поделиться" },
  ar: { save: "حفظ النتيجة", share: "مشاركة النتيجة" },
  hi: { save: "परिणाम सहेजें", share: "परिणाम साझा करें" }
};

const questionTypes = [
  { value: "love", labelKey: "typeLove" },
  { value: "career", labelKey: "typeCareer" },
  { value: "money", labelKey: "typeMoney" },
  { value: "study", labelKey: "typeStudy" },
  { value: "relationship", labelKey: "typeRelationship" },
  { value: "self", labelKey: "typeSelf" },
  { value: "other", labelKey: "typeOther" }
];

const spreads = {
  one: [{ key: "presentHint", labelKey: "positionPresentHint", meaningKey: "positionPresentHintMeaning" }],
  three: [
    { key: "past", labelKey: "positionPast", meaningKey: "positionPastMeaning" },
    { key: "present", labelKey: "positionPresent", meaningKey: "positionPresentMeaning" },
    { key: "future", labelKey: "positionFuture", meaningKey: "positionFutureMeaning" }
  ]
};

const blockedRules = [
  { words: ["疾病", "癌症", "诊断", "治療", "治疗", "吃药", "用药", "手术", "醫院", "医院", "医生", "懷孕", "怀孕", "流产"], messageKey: "safetyMedical" },
  { words: ["股票", "基金", "投资", "投資", "彩票", "中奖", "中獎", "赌博", "賭博", "下注", "赢钱", "虧錢", "亏钱", "暴富"], messageKey: "safetyFinance" },
  { words: ["官司", "诉讼", "訴訟", "判决", "判決", "坐牢", "违法", "違法", "犯罪", "警察", "律师", "律師", "规避法律", "規避法律"], messageKey: "safetyLegal" },
  { words: ["自杀", "自殺", "自残", "自殘", "不想活", "伤害别人", "傷害別人", "杀人", "殺人", "报复", "報復", "毁掉", "毀掉"], messageKey: "safetySelfHarm" },
  { words: ["未成年", "儿童", "兒童", "色情", "强迫", "強迫", "侵犯", "暴力"], messageKey: "safetyMinorViolence" },
  { words: ["什么时候死", "什麼時候死", "会不会死", "會不會死", "死亡", "灾难", "災難", "地震", "车祸", "車禍", "空难", "空難", "末日"], messageKey: "safetyDeath" },
  { words: ["一定会", "一定會", "一定不会", "一定不會", "必然", "保证", "保證", "百分百", "肯定会", "肯定會", "肯定不会", "肯定不會", "会不会复合", "會不會復合", "会不会发财", "會不會發財", "什么时候发财", "一定中奖", "一定中獎"], messageKey: "safetyDeterministic" }
];

// 读取当前语言字典，缺失时回退到简体中文。
function t(key) {
  return getI18nValue(currentLanguage, key) || key;
}

// 初始化语言选项，并按“手动选择 > 本地档案 > 设备语言 > 英文”的优先级选择语言。
function initLanguage() {
  supportedLanguages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.code;
    option.textContent = language.label;
    languageSelect.appendChild(option);
  });

  currentLanguage = detectPreferredLanguage(StorageAdapter.getProfile());
  languageSelect.value = currentLanguage;
  applyLanguage();
}

// 将语言字典应用到页面上的文本、placeholder 和选项。
function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = t("app.title");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  renderSelectOptions();
  renderStepCopy();
  renderProcessSummary();
  updateShuffleControls();
  if (typeof renderProfileLanguageText === "function") renderProfileLanguageText(currentLanguage);
}

// 根据当前语言重新渲染问题类型和牌阵选项。
function renderSelectOptions() {
  const selectedType = questionType.value || currentType;
  questionType.innerHTML = questionTypes.map((type) => `<option value="${type.value}">${t(type.labelKey)}</option>`).join("");
  questionType.value = selectedType;

  const selectedSpread = spreadType.value || currentSpread;
  spreadType.innerHTML = `
    <option value="one">${t("spreads.single")}：${t("spreads.singleDescription")}</option>
    <option value="three">${t("spreads.threeCard")}：${t("spreads.threeCardDescription")}</option>
  `;
  spreadType.value = selectedSpread;
}

// 检查问题是否为空或触及不适合塔罗回答的范围。
function checkQuestionSafety(question) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return { passed: false, message: t("safetyEmpty") };
  }

  for (const rule of blockedRules) {
    if (rule.words.some((word) => trimmedQuestion.includes(word))) {
      return { passed: false, message: t(rule.messageKey) };
    }
  }

  return { passed: true, message: "" };
}

// 开始占卜，先进行合规检查，通过后进入准备洗牌状态。
function startReading() {
  currentQuestion = questionInput.value.trim();
  currentType = questionType.value;
  currentSpread = spreadType.value;
  resetResultOnly();

  const safetyResult = checkQuestionSafety(currentQuestion);
  if (!safetyResult.passed) {
    safetyMessage.textContent = safetyResult.message;
    appState = "idle";
    return;
  }

  safetyMessage.textContent = "";
  appState = "ready";
  tarotFlowState.savedQuestion = currentQuestion;
  tarotFlowState.savedQuestionType = currentType;
  tarotFlowState.savedSpread = currentSpread;
  startButton.disabled = true;
  shuffleArea.classList.remove("hidden");
  renderProcessSummary();
  setFlowStep("process");
  updateShuffleControls();
}

// 根据状态机刷新洗牌提示、按钮文字和动效状态。
function updateShuffleControls() {
  shuffleActionButton.disabled = false;
  if (appState === "ready") {
    shufflePrompt.textContent = t("shuffleReadyPrompt");
    shuffleActionButton.textContent = t("shuffleStartButton");
    shuffleStage.classList.add("paused");
  } else if (appState === "shuffling") {
    shufflePrompt.textContent = t("shuffleActivePrompt");
    shuffleActionButton.textContent = t("shuffleStopButton");
    shuffleStage.classList.remove("paused");
  } else if (appState === "shuffled") {
    shufflePrompt.textContent = t("shuffleDonePrompt");
    shuffleActionButton.textContent = t("cutDrawButton");
    shuffleStage.classList.add("paused");
  } else if (appState === "reading") {
    shufflePrompt.textContent = t("flow.resultMessage");
    shuffleActionButton.textContent = t("result.overallSummaryTitle");
    shuffleActionButton.disabled = true;
    shuffleStage.classList.add("paused");
  }
}

// 一个按钮控制开始洗牌、结束洗牌、切牌抽牌三个动作。
function handleShuffleAction() {
  if (appState === "ready") {
    appState = "shuffling";
  } else if (appState === "shuffling") {
    appState = "shuffled";
  } else if (appState === "shuffled") {
    cutAndDrawCards();
    return;
  }

  updateShuffleControls();
}

// 完成切牌并抽牌，固定牌和朝向，然后渲染结果。
function cutAndDrawCards() {
  const positions = spreads[currentSpread];
  currentDrawnCards = drawCards(positions);
  appState = "reading";

  tarotFlowState.drawnCards = currentDrawnCards;
  renderCards(currentDrawnCards);
  renderReadings(currentDrawnCards);
  renderSummary(currentDrawnCards);
  resetButton.classList.remove("hidden");
  setFlowStep("result");
}

// 从复制后的 78 张牌组中随机抽牌，确保同一次占卜不会重复。
function drawCards(positions) {
  const deckCopy = [...tarotDeck];

  return positions.map((position) => {
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0];
    return {
      card,
      position,
      orientation: getRandomOrientation()
    };
  });
}

// 随机决定牌是正位还是逆位，只在抽牌时调用一次。
function getRandomOrientation() {
  return Math.random() > 0.5 ? "upright" : "reversed";
}

// 将抽到的牌展示在页面上。
function renderCards(drawnCards) {
  cardsContainer.innerHTML = "";
  cardsContainer.className = `cards-container ${drawnCards.length === 3 ? "three-card-spread" : ""}`;

  drawnCards.forEach((item) => {
    const cardElement = document.createElement("article");
    cardElement.className = `tarot-card ${item.orientation === "reversed" ? "is-reversed" : ""}`;
    cardElement.innerHTML = `
      <span class="card-position">${t(item.position.labelKey)}</span>
      <span class="orientation-badge ${item.orientation === "reversed" ? "reversed" : ""}">${getOrientationText(item.orientation)}</span>
      <h3 class="card-name">${getDisplayCardName(item.card)}</h3>
      <p class="card-meta">${getArcanaText(item.card)} · ${getSuitText(item.card)} · ${getElementText(item.card)}</p>
      <p class="keyword-list"><strong>${t("tarot.keywords")}：</strong>${getLocalizedCard(item.card, currentLanguage).keywords.join(" / ")}</p>
    `;
    cardsContainer.appendChild(cardElement);
  });

  resultArea.classList.remove("hidden");
}

// 为每张牌生成本地动态分层解读。
function renderReadings(drawnCards) {
  readingContainer.innerHTML = "";

  drawnCards.forEach((item) => {
    const reading = generateCardReading(item, item.position, currentType, currentQuestion, currentLanguage);
    const block = document.createElement("article");
    block.className = "reading-block";
    block.innerHTML = `
      <h3>${reading.title}</h3>
      <p><strong>${t("positionLabel")}：</strong>${reading.positionMeaning}</p>
      <p><strong>${t("drawnCardLabel")}：</strong>${getLocalizedCard(item.card, currentLanguage).name}，${getArcanaText(item.card)}，${getSuitText(item.card)}，${getElementText(item.card)}。</p>
      <p><strong>${t("meaningLabel")}：</strong>${reading.cardMeaning}</p>
      <p><strong>${t("relationLabel")}：</strong>${reading.relation}</p>
      <p><strong>${t("adviceLabel")}：</strong>${reading.reminder}</p>
    `;
    readingContainer.appendChild(block);
  });

  readingArea.classList.remove("hidden");
}

// 综合所有牌生成本地动态整体总结。
function renderSummary(drawnCards) {
  const summary = generateDeepOverallSummary(drawnCards, currentType, currentQuestion, currentLanguage);

  summaryContainer.innerHTML = `
    <div class="summary-list">
      <p class="summary-section"><strong>${t("currentStatus")}：</strong>${summary.currentState}</p>
      <p class="summary-section"><strong>${t("developmentTrend")}：</strong>${summary.developmentTrend}</p>
      <p class="summary-section"><strong>${t("actionAdvice")}：</strong>${summary.actionAdvice}</p>
      <p class="summary-section"><strong>${t("avoidPitfall")}：</strong>${summary.warning}</p>
      <p class="summary-section reflection-card"><strong>${t("reflectionQuestionLabel")}：</strong>${summary.reflectionQuestion}</p>
    </div>
  `;

  summaryArea.classList.remove("hidden");
}

// 根据当前语言显示牌名，非中文语言优先显示英文牌名。
function getDisplayCardName(card) {
  return getLocalizedCard(card, currentLanguage).name;
}

// 返回正位或逆位的当前语言标签。
function getOrientationText(orientation) {
  return orientation === "upright" ? t("tarot.upright") : t("tarot.reversed");
}

// 返回大阿卡纳或小阿卡纳标签。
function getArcanaText(card) {
  return card.arcana === "major" ? t("tarot.majorArcana") : t("tarot.minorArcana");
}

// 返回牌组标签。
function getSuitText(card) {
  const keyMap = {
    major: "tarot.majorArcana",
    wands: "tarot.wands",
    cups: "tarot.cups",
    swords: "tarot.swords",
    pentacles: "tarot.pentacles"
  };
  return `${t("tarot.suit")}：${t(keyMap[card.suit])}`;
}

// 返回元素标签。
function getElementText(card) {
  const keyMap = {
    major: "tarot.majorArcana",
    fire: "tarot.fire",
    water: "tarot.water",
    air: "tarot.air",
    earth: "tarot.earth"
  };
  return `${t("tarot.element")}：${t(keyMap[card.element])}`;
}

// 只清空结果区域，保留用户输入。
function resetResultOnly() {
  shuffleArea.classList.add("hidden");
  resultArea.classList.add("hidden");
  readingArea.classList.add("hidden");
  summaryArea.classList.add("hidden");
  resetButton.classList.add("hidden");
  cardsContainer.innerHTML = "";
  readingContainer.innerHTML = "";
  summaryContainer.innerHTML = "";
  currentDrawnCards = [];
  tarotFlowState.drawnCards = [];
}

// 重置整个页面，方便重新开始一次占卜。
function resetAll() {
  questionInput.value = "";
  currentType = "love";
  currentSpread = "one";
  questionType.value = currentType;
  spreadType.value = currentSpread;
  startButton.disabled = false;
  safetyMessage.textContent = "";
  appState = "idle";
  tarotFlowState.savedQuestion = "";
  tarotFlowState.savedQuestionType = "love";
  tarotFlowState.savedSpread = "one";
  resetResultOnly();
  setFlowStep("input");
}

languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  StorageAdapter.saveManualLanguage(currentLanguage);
  rerenderForLanguageChange();
});

questionType.addEventListener("change", () => {
  currentType = questionType.value;
});

spreadType.addEventListener("change", () => {
  currentSpread = spreadType.value;
});

startButton.addEventListener("click", startReading);
shuffleActionButton.addEventListener("click", handleShuffleAction);
resetButton.addEventListener("click", resetAll);
backToInputButton.addEventListener("click", () => setFlowStep("input"));
backToProcessButton.addEventListener("click", () => { setFlowStep("process"); updateShuffleControls(); });
saveResultButton.addEventListener("click", () => alert(t("fallback.loading")));
shareResultButton.addEventListener("click", () => alert(t("fallback.loading")));


function renderStepCopy() {
  stepInputLabel.textContent = `1 ${t("form.questionTitle")}`;
  stepProcessLabel.textContent = `2 ${t("flow.focusMessage")}`;
  stepResultLabel.textContent = `3 ${t("result.overallSummaryTitle")}`;
  processTitle.textContent = t("flow.focusMessage");
  backToInputButton.textContent = t("form.questionTitle");
  backToProcessButton.textContent = t("flow.focusMessage");
  saveResultButton.textContent = (stepActionLabels[currentLanguage] || stepActionLabels.en).save;
  shareResultButton.textContent = (stepActionLabels[currentLanguage] || stepActionLabels.en).share;
}

function renderProcessSummary() {
  const question = tarotFlowState.savedQuestion || currentQuestion || questionInput.value.trim();
  const typeLabel = t(questionTypes.find((type) => type.value === (tarotFlowState.savedQuestionType || currentType))?.labelKey || "typeOther");
  const spreadLabel = (tarotFlowState.savedSpread || currentSpread) === "three" ? t("spreads.threeCard") : t("spreads.single");
  questionSummary.textContent = question ? `${t("form.questionLabel")}：${question} · ${t("form.questionTypeLabel")}：${typeLabel} · ${t("form.spreadLabel")}：${spreadLabel}` : t("fallback.noQuestion");
}

validateI18nCoverage();
initLanguage();
initUserProfileUi({
  getLanguage: () => currentLanguage,
  onProfileSaved: (profile) => {
    if (!StorageAdapter.getManualLanguage()) {
      currentLanguage = matchSupportedLanguage(profile.defaultLanguage) || currentLanguage;
      languageSelect.value = currentLanguage;
      rerenderForLanguageChange();
    }
  }
});
setFlowStep("input");

function rerenderForLanguageChange() {
  applyLanguage();
  renderStepCopy();
  renderProcessSummary();
  if (currentDrawnCards.length > 0) {
    renderCards(currentDrawnCards);
    renderReadings(currentDrawnCards);
    renderSummary(currentDrawnCards);
  }
}

function validateI18nCoverage() {
  const requiredI18nPaths = [
    "app.title", "app.subtitle", "app.disclaimer", "app.languageLabel",
    "form.questionTitle", "form.questionLabel", "form.questionPlaceholder", "form.questionTypeLabel", "form.spreadLabel", "form.startButton",
    "questionTypes.love", "questionTypes.career", "questionTypes.study", "questionTypes.money", "questionTypes.relationship", "questionTypes.self", "questionTypes.other",
    "spreads.single", "spreads.threeCard", "spreads.singleDescription", "spreads.threeCardDescription",
    "flow.startShuffle", "flow.stopShuffle", "flow.cutAndDraw", "flow.shufflingMessage", "flow.shuffledMessage", "flow.focusMessage", "flow.resetButton", "flow.readyMessage", "flow.drawingMessage", "flow.resultMessage",
    "result.cardResultTitle", "result.layeredReadingTitle", "result.overallSummaryTitle", "result.currentState", "result.developmentTrend", "result.actionAdvice", "result.warning", "result.reflectionQuestion", "result.positionMeaning", "result.drawnCard", "result.cardMeaning", "result.relationToQuestion", "result.cardReminder",
    "tarot.upright", "tarot.reversed", "tarot.majorArcana", "tarot.minorArcana", "tarot.wands", "tarot.cups", "tarot.swords", "tarot.pentacles", "tarot.fire", "tarot.water", "tarot.air", "tarot.earth", "tarot.keywords", "tarot.suit", "tarot.element",
    "positions.past", "positions.present", "positions.future", "positions.single",
    "safety.blockedTitle", "safety.blockedMessage", "safety.rewriteSuggestions", "safety.medical", "safety.legal", "safety.finance", "safety.gambling", "safety.harm", "safety.death", "safety.certainty", "safety.professionalAdvice",
    "fallback.unknown", "fallback.noMeaning", "fallback.noAdvice", "fallback.noWarning", "fallback.noQuestion", "fallback.loading", "fallback.error"
  ];
  const bankKeys = ["questionTypeBank", "suitBank", "orientationBank", "positionBank", "combinationBank", "actionBank", "warningBank", "reflectionBank", "fallbackBank"];
  supportedLanguages.forEach(({ code }) => {
    requiredI18nPaths.forEach((path) => {
      if (!getI18nValue(code, path)) console.warn(`Missing i18n key: ${code}.${path}`);
    });
    tarotDeck.forEach((card) => {
      const localized = card.localized?.[code];
      ["name", "keywords", "uprightMeaning", "reversedMeaning", "advice", "warning"].forEach((field) => {
        if (!localized || !localized[field] || (field === "keywords" && localized[field].length === 0)) console.warn(`Missing tarot localization: ${card.id}.${code}.${field}`);
      });
    });
    const bank = getInterpretationBank(code);
    bankKeys.forEach((key) => {
      if (!bank[key]) console.warn(`Missing interpretation bank: ${code}.${key}`);
    });
  });
}
