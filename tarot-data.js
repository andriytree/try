const majorArcana = [
  ["major-00-fool", "愚者", "The Fool", ["开始", "自由", "未知", "冒险"], "新的阶段正在展开，适合保持开放与好奇，在探索中学习。", "可能存在准备不足、冲动或逃避现实的倾向，需要先看清风险。", "带着初心行动，但先确认必要条件。", "避免只凭一时兴起做决定。"],
  ["major-01-magician", "魔术师", "The Magician", ["行动", "资源", "创造", "表达"], "你可能已经拥有可用资源，适合把想法转化为具体行动。", "资源分散、表达不清或行动力不足可能正在影响进展。", "盘点手中的资源，选择一个最具体的切入点。", "避免空想太多却迟迟不开始。"],
  ["major-02-high-priestess", "女祭司", "The High Priestess", ["直觉", "沉静", "观察", "内在智慧"], "适合倾听内在感受，暂时不急着做出判断。", "你可能忽略了真实感受，或被表象与焦虑干扰。", "先观察事实和感受，再决定下一步。", "避免被情绪或猜测牵着走。"],
  ["major-03-empress", "女皇", "The Empress", ["滋养", "关系", "丰盛", "接纳"], "温柔照顾、稳定支持和自然生长会带来帮助。", "可能存在过度付出、依赖舒适区或忽略自身边界。", "给关系或计划更多耐心和滋养。", "避免只照顾他人而忘了自己。"],
  ["major-04-emperor", "皇帝", "The Emperor", ["秩序", "责任", "边界", "规划"], "建立规则、承担责任和清晰计划有助于推进。", "过度控制或缺少结构都可能让事情失衡。", "把目标拆成明确步骤，并设定边界。", "避免用强硬掩盖不安。"],
  ["major-05-hierophant", "教皇", "The Hierophant", ["传统", "学习", "信念", "指引"], "可以参考经验、规则或值得信任的建议。", "旧有观念可能不再适合当下，需要重新辨别。", "向可靠来源学习，也保留自己的判断。", "避免盲目顺从权威或惯例。"],
  ["major-06-lovers", "恋人", "The Lovers", ["选择", "关系", "价值观", "连接"], "真诚连接和价值观对齐是当前重点。", "关系失衡、犹豫或需求不清可能造成拉扯。", "诚实面对自己的选择与期待。", "避免为了迎合而忽略真实感受。"],
  ["major-07-chariot", "战车", "The Chariot", ["前进", "意志", "控制", "突破"], "集中力量前进，自律和方向感会带来突破。", "方向混乱、急躁或过度用力可能降低效率。", "先确定方向，再把力量集中到关键行动。", "避免一边犹豫一边硬冲。"],
  ["major-08-strength", "力量", "Strength", ["勇气", "耐心", "温柔", "内在力量"], "稳定、耐心和温柔的力量能帮助你处理挑战。", "信心不足、情绪压抑或过度逞强需要被看见。", "用温和但坚定的方式回应压力。", "避免把脆弱误认为失败。"],
  ["major-09-hermit", "隐士", "The Hermit", ["独处", "反思", "寻找", "沉淀"], "放慢脚步，通过独处和反思看清方向。", "过度封闭或逃避必要沟通可能让你更孤立。", "给自己安静整理的时间。", "避免把退缩当作真正的解决。"],
  ["major-10-wheel", "命运之轮", "Wheel of Fortune", ["变化", "周期", "机会", "转折"], "局势可能进入变化期，可以顺势调整。", "暂时的不稳定或重复模式需要被觉察。", "观察变化中的机会，灵活调整策略。", "避免抗拒一切变化。"],
  ["major-11-justice", "正义", "Justice", ["公平", "判断", "因果", "清晰"], "用理性和事实看待问题，重视责任与平衡。", "偏见、信息不完整或回避责任可能影响判断。", "把事实、责任和需求分别写清楚。", "避免只站在单一立场下结论。"],
  ["major-12-hanged-man", "倒吊人", "The Hanged Man", ["暂停", "换位", "等待", "释放"], "暂停推进，从不同角度重新理解处境。", "无谓拖延、抗拒改变或不愿放下旧方式可能卡住你。", "换一个角度看问题，允许暂时等待。", "避免把等待变成逃避。"],
  ["major-13-death", "死神", "Death", ["结束", "转化", "放下", "更新"], "一个阶段可能正在结束，更新也在酝酿。", "你可能仍抓着已经不适合的模式，不愿承认变化。", "温和地告别旧状态，为新阶段腾空间。", "避免把结束等同于失败。"],
  ["major-14-temperance", "节制", "Temperance", ["平衡", "整合", "疗愈", "耐心"], "温和、渐进地整合资源与情绪会更有效。", "失衡、过度消耗或节奏过快需要被调整。", "寻找中间道路，不必急于求成。", "避免极端化处理问题。"],
  ["major-15-devil", "恶魔", "The Devil", ["束缚", "欲望", "依赖", "阴影"], "看见让自己受困的习惯、执念或依赖，是松动的开始。", "你可能正在被恐惧、欲望或旧模式牵制。", "诚实辨认自己被什么困住。", "避免用短暂满足掩盖长期问题。"],
  ["major-16-tower", "高塔", "The Tower", ["冲击", "真相", "重建", "觉醒"], "旧结构可能需要被看见和调整，变化中也有重建空间。", "你可能已经感到不安，却仍在回避必要改变。", "先承认真实状况，再决定如何重建。", "避免继续粉饰已经不稳的结构。"],
  ["major-17-star", "星星", "The Star", ["希望", "疗愈", "信任", "愿景"], "温和的希望正在出现，长期修复和成长值得信任。", "暂时缺少信心，需要重新连接自己的愿望。", "给自己恢复信任的时间。", "避免因为短期低落否定长期可能。"],
  ["major-18-moon", "月亮", "The Moon", ["不确定", "潜意识", "情绪", "迷雾"], "承认不确定感，先分辨情绪、想象和事实。", "迷雾正在散开，但仍需要谨慎确认信息。", "慢一点，确认信息后再回应。", "避免在焦虑中自行脑补结论。"],
  ["major-19-sun", "太阳", "The Sun", ["清晰", "活力", "喜悦", "坦诚"], "坦诚、积极和清晰的方式可能带来更多活力。", "不要勉强乐观，可以先处理被遮住的真实感受。", "让事情回到简单、清楚和真诚。", "避免用表面乐观压住问题。"],
  ["major-20-judgement", "审判", "Judgement", ["觉醒", "复盘", "召唤", "更新"], "复盘过去，从新的理解中做出更成熟的回应。", "自我批判过重，或还没有准备好面对重要呼唤。", "总结经验，给自己一次重新选择的机会。", "避免一直停留在后悔里。"],
  ["major-21-world", "世界", "The World", ["完成", "整合", "成就", "新阶段"], "阶段性完成和整合正在显现，可以看见自己的成长。", "某个循环尚未真正收尾，仍需要补足最后一步。", "庆祝进展，同时完成必要收尾。", "避免急着开启新阶段而忽略整合。"]
];

