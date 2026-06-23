const interpretationBank = {
  questionTypes: {
    love: ["关系中的真实感受", "彼此期待与边界", "亲密关系里的沟通方式"],
    career: ["工作推进节奏", "机会判断与责任分配", "事业目标的落地方式"],
    study: ["学习状态与方法", "考试压力和积累节奏", "专注力与复盘方式"],
    money: ["资源安排与安全感", "收入支出和现实计划", "物质层面的稳定性"],
    relationship: ["人际沟通与合作", "误解、边界和信任", "互动中的真实需求"],
    self: ["内在成长与自我理解", "情绪模式和个人边界", "当下阶段的核心课题"],
    other: ["当前处境中的可控部分", "选择背后的真实需求", "下一步可以调整的方向"]
  },
  elements: {
    major: ["这更像是一个核心课题，而不是单一事件", "牌面把重点放在人生阶段、选择和内在转折上", "它提醒你先看见这件事背后的深层主题"],
    wands: ["行动、事业、热情和推进力是关键", "更适合关注主动表达、创造力和执行节奏", "事情的推进需要热情，也需要方向感"],
    cups: ["情绪、关系、感受和连接是关键", "更适合关注自己的真实感受与关系互动", "牌面提醒你不要忽略情绪需求和亲密边界"],
    swords: ["思维、沟通、判断和压力是关键", "更适合先澄清事实、语言和边界", "牌面提醒你关注争执、误解或过度分析"],
    pentacles: ["资源、工作、金钱和稳定是关键", "更适合回到现实计划、资源安排和持续执行", "牌面提醒你从可落地的层面处理问题"]
  },
  positions: {
    past: ["过去位置显示这件事的背景和旧模式", "这张牌更像是在解释已经发生的影响", "它提示你回看此前形成的惯性"],
    present: ["现在位置显示当前状态和主要矛盾", "这张牌指出正在显化的能量", "它更贴近你此刻需要面对的核心"],
    future: ["未来位置显示下一阶段的发展倾向", "这张牌给出接下来可以关注的提醒", "它不是确定结果，而是一种可能走向"],
    presentHint: ["这张牌代表当下最值得关注的提醒", "它聚焦当前问题的核心线索", "它更像是一张即时提示牌"]
  },
  orientations: {
    upright: ["正位更偏向顺势推进和发挥优势", "这张牌的能量相对清晰，可以主动运用", "牌面倾向于提醒你把已有资源用起来"],
    reversed: ["逆位更偏向修正、放慢和回看", "这张牌提醒你先调整期待或处理卡点", "牌面倾向于提示误区、阻滞或尚未整合的部分"]
  },
  actionByElement: {
    major: {
      upright: ["先确认这件事背后的核心课题，再选择一个符合长期成长的行动。", "可以把注意力放在更大的方向和价值判断上，不急于只看眼前结果。"],
      reversed: ["建议先暂停对结果的执着，回看自己是否被旧模式牵动。", "可以先修正内在态度，再决定外在行动。"]
    },
    wands: {
      upright: ["可以更主动推进、表达想法或争取机会，但要保留节奏感。", "适合把热情转化成一个具体行动，而不是只停留在想法里。"],
      reversed: ["建议先放慢推进速度，检查方向、精力和动机是否一致。", "避免一时冲动硬推，可以先调整计划再行动。"]
    },
    cups: {
      upright: ["可以更诚实地表达感受，也给关系留下温和沟通的空间。", "适合关注情绪需求和关系里的互相理解。"],
      reversed: ["建议先处理情绪期待，不要急着要求对方或外界立刻回应。", "可以先照顾自己的感受，再决定是否继续投入。"]
    },
    swords: {
      upright: ["可以把事实、边界和需求说清楚，用理性方式推进沟通。", "适合先整理信息，再做判断或表达立场。"],
      reversed: ["建议暂停争辩，先澄清事实和沟通边界。", "避免在压力中反复推演，可以先把真实问题写下来。"]
    },
    pentacles: {
      upright: ["可以回到现实计划、资源安排和稳定执行。", "适合把目标拆成可落地的步骤，并持续观察反馈。"],
      reversed: ["建议先检查资源、时间或安全感是否不足，再决定投入多少。", "避免只看短期得失，可以先修复基础和执行节奏。"]
    }
  },
  riskReminders: [
    "不要把一次牌面当成确定答案，它更适合作为自我观察的参考。",
    "避免因为短暂情绪做出冲动决定，可以给自己一点缓冲时间。",
    "如果事情涉及医疗、法律、财务或安全风险，仍应寻求专业帮助。",
    "从牌面来看，越想立刻得到承诺，越需要先回到可控行动。"
  ],
  reflectionQuestions: {
    love: ["我现在最需要看清的真实关系需求是什么？", "我是否把期待放在了不可控的人或回应上？", "我可以如何更温和但清楚地表达自己？"],
    career: ["这件事里，我可以主动推进的一步是什么？", "我现在最需要补足的是资源、方向还是行动力？", "我是否把压力和真正的目标混在了一起？"],
    study: ["我现在的学习阻力更来自方法、情绪还是节奏？", "我可以从哪一个小步骤重新建立专注？", "我是否需要调整复盘方式，而不是只责备自己？"],
    money: ["我现在对安全感的需求是否影响了判断？", "哪些资源是我已经拥有但还没有善用的？", "我可以如何让计划更稳定、可持续？"],
    relationship: ["这段互动里，我真正想被理解的是什么？", "我是否需要更清楚地表达边界？", "我可以如何减少误解，而不是扩大冲突？"],
    self: ["我现在最需要看见的内在模式是什么？", "我可以如何对自己更诚实也更温柔？", "这件事正在提醒我成长的哪一部分？"],
    other: ["这件事里，我可以主动调整的一步是什么？", "我最需要看清的是事实、感受还是资源？", "我是否正在追求一个不可控的确定答案？"]
  }
};

