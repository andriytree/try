/*
 * Expression banks describe relationships between card-specific meanings.
 * They never stand in for a missing card meaning. This keeps the 78-card
 * semantic corpus in tarot-data.js as the source of truth.
 */

const englishInterpretationBank = {
  questionTypes: {
    love: ["emotional reciprocity and chosen commitment", "the difference between attraction and sustainable intimacy", "how needs, values, and boundaries meet", "what is being offered and what is actually returned"],
    career: ["role clarity, responsibility, and visible progress", "the relationship between ambition and available capacity", "how skill, timing, and workplace dynamics interact", "which part of the work can be influenced directly"],
    study: ["attention, method, feedback, and learning rhythm", "the gap between effort and an effective study system", "how confidence changes practice", "which skill needs repetition rather than pressure"],
    money: ["resource flow, security, and tolerance for risk", "the difference between short-term relief and durable value", "how fear or confidence shapes financial choices", "which assumption needs evidence before money moves"],
    relationship: ["communication, trust, role expectations, and boundaries", "what each person contributes to the interaction", "where projection may be replacing direct information", "which pattern keeps repeating between people"],
    self: ["an inner capacity that is asking to mature", "the story you tell about your own options", "how self-protection and growth are negotiating", "which response would align with your actual values"],
    other: ["the controllable part of the situation", "the difference between fact, feeling, and prediction", "which response creates useful feedback", "what can be clarified before a larger decision"]
  },
  intents: {
    decision: ["The question is asking for a choice, so compare the cost of action with the cost of delay.", "Because a decision is involved, define what evidence would make one option more responsible.", "Treat the card as a decision lens: identify values, constraints, and the next reversible step.", "A useful answer here separates what must be chosen now from what can remain open."],
    communication: ["The question centers communication, so look for what needs to be named, heard, or bounded.", "Here the card speaks through tone and timing as much as through content.", "Translate the symbolism into one clear message and one question you can genuinely listen to.", "The relationship changes only when assumptions are replaced by a specific exchange."],
    reconciliation: ["Because repair is being considered, distinguish renewed contact from repaired trust.", "Reconciliation requires evidence of changed behavior, not only the return of feeling.", "Ask what accountability and boundary would make reconnection safer.", "The card can clarify readiness for repair, but it cannot supply another person’s commitment."],
    timing: ["The question asks about timing, so read the card as pace and readiness rather than a calendar promise.", "Timing depends on conditions: identify what must mature before the next move.", "Use the card to recognize acceleration, pause, or completion without turning it into a fixed date.", "The useful signal is whether resources, consent, and information are aligned."],
    boundary: ["A boundary question asks what you will protect, communicate, and do if the limit is crossed.", "The card highlights the difference between control and a boundary you can actually maintain.", "Name the need behind the limit, then choose a proportionate consequence.", "A workable boundary is specific, observable, and within your control."],
    planning: ["The question asks for a plan, so translate the card into sequence, resources, and review points.", "Planning improves when the next step is small enough to test.", "Use the symbolism to decide what comes first, what can wait, and what evidence triggers revision.", "A plan is strongest when it includes capacity and contingency, not only desire."],
    growth: ["The question concerns growth, so focus on the capacity being practiced rather than a perfect outcome.", "Look for the smallest behavior that would make the card’s lesson visible.", "Growth here includes both using a strength and meeting its shadow honestly.", "The card marks a developmental edge, not a verdict on your character."],
    release: ["The question carries an ending, so distinguish grief, completion, and avoidance.", "Release becomes possible when the cost of carrying the old form is named.", "The card asks what can be honored, what must be closed, and what needs time.", "Letting go is a process with boundaries and rituals, not a demand to feel nothing."],
    uncertainty: ["The question contains uncertainty, so separate known facts, felt signals, and imagined outcomes.", "Use the card to form a better question rather than force certainty.", "The most useful response creates information while limiting unnecessary risk.", "Uncertainty can be held long enough to choose a grounded next step."]
  },
  relationOpeners: [
    "Applied to the wording of your question,",
    "In the specific context you named,",
    "Rather than answering in the abstract,",
    "Read alongside the intention behind the question,",
    "At the point where the card meets your concern,",
    "For the part of this situation you can influence,",
    "When this symbol is brought into your real circumstances,",
    "As a reflection of the issue you described,"
  ],
  elementRelations: {
    same_fire: ["Repeated Fire concentrates drive and visibility; the spread needs pacing so enthusiasm does not consume capacity.", "Fire reinforcing Fire favors initiation, but weakens when every card competes to lead.", "The spread carries sustained heat: direction matters more than adding intensity."],
    same_water: ["Repeated Water makes feeling and attachment central; boundaries help emotion remain informative.", "Water reinforcing Water deepens empathy, memory, and intuition, while increasing the risk of projection.", "The spread asks for emotional honesty without drowning out practical evidence."],
    same_air: ["Repeated Air makes language, analysis, and conflict decisive; the mind needs facts and rest in equal measure.", "Air reinforcing Air can produce clarity or rumination depending on whether thought reaches action.", "The spread is cognitively charged, so one clean decision may help more than further analysis."],
    same_earth: ["Repeated Earth emphasizes resources, work, body, and sustainability; change will be measured in practice.", "Earth reinforcing Earth rewards consistency, while warning against rigidity or fear-based holding.", "The spread prefers durable progress over a dramatic but unsupported leap."],
    fire_water: ["Fire and Water pull between action and feeling; integration means neither rushing emotion nor using emotion to stop all movement.", "This pair asks passion to listen and sensitivity to make a clear request.", "Desire and emotional safety need a negotiated pace."],
    fire_air: ["Fire and Air can turn an idea into fast movement; clear direction prevents argument and excitement from feeding each other.", "Thought is supplying oxygen to action, so language must be precise.", "The pair is inventive and quick, but needs a deliberate stopping point."],
    fire_earth: ["Fire wants movement while Earth asks for proof and capacity; a small test can serve both.", "Vision needs a schedule, resource limit, and observable milestone.", "The tension is productive when urgency is translated into a repeatable practice."],
    water_air: ["Water and Air ask feeling and interpretation to be separated before communication.", "Emotion needs language, but analysis should not invalidate the emotional signal.", "This pair benefits from naming what is felt, what is assumed, and what is known."],
    water_earth: ["Water and Earth can make care tangible through time, money, routine, or dependable presence.", "Feeling becomes trustworthy when it is supported by consistent behavior.", "The pair asks whether practical support matches the emotional promise."],
    air_earth: ["Air and Earth connect plan with execution; assumptions should be tested against available resources.", "A clear idea needs a realistic sequence and feedback from the material world.", "The pair favors documentation, budgeting, scheduling, and measurable review."],
    major_mix: ["Major Arcana raises the question to a value or life-stage level, while Minor Arcana shows where that lesson is practiced daily.", "The spread links a larger developmental theme with concrete behavior.", "A major turning point still depends on ordinary choices, timing, and follow-through."],
    none: ["The spread contains several kinds of energy, so integration matters more than a single dominant element.", "No one element controls the story; compare what each card asks you to feel, think, do, and sustain.", "The mixed pattern favors a sequenced response rather than one universal solution."]
  },
  orientationFlows: {
    open_open: ["The movement from present to future is comparatively available; consistent action can carry the theme forward.", "Both positions express their energy outwardly, so the key question is how to use momentum responsibly.", "The trend is open, but still requires feedback and proportion."],
    open_blocked: ["The spread moves from visible momentum into a correction point; address friction before it becomes a reversal of course.", "What works now may meet a limit later, so build a review point into the plan.", "The future card asks for adjustment rather than automatic continuation."],
    blocked_open: ["The spread moves from constraint toward a more available expression; the transition depends on naming what changes.", "Current friction can become useful information if it leads to a different method.", "The trend improves when the lesson of the reversed card is acted on, not merely understood."],
    blocked_blocked: ["Both positions emphasize revision, internal work, or delayed expression; pushing harder may repeat the same blockage.", "The trend asks for fewer assumptions, a smaller scope, and a clearer boundary.", "Progress is possible, but it begins with correction rather than acceleration."]
  },
  numberPatterns: {
    ascending: ["The card numbers rise across the spread, suggesting movement from an earlier stage toward greater complexity or completion.", "The numerical sequence develops forward; each position adds a new demand rather than repeating the same task.", "An ascending pattern favors staged progress and explicit milestones."],
    descending: ["The card numbers descend, suggesting simplification, return to fundamentals, or release of excess complexity.", "The sequence moves backward toward a more basic need that may have been skipped.", "A descending pattern asks what can be reduced before progress resumes."],
    repeated: ["A repeated number links different suits around the same developmental stage; compare how that lesson appears in each domain.", "The shared number makes one stage of growth recur through different elements.", "Repetition suggests the issue is not isolated to one area of life."],
    court: ["Court cards emphasize roles, maturity, communication style, and the way people carry an element.", "The spread is person-centered: behavior and relational stance matter as much as events.", "Court energy asks who is learning, pursuing, containing, or directing the situation."],
    initiation: ["Aces or low numbers emphasize initiation; protect the seed before demanding a finished result.", "The numerical pattern is early-stage and benefits from experimentation.", "Beginnings need clear conditions, not premature certainty."],
    completion: ["Nines and Tens emphasize culmination, load, and the quality of closure.", "The sequence is near completion, so integration and release matter alongside achievement.", "A late-stage pattern asks what must be finished before energy is reinvested."],
    none: ["The numbers do not form a simple sequence, so the story depends more on position and relationship than on progression.", "Each card represents a different developmental stage; sequence the tasks instead of forcing one timeline.", "The numerical pattern is mixed and calls for prioritization."]
  },
  summaryBridges: {
    current: ["The present card carries the live issue, while the past card explains why it has this shape.", "The current state becomes clearer when the inherited pattern is separated from today’s choice.", "What is active now includes both a usable resource and a friction point.", "The spread locates the immediate work in the present, not in an imagined final outcome."],
    trend: ["The future card describes a tendency that can still be shaped by response and context.", "The movement between present and future matters more than either card in isolation.", "The next phase amplifies what is practiced now and exposes what remains unaddressed.", "Read the trend as conditional direction, not a promise."],
    action: ["A useful action must connect the present resource with the future card’s demand.", "The next step should be small enough to observe and meaningful enough to change the pattern.", "Choose an action that produces information as well as movement.", "The spread favors a sequenced response over a dramatic all-or-nothing move."],
    warning: ["The main pitfall is the point where a card’s strength becomes excessive, blocked, or performative.", "Watch for the pattern that turns uncertainty into urgency or reflection into delay.", "The warning is specific to how these cards interact; it is not a general instruction to avoid all risk.", "A repeated friction point deserves a boundary or review trigger before it becomes costly."],
    reflection: ["The most useful reflection returns the spread to a choice you can actually make.", "A strong question holds both the resource and the shadow of the cards.", "Reflection is most useful when it changes what you observe next.", "The final question should open inquiry without outsourcing responsibility to the cards."]
  },
  fallbacks: {
    position: "This position asks what part of the card’s lesson is active in the situation now.",
    relation: "Connect the card to one fact, one feeling, and one response that remains within your control.",
    current: "The spread highlights a present tension and a resource that can be used deliberately.",
    trend: "The next phase remains open and will be shaped by timing, choices, and real-world feedback.",
    action: "Choose one small, observable action and decide in advance when to review its result.",
    warning: "Avoid treating uncertainty as certainty; check evidence, capacity, and boundaries.",
    reflection: "What is one response within my control that would create clearer information?"
  }
};