const minorSuits = {
  wands: { nameCn: "权杖", nameEn: "Wands", element: "fire", themes: "事业、行动、热情、创造力、推进力", keywords: ["行动", "热情", "创造", "推进"] },
  cups: { nameCn: "圣杯", nameEn: "Cups", element: "water", themes: "感情、人际、情绪、关系、内在感受", keywords: ["情绪", "关系", "感受", "连接"] },
  swords: { nameCn: "宝剑", nameEn: "Swords", element: "air", themes: "思维、冲突、判断、压力、沟通、理性", keywords: ["思考", "沟通", "判断", "压力"] },
  pentacles: { nameCn: "星币", nameEn: "Pentacles", element: "earth", themes: "金钱、物质、工作、资源、稳定、安全感", keywords: ["资源", "稳定", "工作", "现实"] }
};

const minorRanks = [
  { id: "ace", nameCn: "A", nameEn: "Ace", focus: "新的开始", upright: "新的机会或动力正在出现，适合认真感受它的潜力。", reversed: "开始的力量可能还不稳定，需要补足准备或信心。" },
  { id: "02", nameCn: "2", nameEn: "Two", focus: "选择与平衡", upright: "你可能正在面对选择，平衡不同需求会很重要。", reversed: "摇摆、迟疑或失衡可能让进展暂时放慢。" },
  { id: "03", nameCn: "3", nameEn: "Three", focus: "扩展与合作", upright: "事情有扩展空间，合作或外部支持可能带来帮助。", reversed: "合作不顺、期待落差或计划不足需要被调整。" },
  { id: "04", nameCn: "4", nameEn: "Four", focus: "稳定与结构", upright: "稳定基础正在形成，可以把注意力放在安全感和结构上。", reversed: "过度保守或基础不稳可能限制新的可能。" },
  { id: "05", nameCn: "5", nameEn: "Five", focus: "冲突与挑战", upright: "挑战正在显现，它提醒你看见问题并重新调整。", reversed: "冲突有缓和机会，但仍需要诚实面对核心原因。" },
  { id: "06", nameCn: "6", nameEn: "Six", focus: "调整与支持", upright: "支持、修复或阶段性改善正在出现，可以接纳帮助。", reversed: "你可能还在旧状态中徘徊，需要主动调整关系或资源流动。" },
  { id: "07", nameCn: "7", nameEn: "Seven", focus: "坚持与评估", upright: "需要坚持，也需要评估当前策略是否仍然有效。", reversed: "防御、怀疑或策略混乱可能消耗你的力量。" },
  { id: "08", nameCn: "8", nameEn: "Eight", focus: "推进与练习", upright: "持续练习和稳定推进会带来可见变化。", reversed: "节奏受阻、重复低效或急于求成需要被看见。" },
  { id: "09", nameCn: "9", nameEn: "Nine", focus: "积累与临界点", upright: "经验正在累积，离阶段性成果或领悟更近一步。", reversed: "疲惫、防备或过度担心可能影响你看见已有成果。" },
  { id: "10", nameCn: "10", nameEn: "Ten", focus: "完成与负荷", upright: "一个阶段接近完成，同时也要关注责任和压力。", reversed: "负担过重或收尾困难提醒你重新分配精力。" },
  { id: "page", nameCn: "侍从", nameEn: "Page", focus: "学习与消息", upright: "适合保持学习心态，新的消息或尝试可能出现。", reversed: "经验不足、信息不清或心态不稳需要更多练习。" },
  { id: "knight", nameCn: "骑士", nameEn: "Knight", focus: "行动与追求", upright: "行动欲望增强，可以带着目标继续推进。", reversed: "冲动、急躁或方向过窄可能带来消耗。" },
  { id: "queen", nameCn: "皇后", nameEn: "Queen", focus: "成熟与接纳", upright: "成熟的照顾、理解和掌控力正在发挥作用。", reversed: "过度承担、情绪内耗或边界不清需要被调整。" },
  { id: "king", nameCn: "国王", nameEn: "King", focus: "掌控与责任", upright: "适合以成熟、稳定和负责任的方式处理现实。", reversed: "控制欲、僵化或逃避责任可能让局面失衡。" }
];