function createDeepLines(topic, aspects, count) {
  return Array.from({ length: count }, (_, index) => {
    const a = aspects[index % aspects.length];
    const b = aspects[(index + 2) % aspects.length];
    return `这组牌把${topic}放在“${a}”与“${b}”之间观察，提醒你不要只追问表面结果，也要看见自己在这个议题里如何回应、选择和调整节奏。`;
  });
}

function createActionLines(topic, elementFocus, count) {
  return Array.from({ length: count }, (_, index) => {
    const openings = ["建议你先", "接下来可以", "更稳妥的做法是", "此刻适合", "你可以尝试"];
    const actions = ["整理已经确定的事实", "明确自己真正想确认的问题", "观察对方或环境是否有稳定反馈", "把行动放在可控范围内", "给自己设置一个清晰边界"];
    const cautions = ["暂时不要用情绪填补空白", "不要急着把一次反馈当成最终结论", "避免为了获得回应而过度用力", "先区分事实、期待和推测", "把注意力放回自己能执行的部分"];
    return `${openings[index % openings.length]}围绕${topic}处理${elementFocus}：${actions[(index + 1) % actions.length]}，再决定下一步如何表达或推进；同时${cautions[(index + 2) % cautions.length]}。`;
  });
}

function createCombinationLines(topic, count) {
  return Array.from({ length: count }, (_, index) => {
    const angles = ["这不是单一牌义能说明的局面", "牌与牌之间形成了互相牵动的结构", "组合牌面提示你同时处理两个层次", "这组能量显示局面需要转换视角"];
    const suggestions = ["先看见主要矛盾，再决定行动顺序", "不要只抓住最想听见的那张牌", "把背景、现状和下一步分开理解", "留意自己是否在重复同一种反应模式"];
    return `${angles[index % angles.length]}，${topic}。${suggestions[(index + 1) % suggestions.length]}。`;
  });
}