const simplifiedChineseInterpretati�Nm�G����ƭy�时机与职场互动如何作用", "工作中哪一部分可以被直接推动"],
    study: ["注意力、方法、反馈与学习节奏", "努力程度与有效系统之间的差距", "信心如何改变练习质量", "哪项能力需要重复而不是施压"],
    money: ["资源流动、安全感与风险承受", "短期缓解与长期价值的差别", "恐惧或信心如何塑造财务选择", "资金行动前哪项假设需要证据"],
    relationship: ["沟通、信任、角色期待与边界", "互动双方分别贡献了什么", "哪些投射正在取代直接信息", "人际之间哪项模式正在重演"],
    self: ["一项正在要求成熟的内在能力", "你如何叙述自己的选择空间", "自我保护与成长如何协商", "哪种回应更符合真实价值"],
    other: ["局面中真正可控的部分", "事实、感受与预测之间的差别", "哪种回应能创造有用反馈", "更大决定前可以先澄清什么"]
  },
  intents: {
    decision: ["这个问题要求作出选择，因此要比较行动成本与拖延成本。", "既然涉及决定，就先定义哪种证据会让其中一个选项更负责任。", "把牌当成决策透镜：看清价值、限制与下一步可逆行动。", "有用的答案会区分现在必须选择的部分与仍可开放的部分。"],
    communication: ["问题核心在沟通，因此要找出什么需要被说出、听见或设定边界。", "这里不只看说什么，也要看语气和时机。", "把牌面转化成一句清楚表达，以及一个你愿意认真倾听的问题。", "只有当假设被具体交流取代时，互动才会改变。"],
    reconciliation: ["既然考虑修复，就要分清重新联系与信任修复。", "和解需要行为改变的证据，而不只是感情回流。", "问问哪种承担与边界会让重新连接更安全。", "牌能帮助澄清修复准备度，却不能代替另一个人的承诺。"],
    timing: ["问题询问时机，因此要把牌读成节奏与准备度，而不是日历承诺。", "时机取决于条件；先找出下一步之前必须成熟的部分。", "用牌辨认加速、暂停或完成，但不要把它变成固定日期。", "真正有用的信号是资源、同意与信息是否对齐。"],
    boundary: ["边界问题需要明确你要保护什么、如何表达，以及越界后你会怎样行动。", "这张牌帮助分清控制他人与维持自己能执行的边界。", "先说清限制背后的需要，再选择合宜后果。", "可执行的边界必须具体、可观察，并在你的控制范围内。"],
    planning: ["问题要求规划，因此要把牌转化成顺序、资源与复盘节点。", "当下一步小到可以测试时，规划会更可靠。", "用象征决定什么先做、什么能等，以及什么证据触发调整。", "强计划会包含容量与备选，而不只有愿望。"],
    growth: ["问题关乎成长，因此重点是正在练习的能力，而非完美结果。", "寻找一个能让这张牌课题变得可见的最小行为。", "成长既包括使用优势，也包括诚实面对阴影。", "这张牌标出发展边缘，并不是对人格的判决。"],
    release: ["问题带着结束意味，因此要分清悲伤、完成与逃避。", "当你说清继续背负旧形式的代价时，放下才会开始。", "这张牌询问什么值得纪念、什么必须收尾、什么仍需要时间。", "放下是带有边界与过程的行动，不是要求自己毫无感受。"],
    uncertainty: ["问题含有不确定，因此要分开已知事实、感受到的信号与想象结果。", "用牌形成更好的问题，而不是强迫确定答案。", "最有用的回应会在控制风险的同时创造新信息。", "你可以承接一段不确定，并仍然选择务实下一步。"]
  },
  relationOpeners: ["结合你问题中的具体措辞，", "放回你刚才描述的处境，", "不做抽象泛论，而是看这次问题，", "与提问背后的真实意图一起阅读，", "当这张牌进入你的现实关切，", "就你真正能影响的部分而言，", "把这项象征带回实际环境时，", "作为对你所述问题的映照，"],
  elementRelations: {
    same_fire: ["火元素反复出现，行动欲与可见度被集中；需要管理节奏，避免热情耗尽容量。", "火与火彼此加强，适合启动，但不适合让每张牌都抢着主导。", "牌阵热度持续偏高，明确方向比继续加码更重要。"],
    same_water: ["水元素反复出现，感受与依附成为核心；清楚边界能让情绪继续提供信息。", "水与水加深同理、记忆与直觉，也提高投射风险。", "牌阵要求情感诚实，同时不让情绪淹没现实证据。"],
    same_air: ["风元素反复出现，语言、分析与冲突成为关键；头脑同时需要事实与休息。", "风与风可能带来清晰，也可能制造反刍，差别在于思考能否进入行动。", "认知能量偏高，一个清楚决定可能比继续分析更有帮助。"],
    same_earth: ["土元素反复出现，资源、工作、身体与可持续性成为重点；变化要在实践中衡量。", "土与土奖励稳定，也提醒你别因恐惧而僵化或抓取。", "牌阵更支持持久进展，而不是缺少基础的戏剧性跳跃。"],
    fire_water: ["火与水拉扯行动和感受；整合既不是催促情绪，也不是用情绪停止一切行动。", "这组元素请热情学习倾听，也请敏感说出清楚请求。", "欲望与情感安全需要协商出共同节奏。"],
    fire_air: ["火与风能让想法快速进入行动；明确方向可避免争论与兴奋互相加温。", "思考正在为行动供氧，因此表达必须准确。", "这组元素创意快、速度高，也需要事先设定停止点。"],
    fire_earth: ["火想前进，土要求证据与容量；一个小规模测试可以同时照顾两者。", "愿景需要日程、资源上限与可观察里程碑。", "当紧迫感被转成可重复实践时，这项张力就会产生建设性。"],
    water_air: ["水与风要求先分开感受与解释，再进入沟通。", "情绪需要语言，但分析不该否定情绪信号。", "这组元素适合分别说清感受到什么、假设了什么、确定了什么。"],
    water_earth: ["水与土能把照顾落实为时间、金钱、例行或可靠陪伴。", "当感受得到持续行为支持时，信任才会增加。", "这组元素询问现实支持是否匹配情感承诺。"],
    air_earth: ["风与土连接计划和执行；假设需要接受现实资源检验。", "清楚想法还需要现实顺序与物质反馈。", "这组元素支持记录、预算、排程与可衡量复盘。"],
    major_mix: ["大阿卡纳把问题提升到价值或人生阶段，小阿卡纳则显示这项课题如何在日常练习。", "牌阵把较大的发展主题与具体行为连接起来。", "重要转折仍依赖普通选择、时机和后续执行。"],
    none: ["牌阵包含多种能量，因此整合比寻找单一主导元素更重要。", "没有一种元素完全控制故事；请比较每张牌分别要求你感受、思考、行动与维持什么。", "混合结构适合分步骤回应，而不是寻找万能解法。"]
  },
  orientationFlows: {
    open_open: ["现在到未来的能量相对可用，稳定行动能把主题继续向前带。", "两个位置都向外表达，重点是如何负责任地使用动能。", "趋势较开放，但仍需要反馈与分寸。"],
    open_blocked: ["牌阵从可见动能进入修正点；要在摩擦升级前处理它。", "现在有效的方法未来可能遇到上限，因此计划中需要复盘节点。", "未来牌要求调整，而不是自动延续当前做法。"],
    blocked_open: ["牌阵从限制走向较开放表达；关键在于说清究竟改变了什么。", "若当前摩擦促使你换方法，它就能成为有用信息。", "只有当逆位的课题被落实，而不只是被理解，趋势才会改善。"],
    blocked_blocked: ["两个位置都强调修正、内在整理或延迟表达；继续用力可能重复同一阻塞。", "趋势需要更少假设、更小范围与更清楚边界。", "进展仍然可能发生，但起点是修正而不是加速。"]
  },
  numberPatterns: {
    ascending: ["牌面数字逐步上升，显示局面从早期阶段走向更高复杂度或完成度。", "数字序列向前发展，每个位置增加新要求，而不是重复同一任务。", "上升结构适合分阶段推进并设置明确里程碑。"],
    descending: ["牌面数字下降，显示局面需要简化、回到基础或释放多余复杂。", "序列往更基本的需要移动，可能有一项基础曾被跳过。", "下降结构请你先减少负担，再恢复推进。"],
    repeated: ["重复数字把不同牌组连接到同一发展阶段；可以比较这项课题在各领域的不同表现。", "相同数字让一项成长任务通过不同元素重现。", "重复提示问题并非只存在于一个生活领域。"],
    court: ["宫廷牌强调角色、成熟度、沟通风格与一个人如何承载元素。", "牌阵以人物行为为中心，关系姿态与事件本身同样重要。", "宫廷能量请你辨认谁在学习、追逐、承接或主导。"],
    initiation: ["Ace 或低数字强调启动；在要求成品前先保护种子。", "数字结构处于早期阶段，适合试验和收集反馈。", "开端需要清楚条件，而不是过早确定。"],
    completion: ["九与十强调累积、负荷与收尾质量。", "序列接近完成，整合与释放和成就同样重要。", "后期结构请你先完成必要事项，再重新投入能量。"],
    none: ["数字没有形成简单序列，因此故事更依赖位置与牌之间的关系。", "每张牌处在不同发展阶段；请安排任务顺序，不要强迫它们进入同一时间线。", "混合数字结构需要先分优先级。"]
  },
  summaryBridges: {
    current: ["现在牌承载眼前课题，过去牌解释它为何呈现成这个样子。", "当过去形成的模式与今天仍可选择的部分被分开，当前状态就会更清楚。", "眼前局面同时包含一项可用资源和一个摩擦点。", "牌阵把即时工作放在现在，而不是想象中的最终结果。"],
    trend: ["未来牌描述的是仍可被回应与环境塑造的倾向。", "现在到未来的移动，比单独看任何一张牌更重要。", "下一阶段会放大现在持续练习的部分，也会暴露仍未处理的部分。", "请把趋势理解成有条件的方向，而不是承诺。"],
    action: ["有用行动需要连接现在的资源与未来牌提出的要求。", "下一步要小到能观察，也要足以改变模式。", "选择既能推动局面、也能创造新信息的行动。", "牌阵支持分步骤回应，不支持戏剧性的全有全无。"],
    warning: ["主要误区出现在牌的优势变得过度、受阻或表演化的位置。", "留意哪些模式把不确定变成急迫，或把反思变成拖延。", "这个提醒来自三张牌的互动，并不是要求你回避所有风险。", "反复出现的摩擦点需要边界或复盘触发条件，避免成本扩大。"],
    reflection: ["最有用的反思会把牌阵带回一个你真正能做的选择。", "好的问题会同时容纳牌的资源与阴影。", "当反思改变你接下来观察什么时，它才真正有用。", "最后的问题应打开探索，而不是把责任交给牌。"]
  },
  fallbacks: {
    position: "这个位置请你观察这张牌的哪项课题正在当下发挥作用。",
    relation: "把牌面连接到一项事实、一种感受，以及一个仍在你控制内的回应。",
    current: "牌阵指出当前的一项张力，以及一项可以主动使用的资源。",
    trend: "下一阶段仍保持开放，并会受到时机、选择与现实反馈影响。",
    action: "选择一个小而可观察的行动，并预先决定何时复盘结果。",
    warning: "不要把不确定当成确定；请检查证据、容量与边界。",
    reflection: "我能采取哪一个在控制范围内的回应，以获得更清楚的信息？"
  }
};