const tarotDeck = [
  ...majorArcana.map(([id, nameCn, nameEn, keywords, uprightMeaning, reversedMeaning, advice, warning]) => ({
    id, nameCn, nameEn, arcana: "major", suit: "major", element: "major", keywords, uprightMeaning, reversedMeaning, advice, warning
  })),
  ...Object.entries(minorSuits).flatMap(([suit, suitInfo]) => minorRanks.map((rank) => ({
    id: `${suit}-${rank.id}`,
    nameCn: `${suitInfo.nameCn}${rank.nameCn}`,
    nameEn: `${rank.nameEn} of ${suitInfo.nameEn}`,
    arcana: "minor",
    suit,
    element: suitInfo.element,
    keywords: [rank.focus, ...suitInfo.keywords.slice(0, 3)],
    uprightMeaning: `${rank.upright} 在${suitInfo.themes}相关议题中，它提示你关注“${rank.focus}”。`,
    reversedMeaning: `${rank.reversed} 在${suitInfo.themes}相关议题中，它提醒你放慢并重新整理。`,
    advice: `围绕${suitInfo.themes}，你可以从“${rank.focus}”这个角度采取一个温和而具体的行动。`,
    warning: `避免在${suitInfo.nameCn}能量中过度执着单一结果，也不要忽略现实反馈。`
  })))
];