const questionTypeBank = {
  love: createDeepLines("感情关系", ["回应期待", "安全感", "亲密边界", "真实表达", "复合幻想", "关系节奏", "自我价值", "情绪确认"], 20),
  career: createDeepLines("事业工作", ["机会判断", "执行节奏", "职场关系", "责任边界", "项目推进", "长期规划", "资源协调", "主动表达"], 20),
  study: createDeepLines("学习状态", ["专注力", "复盘方法", "考试压力", "积累节奏", "自我要求", "时间安排", "信心恢复", "目标拆解"], 20),
  money: createDeepLines("金钱资源", ["安全感", "收入结构", "消费边界", "资源配置", "现实反馈", "长期积累", "风险意识", "稳定执行"], 20),
  relationship: createDeepLines("人际互动", ["沟通边界", "合作期待", "冲突来源", "信任建立", "误解修复", "角色分工", "情绪投射", "互相尊重"], 20),
  self: createDeepLines("自我探索", ["内在需求", "成长课题", "选择模式", "情绪习惯", "自我接纳", "边界意识", "长期方向", "真实动机"], 20),
  other: createDeepLines("当前问题", ["可控行动", "事实确认", "情绪整理", "资源安排", "选择顺序", "反馈观察", "节奏调整", "内在需求"], 20)
};

const suitBank = {
  major: createDeepLines("人生课题与关键转折", ["核心模式", "阶段提醒", "长期选择", "内在召唤", "旧循环", "价值判断", "成长方向", "深层动机"], 20),
  wands: createDeepLines("权杖能量", ["行动热情", "推进冲动", "创造力", "执行力", "主动表达", "方向感", "竞争意识", "节奏控制"], 20),
  cups: createDeepLines("圣杯能量", ["情绪需求", "关系期待", "依恋模式", "共情边界", "内在感受", "亲密连接", "失落修复", "情感回应"], 20),
  swords: createDeepLines("宝剑能量", ["思维判断", "沟通边界", "压力来源", "冲突处理", "事实澄清", "焦虑推演", "理性表达", "语言锋利度"], 20),
  pentacles: createDeepLines("星币能量", ["现实条件", "资源安排", "稳定积累", "工作执行", "安全感", "时间成本", "物质基础", "长期反馈"], 20)
};

const orientationBank = {
  upright: createDeepLines("正位能量", ["顺势推进", "优势发挥", "清晰显化", "主动性", "机会窗口", "资源可用", "稳定表达", "现实反馈", "行动信心", "成熟回应"], 30),
  reversed: createDeepLines("逆位能量", ["内耗阻滞", "节奏延迟", "误判风险", "逃避倾向", "期待过重", "沟通卡点", "边界混乱", "旧模式回流", "行动失衡", "需要修正"], 30)
};

const positionBank = {
  past: createDeepLines("过去位置", ["旧模式", "前因影响", "已经形成的惯性", "未完成的情绪", "过往选择", "累积压力", "关系背景", "现实基础"], 20),
  present: createDeepLines("现在位置", ["主要矛盾", "正在显化的能量", "当前卡点", "可用资源", "真实需求", "沟通状态", "执行节奏", "心理压力"], 20),
  future: createDeepLines("未来位置", ["下一阶段提醒", "发展倾向", "可能走向", "行动后果", "节奏变化", "反馈窗口", "需要调整的方向", "可打开的空间"], 20)
};

