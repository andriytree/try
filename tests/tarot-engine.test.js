const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const warnings = [];
const storage = {};
const context = {
  console: {
    log: (...args) => console.log(...args),
    warn: (...args) => warnings.push(args)
  },
  localStorage: {
    getItem(key) { return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null; },
    setItem(key, value) { storage[key] = String(value); },
    removeItem(key) { delete storage[key]; },
    clear() { Object.keys(storage).forEach((key) => delete storage[key]); }
  },
  navigator: { languages:["en"], language:"en" }
};

vm.createContext(context);
[
  "storage-adapter.js",
  "tarot-data.js",
  "i18n.js",
  "interpretation-bank.js",
  "reading-engine.js",
  "deep-summary-engine.js"
].forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename:file }));

function evaluate(source) {
  return vm.runInContext(source, context);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertArray(value, minimum, label) {
  assert(Array.isArray(value), `${label} must be an array`);
  assert(value.length >= minimum, `${label} expected at least ${minimum}, received ${value.length}`);
  assert(value.every((item) => typeof item === "string" && item.trim()), `${label} contains an empty or non-string item`);
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/gu, " ").trim();
}

function flattenVisibleOutput(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

const forbidden = /undefined|null|\[object Object\]|manyReversed|manyMajor|manyWands|manyCups|manySwords|manyPentacles|cupsSwords|swordsWands|wandsPentacles|cupsPentacles|energyShift|reflectionQuestion\s*\d+|反思问题\s*\d+|反思問題\s*\d+|professionalAdvice|fallback\.|牌面已经展开|牌面已經展開|本工具不能替代专业建议|本工具不能替代專業建議/iu;

const deck = evaluate("tarotDeck");
const languages = evaluate("tarotLanguageCodes");

assert(deck.length === 78, `deck must contain 78 cards, received ${deck.length}`);
assert(evaluate("validateTarotSemanticCorpus().valid") === true, "runtime corpus validation must pass");

const topLevelFields = ["id","arcana","suit","rank","element","number","archetype","symbols","themes","localized"];
const arrayMinimums = {
  uprightKeywords:8,
  reversedKeywords:8,
  uprightMeanings:6,
  reversedMeanings:6,
  shadowMeanings:4,
  strengths:4,
  challenges:4,
  reflectionVariants:8
};

deck.forEach((card) => {
  topLevelFields.forEach((field) => assert(card[field] !== undefined && card[field] !== null, `${card.id}.${field} missing`));
  assert(["fire","water","air","earth"].includes(card.element), `${card.id}.element must be a real spread element`);
  assertArray(card.symbols, 3, `${card.id}.symbols`);
  assertArray(card.themes, 4, `${card.id}.themes`);
  languages.forEach((language) => {
    const localized = card.localized[language];
    assert(localized, `${card.id}.${language} localization missing`);
    ["name","shortName","coreTheme"].forEach((field) => assert(typeof localized[field] === "string" && localized[field].trim(), `${card.id}.${language}.${field} missing`));
    Object.entries(arrayMinimums).forEach(([field, minimum]) => assertArray(localized[field], minimum, `${card.id}.${language}.${field}`));
    assert(new Set(localized.uprightKeywords).size >= 8, `${card.id}.${language}.uprightKeywords must contain 8 distinct terms`);
    assert(new Set(localized.reversedKeywords).size >= 8, `${card.id}.${language}.reversedKeywords must contain 8 distinct terms`);
    assert(localized.uprightKeywords.join("|") !== localized.reversedKeywords.join("|"), `${card.id}.${language} upright and reversed keywords must differ`);
    ["upright","reversed"].forEach((orientation) => {
      assertArray(localized.adviceVariants[orientation], 6, `${card.id}.${language}.adviceVariants.${orientation}`);
      assertArray(localized.warningVariants[orientation], 5, `${card.id}.${language}.warningVariants.${orientation}`);
    });
    ["past","present","future","single"].forEach((position) => assertArray(localized.positionMeanings[position], 4, `${card.id}.${language}.positionMeanings.${position}`));
    ["love","career","study","money","relationship","self","other"].forEach((domain) => assertArray(localized.domainMeanings[domain], 2, `${card.id}.${language}.domainMeanings.${domain}`));
    const visible = flattenVisibleOutput(localized);
    assert(!forbidden.test(visible), `${card.id}.${language} contains an internal or fallback token`);
  });
});

["en","zh-CN","zh-TW"].forEach((language) => {
  const uprightSignatures = new Set(deck.map((card) => card.localized[language].uprightKeywords.join("|")));
  const reversedSignatures = new Set(deck.map((card) => card.localized[language].reversedKeywords.join("|")));
  assert(uprightSignatures.size === 78, `${language} upright keyword signatures must be unique per card`);
  assert(reversedSignatures.size === 78, `${language} reversed keyword signatures must be unique per card`);
});

const semanticExamples = {
  "major-07-chariot":["willpower","direction","self-discipline","integration"],
  "major-03-empress":["abundance","nurture","creation","receptivity"],
  "major-05-hierophant":["tradition","rules","belief","teaching"],
  "swords-10":["ending","absolute limit","mental burden","painful clarity"],
  "swords-ace":["clarity","truth","new perspective","breakthrough"]
};
Object.entries(semanticExamples).forEach(([cardId, expected]) => {
  const keywords = deck.find((card) => card.id === cardId).localized.en.uprightKeywords;
  expected.forEach((keyword) => assert(keywords.includes(keyword), `${cardId} must include ${keyword}`));
});

const sourceAudit = ["tarot-data.js","interpretation-bank.js","reading-engine.js","deep-summary-engine.js"].map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
assert(!/const\s+minorRanks\b|rank\.upright|suitInfo\.themes|localizedSuits\[[^\]]+\]\.kw/u.test(sourceAudit), "rank+suit or shared-keyword generator must not return");
assert(!/["']觉察["']\s*,\s*["']选择["']\s*,\s*["']调整["']\s*,\s*["']行动["']/u.test(sourceAudit), "shared four-keyword fallback must not return");

const traditionalMap = evaluate("traditionalCharacterMap");
const traditionalVisible = JSON.stringify({
  cards:deck.map((card) => card.localized["zh-TW"]),
  bank:evaluate('getInterpretationBank("zh-TW")')
}).replace(/皇后/gu, "").replace(/里程碑/gu, "");
const traditionalVisibleWithContextRemoved = traditionalVisible.replace(/干擾|干預/gu, "");
const remainingSimplified = [...new Set(Array.from(traditionalVisibleWithContextRemoved).filter((char) => traditionalMap[char]))];
assert(remainingSimplified.length === 0, `zh-TW contains convertible simplified characters: ${remainingSimplified.join("")}`);

const positions = [{ key:"past" }, { key:"present" }, { key:"future" }];
const questionTypes = ["love","career","study","money","relationship","self","other"];
const readingFieldValues = { positionMeaning:[], cardMeaning:[], relation:[], reminder:[] };

deck.forEach((card, index) => {
  ["upright","reversed"].forEach((orientation, orientationIndex) => {
    const position = positions[(index + orientationIndex) % positions.length];
    const item = { card, orientation, position };
    const questionType = questionTypes[index % questionTypes.length];
    const reading = evaluate(`generateCardReading({ card:tarotDeck[${index}], orientation:${JSON.stringify(orientation)}, position:${JSON.stringify(position)} }, ${JSON.stringify(position)}, ${JSON.stringify(questionType)}, ${JSON.stringify("我可以怎样更清楚地处理这件事？")}, "zh-CN")`);
    Object.entries(reading).forEach(([field, value]) => {
      if (field === "keywords") return;
      assert(typeof value === "string" && value.trim(), `${card.id}.${orientation}.${field} must be visible text`);
    });
    assert(reading.keywords.join("|") === card.localized["zh-CN"][orientation === "reversed" ? "reversedKeywords" : "uprightKeywords"].join("|"), `${card.id}.${orientation} must display orientation-specific keywords`);
    assert(!forbidden.test(flattenVisibleOutput(reading)), `${card.id}.${orientation} reading leaked an internal token`);
    Object.keys(readingFieldValues).forEach((field) => readingFieldValues[field].push(normalizeText(reading[field])));
  });
});

Object.entries(readingFieldValues).forEach(([field, values]) => {
  const ratio = new Set(values).size / values.length;
  assert(ratio >= 0.9, `${field} uniqueness ratio too low: ${ratio.toFixed(3)}`);
});

const spreadIndexes = [7, 3, 59];
const spreadsByLanguage = {
  "zh-CN":"我应该如何改善这段关系？",
  "zh-TW":"我應該如何改善這段關係？",
  en:"How should I improve this relationship?",
  ru:"Как мне улучшить эти отношения?",
  ja:"この関係をどう改善すればよいですか？",
  ko:"이 관계를 어떻게 개선할 수 있을까요?"
};

Object.entries(spreadsByLanguage).forEach(([language, question]) => {
  const output = evaluate(`(() => {
    const cards=${JSON.stringify(spreadIndexes)}.map((index, cardIndex) => ({ card:tarotDeck[index], orientation:cardIndex === 1 ? "reversed" : "upright", position:[{key:"past"},{key:"present"},{key:"future"}][cardIndex] }));
    return { readings:cards.map((item) => generateCardReading(item, item.position, "love", ${JSON.stringify(question)}, ${JSON.stringify(language)})), summary:generateDeepOverallSummary(cards, "love", ${JSON.stringify(question)}, ${JSON.stringify(language)}) };
  })()`);
  const visible = flattenVisibleOutput(output);
  assert(!forbidden.test(visible), `${language} spread leaked an internal or fallback token`);
  assert(evaluate(`validateReadingOutput(${JSON.stringify(output)}, ${JSON.stringify(language)}).valid`) === true, `${language} spread failed output validation`);
  if (language === "zh-TW") {
    const normalizedTraditional = visible.replace(/皇后/gu, "").replace(/里程碑/gu, "").replace(/干擾|干預/gu, "");
    const simplifiedInGeneratedOutput = [...new Set(Array.from(normalizedTraditional).filter((char) => traditionalMap[char]))];
    assert(simplifiedInGeneratedOutput.length === 0, `zh-TW generated output contains simplified characters: ${simplifiedInGeneratedOutput.join("")}`);
  }
  if (["en","ru","ko"].includes(language)) assert(!/[\u3400-\u4dbf\u4e00-\u9fff]/u.test(visible), `${language} output contains Han characters`);
  assert(/[?？]$/u.test(output.summary.reflectionQuestion), `${language} reflection must be a real question`);
});

const deterministicSpread = `(() => {
  const cards=[7,3,59].map((index, cardIndex) => ({ card:tarotDeck[index], orientation:cardIndex === 1 ? "reversed" : "upright", position:[{key:"past"},{key:"present"},{key:"future"}][cardIndex] }));
  return generateDeepOverallSummary(cards, "relationship", "How can I communicate more clearly?", "en");
})()`;
const firstDeterministic = evaluate(deterministicSpread);
const secondDeterministic = evaluate(deterministicSpread);
assert(JSON.stringify(firstDeterministic) === JSON.stringify(secondDeterministic), "same spread and question must reproduce the same variants within a session");

const actionSet = new Set();
const reflectionSet = new Set();
for (let run = 0; run < 5; run += 1) {
  const indexes = [run * 3, run * 3 + 1, run * 3 + 2];
  const summary = evaluate(`(() => {
    const cards=${JSON.stringify(indexes)}.map((index, cardIndex) => ({ card:tarotDeck[index], orientation:(index + cardIndex) % 2 ? "reversed" : "upright", position:[{key:"past"},{key:"present"},{key:"future"}][cardIndex] }));
    return generateDeepOverallSummary(cards, "self", ${JSON.stringify(`How can I grow through pattern ${run}?`)}, "en");
  })()`);
  assert(!forbidden.test(flattenVisibleOutput(summary)), `run ${run} summary leaked an internal token`);
  actionSet.add(summary.actionAdvice);
  reflectionSet.add(summary.reflectionQuestion);
}
assert(actionSet.size >= 4, `five readings need varied actions, received ${actionSet.size}`);
assert(reflectionSet.size >= 4, `five readings need varied reflections, received ${reflectionSet.size}`);

const pattern = evaluate(`analyzeSpreadPattern([
  {card:tarotDeck.find((card)=>card.id==="wands-02"),orientation:"upright",position:{key:"past"}},
  {card:tarotDeck.find((card)=>card.id==="cups-05"),orientation:"reversed",position:{key:"present"}},
  {card:tarotDeck.find((card)=>card.id==="swords-08"),orientation:"upright",position:{key:"future"}}
])`);
assert(pattern.numberPattern === "ascending", `expected ascending number pattern, received ${pattern.numberPattern}`);
assert(pattern.orientationFlow === "blocked_open", `expected blocked_open flow, received ${pattern.orientationFlow}`);
assert(pattern.elementRelation === "water_air", `expected water_air relation, received ${pattern.elementRelation}`);
assert(pattern.reversedCount === 1, `expected one reversed card, received ${pattern.reversedCount}`);

const validationWarnings = warnings.filter((entry) => String(entry[0]).includes("validation failed") || String(entry[0]).includes("Unsafe reading text"));
assert(validationWarnings.length === 0, `unexpected validation warnings: ${JSON.stringify(validationWarnings.slice(0, 3))}`);

console.log(`Tarot engine tests passed: ${deck.length} cards × ${languages.length} languages, ${deck.length * 2} layered readings, multilingual summaries, deterministic variants, and spread-pattern analysis.`);