const tarotLanguageCodes = ["zh-CN", "zh-TW", "en", "ja", "ko", "es", "fr", "de", "pt", "ru", "ar", "hi"];
const localizedMajorNames = {
  "zh-CN": ["愚者","魔术师","女祭司","女皇","皇帝","教皇","恋人","战车","力量","隐士","命运之轮","正义","倒吊人","死神","节制","恶魔","高塔","星星","月亮","太阳","审判","世界"],
  "zh-TW": ["愚者","魔術師","女祭司","女皇","皇帝","教皇","戀人","戰車","力量","隱士","命運之輪","正義","倒吊人","死神","節制","惡魔","高塔","星星","月亮","太陽","審判","世界"],
  en: ["The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"],
  ja: ["愚者","魔術師","女司祭","女帝","皇帝","教皇","恋人","戦車","力","隠者","運命の輪","正義","吊るされた男","死神","節制","悪魔","塔","星","月","太陽","審判","世界"],
  ko: ["바보","마법사","여사제","여제","황제","교황","연인","전차","힘","은둔자","운명의 수레바퀴","정의","매달린 사람","죽음","절제","악마","탑","별","달","태양","심판","세계"],
  es: ["El Loco","El Mago","La Sacerdotisa","La Emperatriz","El Emperador","El Hierofante","Los Enamorados","El Carro","La Fuerza","El Ermitaño","La Rueda de la Fortuna","La Justicia","El Colgado","La Muerte","La Templanza","El Diablo","La Torre","La Estrella","La Luna","El Sol","El Juicio","El Mundo"],
  fr: ["Le Mat","Le Magicien","La Papesse","L’Impératrice","L’Empereur","Le Hiérophante","Les Amoureux","Le Chariot","La Force","L’Ermite","La Roue de Fortune","La Justice","Le Pendu","La Mort","Tempérance","Le Diable","La Maison Dieu","L’Étoile","La Lune","Le Soleil","Le Jugement","Le Monde"],
  de: ["Der Narr","Der Magier","Die Hohepriesterin","Die Herrscherin","Der Herrscher","Der Hierophant","Die Liebenden","Der Wagen","Die Kraft","Der Eremit","Rad des Schicksals","Gerechtigkeit","Der Gehängte","Der Tod","Mäßigkeit","Der Teufel","Der Turm","Der Stern","Der Mond","Die Sonne","Gericht","Die Welt"],
  pt: ["O Louco","O Mago","A Sacerdotisa","A Imperatriz","O Imperador","O Hierofante","Os Enamorados","O Carro","A Força","O Eremita","A Roda da Fortuna","A Justiça","O Enforcado","A Morte","A Temperança","O Diabo","A Torre","A Estrela","A Lua","O Sol","O Julgamento","O Mundo"],
  ru: ["Шут","Маг","Верховная Жрица","Императрица","Император","Иерофант","Влюблённые","Колесница","Сила","Отшельник","Колесо Фортуны","Справедливость","Повешенный","Смерть","Умеренность","Дьявол","Башня","Звезда","Луна","Солнце","Суд","Мир"],
  ar: ["الأحمق","الساحر","الكاهنة العليا","الإمبراطورة","الإمبراطور","الهيروفانت","العشاق","العربة","القوة","الناسك","عجلة الحظ","العدالة","المعلّق","الموت","الاعتدال","الشيطان","البرج","النجمة","القمر","الشمس","الحكم","العالم"],
  hi: ["मूर्ख","जादूगर","महायाजिका","सम्राज्ञी","सम्राट","हाइरोफैंट","प्रेमी","रथ","शक्ति","सन्यासी","भाग्य चक्र","न्याय","लटका हुआ व्यक्ति","मृत्यु","संयम","शैतान","मीनार","तारा","चंद्रमा","सूर्य","निर्णय","विश्व"]
};
const localizedSuits = {
  "zh-CN": { major:"大阿卡纳", wands:"权杖", cups:"圣杯", swords:"宝剑", pentacles:"星币", ranks:["A","2","3","4","5","6","7","8","9","10","侍从","骑士","皇后","国王"], kw:["觉察","选择","调整","行动"] },
  "zh-TW": { major:"大阿卡納", wands:"權杖", cups:"聖杯", swords:"寶劍", pentacles:"星幣", ranks:["A","2","3","4","5","6","7","8","9","10","侍從","騎士","皇后","國王"], kw:["覺察","選擇","調整","行動"] },
  en: { major:"Major Arcana", wands:"Wands", cups:"Cups", swords:"Swords", pentacles:"Pentacles", ranks:["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"], kw:["awareness","choice","adjustment","action"] },
  ja: { major:"大アルカナ", wands:"ワンド", cups:"カップ", swords:"ソード", pentacles:"ペンタクル", ranks:["エース","2","3","4","5","6","7","8","9","10","ペイジ","ナイト","クイーン","キング"], kw:["気づき","選択","調整","行動"] },
  ko: { major:"메이저 아르카나", wands:"완드", cups:"컵", swords:"소드", pentacles:"펜타클", ranks:["에이스","2","3","4","5","6","7","8","9","10","페이지","기사","여왕","왕"], kw:["자각","선택","조정","행동"] },
  es: { major:"Arcanos mayores", wands:"Bastos", cups:"Copas", swords:"Espadas", pentacles:"Oros", ranks:["As","Dos","Tres","Cuatro","Cinco","Seis","Siete","Ocho","Nueve","Diez","Sota","Caballero","Reina","Rey"], kw:["conciencia","elección","ajuste","acción"] },
  fr: { major:"Arcanes majeurs", wands:"Bâtons", cups:"Coupes", swords:"Épées", pentacles:"Pentacles", ranks:["As","Deux","Trois","Quatre","Cinq","Six","Sept","Huit","Neuf","Dix","Page","Chevalier","Reine","Roi"], kw:["conscience","choix","ajustement","action"] },
  de: { major:"Große Arkana", wands:"Stäbe", cups:"Kelche", swords:"Schwerter", pentacles:"Münzen", ranks:["Ass","Zwei","Drei","Vier","Fünf","Sechs","Sieben","Acht","Neun","Zehn","Bube","Ritter","Königin","König"], kw:["Bewusstsein","Wahl","Anpassung","Handlung"] },
  pt: { major:"Arcanos maiores", wands:"Paus", cups:"Copas", swords:"Espadas", pentacles:"Ouros", ranks:["Ás","Dois","Três","Quatro","Cinco","Seis","Sete","Oito","Nove","Dez","Pajem","Cavaleiro","Rainha","Rei"], kw:["consciência","escolha","ajuste","ação"] },
  ru: { major:"Старшие арканы", wands:"Жезлы", cups:"Кубки", swords:"Мечи", pentacles:"Пентакли", ranks:["Туз","Двойка","Тройка","Четвёрка","Пятёрка","Шестёрка","Семёрка","Восьмёрка","Девятка","Десятка","Паж","Рыцарь","Королева","Король"], kw:["осознание","выбор","настройка","действие"] },
  ar: { major:"الأركانا الكبرى", wands:"العصي", cups:"الكؤوس", swords:"السيوف", pentacles:"النجوم الخماسية", ranks:["آس","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة","الصفحة","الفارس","الملكة","الملك"], kw:["وعي","اختيار","تعديل","فعل"] },
  hi: { major:"मेजर अर्काना", wands:"वैंड्स", cups:"कप्स", swords:"स्वॉर्ड्स", pentacles:"पेंटाकल्स", ranks:["ऐस","दो","तीन","चार","पाँच","छह","सात","आठ","नौ","दस","पेज","नाइट","क्वीन","किंग"], kw:["जागरूकता","चयन","समायोजन","कार्य"] }
};
const localizedTemplates = {
  "zh-CN": { up:n=>`${n}正位提示能量较清晰，适合顺势观察和行动。`, rev:n=>`${n}逆位提醒先修正节奏、期待或沟通方式。`, adv:n=>`围绕${n}，选择一个温和而具体的行动。`, warn:n=>`避免把${n}理解成确定答案，仍要看现实反馈。` },
  "zh-TW": { up:n=>`${n}正位提示能量較清晰，適合順勢觀察和行動。`, rev:n=>`${n}逆位提醒先修正節奏、期待或溝通方式。`, adv:n=>`圍繞${n}，選擇一個溫和而具體的行動。`, warn:n=>`避免把${n}理解成確定答案，仍要看現實回饋。` },
  en: { up:n=>`${n} upright suggests clearer energy and a chance to respond constructively.`, rev:n=>`${n} reversed asks you to adjust pace, expectations, or communication.`, adv:n=>`Around ${n}, choose one gentle and concrete action.`, warn:n=>`Do not treat ${n} as a fixed answer; check real feedback.` },
  ja: { up:n=>`${n}の正位置は、流れが比較的明確で建設的に動けることを示します。`, rev:n=>`${n}の逆位置は、ペース、期待、伝え方の調整を促します。`, adv:n=>`${n}をめぐり、穏やかで具体的な一歩を選んでください。`, warn:n=>`${n}を固定された答えとして扱わず、現実の反応を確認してください。` },
  ko: { up:n=>`${n} 정방향은 에너지가 비교적 분명하며 건설적으로 대응할 수 있음을 보여줍니다.`, rev:n=>`${n} 역방향은 속도, 기대, 소통 방식을 조정하라고 말합니다.`, adv:n=>`${n}와 관련해 부드럽고 구체적인 한 걸음을 선택하세요.`, warn:n=>`${n}를 고정된 답으로 보지 말고 현실의 반응을 확인하세요.` },
  es: { up:n=>`${n} en posición derecha muestra una energía más clara para responder con cuidado.`, rev:n=>`${n} invertida pide ajustar ritmo, expectativas o comunicación.`, adv:n=>`En torno a ${n}, elige una acción suave y concreta.`, warn:n=>`No tomes ${n} como una respuesta fija; observa la realidad.` },
  fr: { up:n=>`${n} à l’endroit indique une énergie plus claire pour répondre avec justesse.`, rev:n=>`${n} renversée invite à ajuster le rythme, les attentes ou la communication.`, adv:n=>`Autour de ${n}, choisissez une action douce et concrète.`, warn:n=>`Ne prenez pas ${n} comme une réponse figée; observez les faits.` },
  de: { up:n=>`${n} aufrecht zeigt klarere Energie für eine bewusste Reaktion.`, rev:n=>`${n} umgekehrt bittet um Anpassung von Tempo, Erwartungen oder Kommunikation.`, adv:n=>`Wähle rund um ${n} eine sanfte und konkrete Handlung.`, warn:n=>`Behandle ${n} nicht als feste Antwort; prüfe reale Rückmeldungen.` },
  pt: { up:n=>`${n} direto mostra energia mais clara para responder com cuidado.`, rev:n=>`${n} invertido pede ajustar ritmo, expectativas ou comunicação.`, adv:n=>`Em torno de ${n}, escolha uma ação gentil e concreta.`, warn:n=>`Não trate ${n} como resposta fixa; observe a realidade.` },
  ru: { up:n=>`${n} в прямом положении показывает более ясную энергию для осознанного ответа.`, rev:n=>`${n} в перевёрнутом положении просит настроить темп, ожидания или общение.`, adv:n=>`Вокруг ${n} выберите мягкое и конкретное действие.`, warn:n=>`Не воспринимайте ${n} как фиксированный ответ; смотрите на реальные сигналы.` },
  ar: { up:n=>`${n} في الوضع المعتدل يشير إلى طاقة أوضح لاستجابة واعية.`, rev:n=>`${n} في الوضع المعكوس يطلب تعديل الوتيرة أو التوقعات أو التواصل.`, adv:n=>`حول ${n} اختر خطوة لطيفة وملموسة.`, warn:n=>`لا تعتبر ${n} إجابة ثابتة؛ راقب الواقع.` },
  hi: { up:n=>`${n} सीधा रूप अधिक स्पष्ट ऊर्जा और सजग प्रतिक्रिया दिखाता है।`, rev:n=>`${n} उल्टा रूप गति, अपेक्षा या संवाद को समायोजित करने को कहता है।`, adv:n=>`${n} के आसपास एक सौम्य और ठोस कदम चुनें।`, warn:n=>`${n} को स्थिर उत्तर न मानें; वास्तविक प्रतिक्रिया देखें।` }
};
function localizeTarotCard(card) {
  const majorIndex = tarotDeck.filter(c => c.arcana === "major").findIndex(c => c.id === card.id);
  const minorIndex = card.arcana === "minor" ? minorRanks.findIndex(rank => card.id.endsWith(rank.id)) : -1;
  card.localized = Object.fromEntries(tarotLanguageCodes.map(code => {
    const suitInfo = localizedSuits[code];
    const name = card.arcana === "major" ? localizedMajorNames[code][majorIndex] : `${suitInfo.ranks[minorIndex]} ${suitInfo[card.suit]}`;
    const template = localizedTemplates[code];
    return [code, { name, keywords: suitInfo.kw, uprightMeaning: template.up(name), reversedMeaning: template.rev(name), advice: template.adv(name), warning: template.warn(name) }];
  }));
  return card;
}
tarotDeck.forEach(localizeTarotCard);
function getLocalizedCard(card, language) {
  const data = card.localized?.[language] || card.localized?.en;
  if (!card.localized?.[language]) console.warn(`Missing tarot localization: ${card.id}.${language}`);
  return data;
}