const combinationBank = {
  manyMajor: createCombinationLines("大阿卡纳较多时，问题往往牵涉阶段性课题或深层模式", 8),
  manyReversed: createCombinationLines("逆位较多时，重点通常不是加速推进，而是修正认知、节奏或期待", 8),
  manyWands: createCombinationLines("权杖集中说明行动力很强，但也要避免急躁和过度燃烧", 8),
  manyCups: createCombinationLines("圣杯集中说明情绪和关系是核心，需要看见真实感受", 8),
  manySwords: createCombinationLines("宝剑集中说明思维、沟通、压力和判断正在主导局面", 8),
  manyPentacles: createCombinationLines("星币集中说明现实条件、资源、时间和稳定性是关键", 8),
  pastMajor: createCombinationLines("过去牌是大阿卡纳时，背景可能来自长期模式或较深的人生课题", 8),
  presentReversed: createCombinationLines("现在牌逆位时，当前状态可能有误读、回避、消耗或卡点", 8),
  futureReversed: createCombinationLines("未来牌逆位时，并非没有发展空间，而是需要调整方式以免重复旧问题", 8),
  energyShift: createCombinationLines("现在牌和未来牌元素不同，说明事情需要从一种能量切换到另一种能量", 8),
  cupsSwords: createCombinationLines("圣杯与宝剑同场时，理性与情绪容易互相拉扯", 8),
  wandsPentacles: createCombinationLines("权杖与星币同场时，想推进的动力需要现实计划承接", 8),
  cupsPentacles: createCombinationLines("圣杯与星币同场时，感受、安全感和现实条件会交织在一起", 8),
  swordsWands: createCombinationLines("宝剑与权杖同场时，想法和行动都很强，但容易急于下结论", 8)
};

const actionBank = {
  "love_cups": createActionLines("感情关系", "情绪需求和回应期待", 10),
  "love_swords": createActionLines("感情关系", "事实澄清和沟通边界", 10),
  "love_wands": createActionLines("感情关系", "主动表达和关系推进", 10),
  "love_pentacles": createActionLines("感情关系", "安全感和现实承诺", 10),
  "career_wands": createActionLines("事业工作", "行动推进和机会争取", 10),
  "career_swords": createActionLines("事业工作", "判断、沟通和策略表达", 10),
  "career_pentacles": createActionLines("事业工作", "资源安排和稳定执行", 10),
  "career_cups": createActionLines("事业工作", "团队关系和情绪消耗", 10),
  "money_pentacles": createActionLines("金钱资源", "预算、资源和长期稳定", 10),
  "money_swords": createActionLines("金钱资源", "理性判断和风险边界", 10),
  "relationship_cups": createActionLines("人际关系", "共情、感受和信任", 10),
  "relationship_swords": createActionLines("人际关系", "沟通边界和冲突澄清", 10),
  "self_major": createActionLines("自我探索", "核心课题和长期选择", 10),
  "self_swords": createActionLines("自我探索", "思维模式和自我判断", 10),
  "self_cups": createActionLines("自我探索", "内在感受和自我接纳", 10)
};

const warningBank = Array.from({ length: 50 }, (_, index) => {
  const scenes = ["过度解读", "急于行动", "情绪化决定", "把牌面当成确定答案", "忽略现实证据", "逃避沟通", "过度控制结果", "把他人反应当作自我价值证明", "忽视资源与边界", "只看短期反馈"];
  const repairs = ["回到事实和可控行动", "给自己留出观察时间", "先确认真实需求", "把情绪和证据分开", "检查资源是否足够", "表达边界而不是施压", "允许事情有过程", "不要用单一反馈定义自己", "补足现实基础", "看见长期影响"];
  return `需要避免${scenes[index % scenes.length]}。这组牌更建议你${repairs[(index + 3) % repairs.length]}，否则容易把提醒误读成压力，或把暂时的反馈看成最终结论。`;
});

const reflectionBank = Array.from({ length: 80 }, (_, index) => {
  const starts = ["我真正想得到的是", "这件事中我能主动改变的是", "如果暂时没有明确结果", "我现在最需要分辨的是", "我是否正在把", "我可以如何在", "这组牌最触动我的地方是", "我愿意承认的真实需求是"];
  const middles = ["答案还是安全感", "事实、情绪还是期待", "不可控的人或结果", "自己的节奏照顾好", "沟通前先整理清楚", "资源和边界之间找到平衡", "旧模式和新选择", "行动与等待的比例"];
  return `${starts[index % starts.length]}${middles[(index + 2) % middles.length]}？`;
});

interpretationBank.deep = {
  questionTypeBank,
  suitBank,
  orientationBank,
  positionBank,
  combinationBank,
  actionBank,
  warningBank,
  reflectionBank
};