function convertInterpretationBankToTraditional(source) {
  return JSON.parse(toTraditionalChinese(JSON.stringify(source)));
}

function buildInternationalInterpretationBank(language) {
  const questionTypeLabels = {
    love: getI18nValue(language, "questionTypes.love"),
    career: getI18nValue(language, "questionTypes.career"),
    study: getI18nValue(language, "questionTypes.study"),
    money: getI18nValue(language, "questionTypes.money"),
    relationship: getI18nValue(language, "questionTypes.relationship"),
    self: getI18nValue(language, "questionTypes.self"),
    other: getI18nValue(language, "questionTypes.other")
  };
  const relation = getI18nValue(language, "result.relationToQuestion");
  const current = getI18nValue(language, "result.currentState");
  const trend = getI18nValue(language, "result.developmentTrend");
  const action = getI18nValue(language, "result.actionAdvice");
  const warning = getI18nValue(language, "result.warning");
  const reflection = getI18nValue(language, "result.reflectionQuestion");
  const generic = (label) => [label, `${label}.`, `${relation}: ${label}.`];
  return {
    questionTypes: Object.fromEntries(Object.entries(questionTypeLabels).map(([key, label]) => [key, generic(label)])),
    intents: Object.fromEntries(["decision","communication","reconciliation","timing","boundary","planning","growth","release","uncertainty"].map((key) => [key, generic(relation)])),
    relationOpeners: generic(relation),
    elementRelations: Object.fromEntries(["same_fire","same_water","same_air","same_earth","fire_water","fire_air","fire_earth","water_air","water_earth","air_earth","major_mix","none"].map((key) => [key, generic(trend)])),
    orientationFlows: Object.fromEntries(["open_open","open_blocked","blocked_open","blocked_blocked"].map((key) => [key, generic(trend)])),
    numberPatterns: Object.fromEntries(["ascending","descending","repeated","court","initiation","completion","none"].map((key) => [key, generic(trend)])),
    summaryBridges: { current:generic(current), trend:generic(trend), action:generic(action), warning:generic(warning), reflection:generic(reflection) },
    fallbacks: { position:relation, relation, current, trend, action, warning, reflection:`${reflection}?` }
  };
}

const traditionalChineseInterpretationBank = convertInterpretationBankToTraditional(simplifiedChineseInterpretationBank);

function getInterpretationBank(language = "en") {
  if (language === "zh-CN") return simplifiedChineseInterpretationBank;
  if (language === "zh-TW") return traditionalChineseInterpretationBank;
  if (language === "en") return englishInterpretationBank;
  return buildInternationalInterpretationBank(language);
}
