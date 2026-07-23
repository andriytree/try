/*
 * Local semantic corpus for the complete 78-card deck.
 *
 * Every row below is an independent card profile. Minor Arcana meanings are
 * intentionally not derived from a rank template plus a suit template. The
 * small builder at the bottom expands each profile into the same rich,
 * localized schema so the reading engines can select card-specific variants.
 */

const tarotLanguageCodes = ["zh-CN", "zh-TW", "en", "ja", "ko", "es", "fr", "de", "pt", "ru", "ar", "hi"];

const tarotSuitElements = {
  major: "major",
  wands: "fire",
  cups: "water",
  swords: "air",
  pentacles: "earth"
};

// Major Arcana also carry elemental correspondences; treating every trump as
// the pseudo-element "major" erased a useful layer of spread analysis.
const tarotMajorElements = {
  "major-00-fool": "air",
  "major-01-magician": "air",
  "major-02-high-priestess": "water",
  "major-03-empress": "earth",
  "major-04-emperor": "fire",
  "major-05-hierophant": "earth",
  "major-06-lovers": "air",
  "major-07-chariot": "water",
  "major-08-strength": "fire",
  "major-09-hermit": "earth",
  "major-10-wheel": "fire",
  "major-11-justice": "air",
  "major-12-hanged-man": "water",
  "major-13-death": "water",
  "major-14-temperance": "fire",
  "major-15-devil": "earth",
  "major-16-tower": "fire",
  "major-17-star": "air",
  "major-18-moon": "water",
  "major-19-sun": "fire",
  "major-20-judgement": "fire",
  "major-21-world": "earth"
};

function splitSemanticList(value) {
  return String(value || "").split("|").map((item) => item.trim()).filter(Boolean);
}

function defineSemanticCard(id, suit, rank, number, archetype, symbols, enCore, enUp, enRev, zhCore, zhUp, zhRev) {
  const arcana = suit === "major" ? "major" : "minor";
  const uprightConcepts = splitSemanticList(enUp);
  const reversedConcepts = splitSemanticList(enRev);
  return {
    id,
    arcana,
    suit,
    rank,
    element: suit === "major" ? tarotMajorElements[id] : tarotSuitElements[suit],
    number,
    archetype,
    symbols: splitSemanticList(symbols),
    themes: uprightConcepts.slice(0, 6),
    semantic: {
      en: { core: enCore, upright: uprightConcepts, reversed: reversedConcepts },
      "zh-CN": { core: zhCore, upright: splitSemanticList(zhUp), reversed: splitSemanticList(zhRev) }
    }
  };
}

const tarotSemanticProfiles = [
  defineSemanticCard("major-00-fool", "major", "00", 0, "the free spirit at a threshold", "cliff|white rose|small dog|travel bundle", "entering an unknown chapter with curiosity while staying awake to consequence", "beginning|freedom|curiosity|adventure|trust|spontaneity|openness|potential", "recklessness|escape|poor preparation|naivety|impulsive risk|lost focus|irresponsibility|fear of beginning", "å¸¦ç€å¥½å¥‡è¿›å…¥æœªçŸ¥é˜¶æ®µï¼ŒåŒæ—¶å¯¹é€‰æ‹©çš„åŽæžœä¿æŒæ¸…é†’", "å¼€å§‹|è‡ªç”±|å¥½å¥‡|å†’é™©|ä¿¡ä»»|è‡ªå‘|å¼€æ”¾|æ½œèƒ½", "é²èŽ½|é€ƒé¿|å‡†å¤‡ä¸è¶³|å¤©çœŸ|å†’è¿›|å¤±ç„¦|ä¸è´Ÿè´£ä»»|å®³æ€•å¼€å§‹"),
  defineSemanticCard("major-01-magician", "major", "01", 1, "the focused creator", "wand|four suit tools|infinity sign|garden", "turning available skill, attention, and language into a deliberate result", "willpower|resources|creation|expression|focus|skill|manifestation|initiative", "manipulation|distraction|empty promises|unused ability|self-doubt|deception|loose planning|blocked action", "æŠŠå·²æœ‰èƒ½åŠ›ã€æ³¨æ„åŠ›ä¸Žè¡¨è¾¾é›†ä¸­èµ·æ¥ï¼Œè½¬åŒ–ä¸ºæ˜Žç¡®æˆæžœ", "æ„å¿—|èµ„æº|åˆ›é€ |è¡¨è¾¾|ä¸“æ³¨|æŠ€å·§|æ˜¾åŒ–|ä¸»åŠ¨", "æ“æŽ§|åˆ†å¿ƒ|ç©ºè°ˆ|èƒ½åŠ›é—²ç½®|è‡ªæˆ‘æ€€ç–‘|æ¬ºçž’|è®¡åˆ’æ¾æ•£|è¡ŒåŠ¨å—é˜»"),
  defineSemanticCard("major-02-high-priestess", "major", "02", 2, "the keeper of inner knowledge", "black and white pillars|veil|moon|scroll", "listening beneath appearances until intuition and evidence can be distinguished", "intuition|stillness|mystery|subconscious|inner wisdom|patience|receptivity|discernment", "blocked intuition|hidden information|overthinking|emotional noise|passivity|isolation|ignored feelings|mixed signals", "ç©¿è¿‡è¡¨è±¡å€¾å¬å†…åœ¨ï¼Œå¹¶åˆ†è¾¨ç›´è§‰ã€æƒ…ç»ªä¸Žäº‹å®ž", "ç›´è§‰|é™è§‚|ç§˜å¯†|æ½œæ„è¯†|å†…åœ¨æ™ºæ…§|è€å¿ƒ|æ„Ÿå—åŠ›|è¾¨åˆ«", "ç›´è§‰å—é˜»|ä¿¡æ¯éšè—|è¿‡åº¦çŒœæµ‹|æƒ…ç»ªå™ªéŸ³|è¢«åŠ¨|è‡ªæˆ‘éš”ç¦»|å¿½è§†æ„Ÿå—|è¡¨é‡Œä¸ä¸€"),
  defineSemanticCard("major-03-empress", "major", "03", 3, "the embodied nurturer", "wheat|forest|crown of stars|Venus shield", "allowing care, creativity, and material support to make something genuinely grow", "abundance|nurture|creation|sensuality|receptivity|embodiment|care|resource growth", "overgiving|smothering|creative block|self-neglect|dependence|stagnant comfort|poor boundaries|scarcity fear", "è®©ç…§é¡¾ã€åˆ›é€ ä¸ŽçŽ°å®žèµ„æºå…±åŒå­•è‚²çœŸæ­£çš„æˆé•¿", "ä¸°ç››|æ»‹å…»|åˆ›é€ |æ„Ÿå—åŠ›|èº«ä½“ç»éªŒ|æŽ¥çº³|ç…§é¡¾|èµ„æºå­•è‚²", "è¿‡åº¦ä»˜å‡º|çª’æ¯å¼ç…§é¡¾|åˆ›é€ å—é˜»|å¿½ç•¥è‡ªå·±|ä¾èµ–|å®‰é€¸åœæ»ž|è¾¹ç•Œä¸æ¸…|åŒ®ä¹ç„¦è™‘"),
  defineSemanticCard("major-04-emperor", "major", "04", 4, "the responsible builder", "stone throne|ram heads|armor|mountains", "creating dependable order through boundaries, planning, and accountable authority", "structure|authority|responsibility|boundaries|planning|stability|discipline|protection", "rigidity|control|domination|weak structure|avoidance of duty|inflexibility|power struggle|emotional distance", "ä»¥è¾¹ç•Œã€è§„åˆ’ä¸Žè´£ä»»å»ºç«‹å¯ä¾é çš„ç§©åº", "ç»“æž„|æƒå¨|è´£ä»»|è¾¹ç•Œ|è§„åˆ’|ç¨³å®š|çºªå¾‹|ä¿æŠ¤", "åƒµåŒ–|æŽ§åˆ¶æ¬²|æ”¯é…|ç»“æž„è–„å¼±|é€ƒé¿è´£ä»»|ä¸çŸ¥å˜é€š|æƒåŠ›å†²çª|æƒ…æ„Ÿç–ç¦»"),
  defineSemanticCard("major-05-hierophant", "major", "05", 5, "the transmitter of shared values", "keys|temple pillars|raised hand|students", "examining which traditions, teachings, and institutions deserve trust and continuation", "tradition|rules|belief|teaching|institution|values|learning|inheritance", "dogma|blind obedience|rebellion without thought|stale values|misused authority|conformity|private belief|broken trust", "è¾¨è®¤å“ªäº›ä¼ ç»Ÿã€æ•™å¯¼ä¸Žåˆ¶åº¦å€¼å¾—ä¿¡ä»»å’Œä¼ æ‰¿", "ä¼ ç»Ÿ|è§„åˆ™|ä¿¡å¿µ|æ•™å¯¼|æƒå¨ä½“ç³»|åˆ¶åº¦|ä»·å€¼è§‚|å­¦ä¹ ä¼ æ‰¿", "æ•™æ¡|ç›²ä»Ž|æ— æ€è€ƒçš„åå›|é™ˆæ—§ä»·å€¼|æ»¥ç”¨æƒå¨|ä»Žä¼—|ä¿¡å¿µç§æœ‰åŒ–|ä¿¡ä»»ç ´è£‚"),
  defineSemanticCard("major-06-lovers", "major", "06", 6, "the conscious chooser", "two figures|angel|tree of knowledge|mountain", "making a relational choice that aligns desire, honesty, and personal values", "union|choice|values|attraction|honesty|alignment|intimacy|commitment", "misalignment|avoidance of choice|dishonesty|dependency|conflicting values|temptation|projection|unequal commitment", "è®©å…³ç³»é€‰æ‹©åŒæ—¶å¯¹é½æ¬²æœ›ã€è¯šå®žä¸Žä¸ªäººä»·å€¼", "ç»“åˆ|é€‰æ‹©|ä»·å€¼è§‚|å¸å¼•|è¯šå®ž|ä¸€è‡´|äº²å¯†|æ‰¿è¯º", "ä»·å€¼é”™ä½|é€ƒé¿é€‰æ‹©|ä¸è¯šå®ž|ä¾èµ–|ä»·å€¼å†²çª|è¯±æƒ‘|æŠ•å°„|æ‰¿è¯ºå¤±è¡¡"),
  defineSemanticCard("major-07-chariot", "major", "07", 7, "the disciplined victor", "two sphinxes|armor|star canopy|city walls", "directing opposing forces toward one chosen destination through discipline", "willpower|control|progress|direction|self-discipline|integration|victory drive|action rhythm", "loss of direction|overcontrol|aggression|scattered force|impatience|inner conflict|stalling|reckless speed", "ç”¨çºªå¾‹æ•´åˆç›¸ååŠ›é‡ï¼Œå¹¶æŠŠè¡ŒåŠ¨å¯¼å‘åŒä¸€ä¸ªç›®çš„åœ°", "æ„å¿—|æŽŒæŽ§|æŽ¨è¿›|æ–¹å‘|è‡ªå¾‹|å¯¹ç«‹æ•´åˆ|èƒœåˆ©æ¬²|è¡ŒåŠ¨èŠ‚å¥", "æ–¹å‘ä¸¢å¤±|è¿‡åº¦æŽ§åˆ¶|æ”»å‡»æ€§|åŠ›é‡åˆ†æ•£|æ€¥èº|å†…åœ¨å†²çª|åœæ»ž|å±é™©åŠ é€Ÿ"),
  defineSemanticCard("major-08-strength", "major", "08", 8, "the compassionate tamer", "lion|infinity sign|white robe|flowers", "meeting instinct and pressure with patient courage instead of force", "courage|gentleness|patience|self-command|compassion|confidence|instinct|endurance", "self-doubt|suppressed anger|bravado|loss of nerve|shame|emotional force|impatience|depleted courage", "ç”¨è€å¿ƒä¸Žæ¸©æŸ”çš„å‹‡æ°”é¢å¯¹æœ¬èƒ½å’ŒåŽ‹åŠ›ï¼Œè€Œéžå¼ºè¡ŒåŽ‹åˆ¶", "å‹‡æ°”|æ¸©æŸ”|è€å¿ƒ|è‡ªæˆ‘æŽŒæ¡|æ…ˆæ‚²|ä¿¡å¿ƒ|æœ¬èƒ½|éŸ§æ€§", "è‡ªæˆ‘æ€€ç–‘|åŽ‹æŠ‘æ„¤æ€’|é€žå¼º|å¤±åŽ»å‹‡æ°”|ç¾žè€»|æƒ…ç»ªå¼ºè¿«|ä¸è€çƒ¦|å‹‡æ°”è€—å°½"),
  defineSemanticCard("major-09-hermit", "major", "09", 9, "the solitary guide", "lantern|staff|mountain peak|grey cloak", "withdrawing from noise long enough to find an honest inner direction", "solitude|reflection|wisdom|search|discernment|inner guidance|study|maturity", "isolation|avoidance|loneliness|refusal of counsel|overanalysis|withdrawal|lost direction|social disconnection", "æš‚æ—¶ç¦»å¼€å™ªéŸ³ï¼Œä»¥è¯šå®žåæ€æ‰¾åˆ°å†…åœ¨æ–¹å‘", "ç‹¬å¤„|åæ€|æ™ºæ…§|å¯»æ‰¾|è¾¨åˆ«|å†…åœ¨æŒ‡å¼•|ç ”ä¹ |æˆç†Ÿ", "å­¤ç«‹|é€ƒé¿|å­¤ç‹¬æ„Ÿ|æ‹’ç»å»ºè®®|è¿‡åº¦åˆ†æž|é€€ç¼©|æ–¹å‘è¿·å¤±|äººé™…æ–­è¿ž"),
  defineSemanticCard("major-10-wheel", "major", "10", 10, "the turning cycle", "wheel|four fixed signs|sphinx|rising and falling figures", "responding intelligently to a turning cycle without pretending to control every variable", "cycle|change|turning point|opportunity|timing|adaptation|fortune|pattern recognition", "repeated pattern|resistance to change|bad timing|instability|loss of control|delay|fatalism|missed opening", "åœ¨å‘¨æœŸè½¬åŠ¨æ—¶é¡ºåŠ¿è°ƒæ•´ï¼Œè€Œä¸å‡è£…èƒ½æŽ§åˆ¶æ‰€æœ‰å˜é‡", "å‘¨æœŸ|å˜åŒ–|è½¬æŠ˜|æœºä¼š|æ—¶æœº|é€‚åº”|è¿åŠ¿|æ¨¡å¼è¯†åˆ«", "æ¨¡å¼é‡æ¼”|æŠ—æ‹’å˜åŒ–|æ—¶æœºä¸ä½³|ä¸ç¨³å®š|å¤±åŽ»æŽ§åˆ¶|å»¶è¿Ÿ|å®¿å‘½æ„Ÿ|é”™è¿‡çª—å£"),
  defineSemanticCard("major-11-justice", "major", "11", 11, "the clear-eyed arbiter", "scales|sword|red robe|square crown", "weighing facts, consequences, and responsibility before reaching a fair decision", "fairness|truth|accountability|cause and effect|clarity|balance|ethics|decision", "bias|denial|unfairness|avoided consequence|incomplete evidence|self-justification|dishonesty|harsh judgment", "åœ¨å†³å®šå‰è¡¡é‡äº‹å®žã€åŽæžœä¸Žè´£ä»»ï¼Œè¿½æ±‚çœŸæ­£çš„å…¬å¹³", "å…¬å¹³|çœŸç›¸|è´£ä»»|å› æžœ|æ¸…æ™°|å¹³è¡¡|ä¼¦ç†|åˆ¤æ–­", "åè§|å¦è®¤|ä¸å…¬|é€ƒé¿åŽæžœ|è¯æ®ä¸è¶³|è‡ªæˆ‘åˆç†åŒ–|ä¸è¯šå®ž|è‹›åˆ»è¯„åˆ¤"),
  defineSemanticCard("major-12-hanged-man", "major", "12", 12, "the willing suspender", "inverted figure|halo|living tree|crossed leg", "releasing the need to force progress so a different perspective can emerge", "pause|surrender|new perspective|suspension|release|patience|reframing|voluntary sacrifice", "stalling|martyrdom|pointless delay|resistance|victim stance|indecision|sacrifice without purpose|refusal to let go", "æ”¾ä¸‹å¼ºæŽ¨è¿›åº¦çš„éœ€è¦ï¼Œè®©æ–°çš„è§†è§’çœŸæ­£å‡ºçŽ°", "æš‚åœ|è‡£æœ|æ¢ä½è§†è§’|æ‚¬ç½®|é‡Šæ”¾|è€å¿ƒ|é‡æ–°è¯ é‡Š|ä¸»åŠ¨å–èˆ", "åœæ»ž|å—å®³è€…å§¿æ€|æ— è°“æ‹–å»¶|æŠ—æ‹’|è‡ªæˆ‘ç‰ºç‰²æˆç˜¾|çŠ¹è±«|æ— æ„ä¹‰ä»˜å‡º|æ‹’ç»æ”¾ä¸‹"),
  defineSemanticCard("major-13-death", "major", "13", 13, "the uncompromising transformer", "white rose banner|skeleton rider|setting sun|fallen crown", "accepting a real ending so energy can leave an exhausted form and renew", "ending|transformation|release|transition|closure|renewal|shedding|irreversibility", "resistance to ending|stagnation|fear of change|unfinished goodbye|clinging|delayed transition|decay|repeating the past", "æ‰¿è®¤çœŸå®žçš„ç»“æŸï¼Œè®©èƒ½é‡ç¦»å¼€è€—å°½çš„å½¢å¼å¹¶é‡æ–°æµåŠ¨", "ç»“æŸ|è½¬åŒ–|æ”¾ä¸‹|è¿‡æ¸¡|æ”¶å°¾|æ›´æ–°|èœ•çš®|ä¸å¯é€†æ”¹å˜", "æŠ—æ‹’ç»“æŸ|åœæ»ž|å®³æ€•å˜åŒ–|å‘Šåˆ«æœªå®Œ|æŠ“å–ä¸æ”¾|è½¬åž‹å»¶è¿Ÿ|è…åŒ–|é‡å¤è¿‡åŽ»"),
  defineSemanticCard("major-14-temperance", "major", "14", 14, "the patient alchemist", "two cups|one foot on land|one foot in water|path to light", "combining unlike needs at a sustainable pace until a workable third way appears", "balance|integration|moderation|healing|patience|adaptation|flow|right proportion", "excess|imbalance|poor timing|fragmentation|impatience|overcorrection|conflicting priorities|drained reserves", "ä»¥å¯æŒç»­èŠ‚å¥æ•´åˆä¸åŒéœ€è¦ï¼Œè°ƒå’Œå‡ºå¯è¡Œçš„ç¬¬ä¸‰æ¡è·¯", "å¹³è¡¡|æ•´åˆ|èŠ‚åˆ¶|ç–—æ„ˆ|è€å¿ƒ|é€‚åº”|æµåŠ¨|åˆå®œæ¯”ä¾‹", "è¿‡åº¦|å¤±è¡¡|æ—¶æœºä¸å½“|ç¢Žç‰‡åŒ–|æ€¥èº|è¿‡åº¦ä¿®æ­£|ä¼˜å…ˆçº§å†²çª|å‚¨å¤‡è€—å°½"),
  defineSemanticCard("major-15-devil", "major", "15", 15, "the revealer of bondage", "loose chains|horned figure|inverted torch|dark pedestal", "naming the desire, fear, or bargain that keeps choice feeling impossible", "attachment|desire|shadow|temptation|material fixation|dependency|taboo truth|personal agency", "compulsion|denial|addiction|shame|coercion|powerlessness|toxic bargain|fear-based control", "è¯´å‡ºè®©é€‰æ‹©çœ‹ä¼¼ä¸å¯èƒ½çš„æ¬²æœ›ã€ææƒ§æˆ–äº¤æ¢æ¡ä»¶", "ä¾é™„|æ¬²æœ›|é˜´å½±|è¯±æƒ‘|ç‰©è´¨æ‰§ç€|ä¾èµ–|ç¦å¿ŒçœŸç›¸|ä¸ªäººèƒ½åŠ¨æ€§", "å¼ºè¿«|å¦è®¤|æˆç˜¾|ç¾žè€»|èƒè¿«|æ— åŠ›æ„Ÿ|æœ‰æ¯’äº¤æ¢|ææƒ§æŽ§åˆ¶"),
  defineSemanticCard("major-16-tower", "major", "16", 16, "the truth-breaking storm", "lightning|falling crown|burning tower|falling figures", "letting a false or unstable structure break so reality can be rebuilt honestly", "revelation|disruption|collapse|truth|liberation|shock|rebuilding|structural change", "avoided crisis|fear of collapse|delayed truth|internal upheaval|damage control|denial|fragile structure|repeated shock", "è®©è™šå‡æˆ–ä¸ç¨³çš„ç»“æž„ç ´è£‚ï¼Œä»¥è¯šå®žçŽ°å®žé‡æ–°å»ºé€ ", "æ­ç¤º|å†²å‡»|å´©å¡Œ|çœŸç›¸|è§£æ”¾|éœ‡è¡|é‡å»º|ç»“æž„æ”¹å˜", "é€ƒé¿å±æœº|å®³æ€•å´©å¡Œ|çœŸç›¸å»¶è¿Ÿ|å†…åœ¨åŠ¨è¡|åªé¡¾æ­¢æŸ|å¦è®¤|è„†å¼±ç»“æž„|å†²å‡»é‡æ¼”"),
  defineSemanticCard("major-17-star", "major", "17", 17, "the naked source of hope", "eight stars|two water vessels|bird|open landscape", "restoring trust through honest vulnerability, steady healing, and a long view", "hope|healing|renewal|trust|inspiration|openness|guidance|future vision", "discouragement|lost faith|exposure fear|healing delay|comparison|disconnection|pessimism|dimmed purpose", "ä»¥è¯šå®žçš„è„†å¼±ã€ç¨³å®šä¿®å¤ä¸Žé•¿æœŸè§†é‡Žæ¢å¤ä¿¡ä»»", "å¸Œæœ›|ç–—æ„ˆ|æ›´æ–°|ä¿¡ä»»|çµæ„Ÿ|å¼€æ”¾|æŒ‡å¼•|æœªæ¥æ„¿æ™¯", "ç°å¿ƒ|å¤±åŽ»ä¿¡å¿µ|å®³æ€•æš´éœ²|ä¿®å¤å»¶è¿Ÿ|æ¯”è¾ƒ|å¤±åŽ»è¿žæŽ¥|æ‚²è§‚|ä½¿å‘½é»¯æ·¡"),
  defineSemanticCard("major-18-moon", "major", "18", 18, "the guide through uncertainty", "moon path|dog and wolf|crayfish|two towers", "moving through uncertainty by separating intuition, fear, memory, and fact", "uncertainty|subconscious|dream|intuition|ambiguity|emotion|imagination|hidden pattern", "confusion|projection|anxiety|deception|distorted memory|fear loop|misread signal|truth emerging", "åœ¨ä¸ç¡®å®šä¸­åˆ†è¾¨ç›´è§‰ã€ææƒ§ã€è®°å¿†ä¸Žäº‹å®ž", "ä¸ç¡®å®š|æ½œæ„è¯†|æ¢¦å¢ƒ|ç›´è§‰|æ¨¡ç³Š|æƒ…ç»ª|æƒ³è±¡|éšè—æ¨¡å¼", "æ··ä¹±|æŠ•å°„|ç„¦è™‘|æ¬ºçž’|è®°å¿†æ‰­æ›²|ææƒ§å¾ªçŽ¯|è¯¯è¯»ä¿¡å·|çœŸç›¸æµ®çŽ°"),
  defineSemanticCard("major-19-sun", "major", "19", 19, "the radiant child", "sunflowers|white horse|red banner|bright sun", "allowing clarity, vitality, and uncomplicated truth to be fully seen", "clarity|joy|vitality|success|warmth|honesty|confidence|visibility", "forced optimism|ego glare|delayed joy|burnout|overexposure|naivety|hidden sadness|temporary setback", "è®©æ¸…æ™°ã€æ´»åŠ›ä¸Žç®€å•çœŸç›¸è¢«å……åˆ†çœ‹è§", "æ¸…æ™°|å–œæ‚¦|æ´»åŠ›|æˆåŠŸ|æ¸©æš–|å¦è¯š|ä¿¡å¿ƒ|å¯è§åº¦", "å¼ºè£…ä¹è§‚|è‡ªæˆ‘è†¨èƒ€|å–œæ‚¦å»¶è¿Ÿ|è€—ç«­|è¿‡åº¦æ›å…‰|å¤©çœŸ|éšè—æ‚²ÛnøêÚ$z{-®éÜj×%×Þ(	Þ[Ú.h‰8K¸Þ[ÛY8ÞxëYÊŽy¨NjŠ[Èþ8&À¢‹ùžjë^XènXû.y¨NX[>™JîûÈÎXúþˆ;ÞYÊŽK¨îKÚ‹ø~Xë¾Zh.KÙ^ZHNyn(	ÂG·&We³×Þ(	Þ8& ¢ÒÀ¢&W6VçC¢°¢YÊŽxëYÊŽKØÞ{ÚîûÈÂG¶æÖWÞh¨®(	ÂG·W³×Þ(	Þ[ŠnX‹yËÎX˜ÞûÈÎŠhk.KÚjÚNX‹¾KÙÎX{®Y¹î[©N8&À¢‹ùž[Êx˜Îhøþ‹û[Ù>X˜Þ(	ÂG·W³×Þ(	ÞKˆî(	ÂG·&We³×Þ(	ÞK˜¾™{Ny¨N[ÊX©¾8&À¢xëYÊŽXúþyJŽy¨N‹XNk©iŠþ(	ÂG·W³E×Þ(	ÞûÈÎ‹è>Xúþˆ;Þy¨Niži:nx+žX‰žiŠþ(	ÂG·&We³E×Þ(	Þ8&À¢G¶æÖWÞX[>[ø>y¨NiŠþK¸®ZJžˆ;Þ{¸>KšK¸K˜ŽûÈÎˆÎKˆÞiŠþ‹ùÎ‹yÞzk¾š(NkX¾{¹>iéÎ8& ¢ÒÀ¢gWGW&S¢°¢YÊŽiÊ®iÚ^KØÞ{ÚîûÈÂG¶æÖWÞhøþ‹ûY»N{¹^(	ÂG·W³×Þ(	ÞjÚ>YÊŽ[Ú.h‰y¨NXîY	ûÈÎˆÎ™ÙîY»®Zé®{¹>[8&À¢Zh.iéÎXø®izžZHNyn(	ÂG·&We³×Þ(	ÞûÈÎKˆ¾Kˆ™‹një^Xúþˆ;ÞiKîZJ~(	ÂG·W³×Þ(	Þ8&À¢KÙÎK‹®iÊ®iÚ^[ÛY8ÞûÈÎ‹ùž[Êx˜Îi‹îzK®(	ÂG·W³e×Þ(	ÞXúþˆ;Þh™>[Èz›®™{NûÈÎˆÎ(	ÂG·&We³e×Þ(	ÞXúþˆ;ÞiKnz¨Nz›®™{N8&À¢G¶æÖWÞ˜(Šû~KÚ˜	®‹ø~Zûž(	ÂG·W³5×Þ(	ÞKÙÎX{®X[~KÙ>Y¹î[©NiÚ^Z˜
‹h¾X«þ8& ¢ÒÀ¢6–ævÆS¢°¢KÙÎK‹®xJnx+žx˜ÎûÈÂG¶æÖWÞKº^(	ÂG·W³×Þ(	ÞY(Î(	ÂG·6VÖçF–2æ6÷&WÞ(	Þ˜xÞikjnZé®i[NKŠ®™zîš)Ž8&À¢XÙ^x˜ÎŠxnŠy.h¨®(	ÂG·W³×Þ(	ÞiKîYÊŽKŠÞ[ø>ûÈÎK™þŠêž(	ÂG·&We³×Þ(	ÞyYžYÊŽŠxžZùþ‹ëž{ÉŽ8&À¢G¶æÖWÞhùKé¾(	ÂG·W³E×Þ(	ÞKÙÎK‹®‹XNk©ûÈÎYÎi{nŠû~KÚyYžhHþ(	ÂG·&We³E×Þ(	Þ8&À¢‹ùž[Êx˜ÎiÈ˜.YŽKÙÎK‹®ŠÎXªŽKˆîXøÞh	ÞhùzK®ûÈÎˆÎKˆÞiŠþY»®Zé®XŠNXk>8& ¢Ð¢ÒÀ¢FöÖ–äÖVæ–æw3¢°¢Æ÷fS¢¶YÊŽhIþh8^™zîš)ŽKŠÞûÈÂG¶æÖWÞhÈ~X{®(	ÂG·W³×Þ(	ÞZh.KÙ^[ÛY8Þh8^hIþK©.h:Kˆî˜žhºž8&ÂK«.ZønX[>{;¾™ÈŠhXˆn‹êŽ(	ÂG·W³×Þ(	ÞKˆî(	ÂG·&We³×Þ(	ÞK˜¾™{Ny¨NyXÎ{«þ8&ÒÀ¢6&VW#¢¶YÊŽK¨¾K‰®™zîš)ŽKŠÞûÈÂG¶æÖWÞh¨®(	ÂG·W³×Þ(	Þ‹ÚÎXÉnK‹®Šy.ˆ›.8ˆ¨.ZXþKˆî‹J>K»¾ŠÎXªŽy¨NŠûîš)Ž8&Â[z^KÙÎhêŽ‹ù¾XùnXk>K¨îˆ;ÞY
n‹ùyJŽ(	ÂG·W³E×Þ(	ÞûÈÎYÎi{n˜þXXÞ‰ÞXZ^(	ÂG·&We³E×Þ(	Þ8&ÒÀ¢7GVG“¢¶YÊŽZÚnKš™zîš)ŽKŠÞûÈÂG¶æÖWÞh¨®(	ÂG·W³×Þ(	Þ‹ùîhê^X‹k:ŽhHþX©¾8{¸>KšKˆîXøÞšhŽZèžhé.8&Â[Ù>(	ÂG·W³%×Þ(	ÞXùnKº>(	ÂG·&We³%×Þ(	Þy¨NjŠ[Èþi{nûÈÎZÚnKšh˜ÞKÉ®yÉþjÚ>iKžYhN8&ÒÀ¢ÖöæW“¢¶YÊŽ˜y™+™zîš)ŽKŠÞûÈÂG¶æÖWÞŠû~KÚj8iú^(	ÂG·W³×Þ(	ÞZh.KÙ^iKžXùŽ‹XNk©˜žhºžKˆîš8î™šžh›þXù~8&Â‹J.XªXŠNijÞ™ÈŠh(	ÂG·W³E×Þ(	ÞûÈÎK™þ™ÈŠhK‹®(	ÂG·&We³E×Þ(	ÞŠëîZé®Kˆ®™™8&ÒÀ¢&VÆF–öç6†—¢¶YÊŽK«®™˜^™zîš)ŽKŠÞûÈÂG¶æÖWÞi‹îzK®(	ÂG·W³×Þ(	ÞZh.KÙ^Z˜
k)þ˜	®8KúK»¾Kˆî‹ëžyXÎ8&Âˆº^ˆ;ÞYÊŽ(	ÂG·&We³×Þ(	Þhê^zê[™Ú.X˜ÞŠûNkˆ^(	ÂG·W³×Þ(	ÞûÈÎK©.XªŽ[iÈžiKžXùŽz›®™{N8&ÒÀ¢6VÆc¢¶YÊŽˆz®h‰hê.{J.KŠÞûÈÂG¶æÖWÞh¨®(	ÂG·W³×Þ(	ÞŠxnK‹®jÚ>YÊŽXù[^y¨NXh^YÊŽˆ;ÞX©¾8&Âh‰™[þhHþY>yØ[ŠnyØZ[ÞZX~™Ú.Zûž(	ÂG·&We³×Þ(	ÞûÈÎYÎi{n{¸>Kš(	ÂG·W³E×Þ(	Þ8&ÒÀ¢÷F†W#¢¶YÊŽ[Ù>X˜Þ™zîš)ŽKŠÞûÈÂG¶æÖWÞŠêž(	ÂG·W³×Þ(	Þh‰K‹®iÈkˆ^jY®y¨NŠx.ZùþŠy.[ªn8&ÂxëZéîY¹î[©N™ÈŠh[›>Š(	ÂG·W³×Þ(	ÞûÈÎ[›nZûž(	ÂG·&We³×Þ(	ÞKùÞhÈŠxžZùþ8&Ð¢Ð¢Ò“°¢–b‚G&F—F–öæÂ’&WGW&â&s°¢&WGW&â¥4ôâç'6R‡FõG&F—F–öæÄ6†–æW6R„¥4ôâç7G&–æv–g’‡&r’’“°§Ð ¦6öç7BvVæW&–4Æö6ÆU66fföÆG2Ò°¢¦¢°¢6÷&S¢†âÆ²“ÓæG¶çÞ8îKŠÞ[ø>Š«.šÎ8þ8ÂG¶·Þ8Þ8~8ž8&À¢W¢†âÆÆ"“ÓæG¶çÞ8þ8ÂG¶Þ8Þ8).‹8~k©8Ž8~8nKÛþ8N88ÂG¶'Þ8Þ8).X[~KÙ>y¨N8®ŠÎX¹^8Ž{Y8>8N88î8ž8&À¢&Wc¢†âÆÆ"“ÓæG¶çÞ8î˜nKØÞ{Úî8þ8ÂG¶Þ8Þ8Ž8ÂG¶'Þ8Þ8).Šh¾y»N8~8ikžk9^8(N89®8;Î8+ž8).KúîjÚ>8ž8(¾8(Ž8nKø>8~8î8ž8&À¢Gf–6S¢†“Óæ8ÂG¶Þ8Þ8).ŠŽ8ž8Šk>Zùþ8~8Þ8(¾[þ8^8®KˆjÚž8).˜Ž8)>8~8þ88^8N8&À¢v&æ–æs¢†“Óæ8ÂG¶Þ8Þ8).[Ù>xKn8îx«nhX¾8Ž8~8nY»®Zé®8¾8®8K¨¾Zéþ8ŽZ(>yXÎ8).z+®Š¨Þ8~8n8þ88^8N8&À¢VW7F–öã¢†“Óæzx8þ8ÂG¶Þ8Þ8¾88ž8î8(Ž8n8¾X[~KÙ>y¨N8¾[ùÎzÙN8~8Þ8(¾8~8~8(~8n8¾ûÉö ¢ÒÀ¢¶ó¢°¢6÷&S¢†âÆ²“ÓæG¶çÞÉÙ‚Ù[^ÈºÂ«;ÎÊ	Î¸©B(	ÂG¶·Þ(	ÞÉè^¸¸Ž¸ºBæÀ¢W¢†âÆÆ"“ÓæG¶çÞÉØŽ¸©B’(	ÂG¶Þ(	ÞÉØBÉéÉ¹ÉËÎºÂÈ+ÎÉXB(	ÂG¶'Þ(	ÞÉØB«ZÎË+NÊÉÛ‚Ùhž¸ùž«;ÂÉ{«+ÙZž¸¸Ž¸ºBæÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒÉzÞ»
žÙj^ÉØ(	ÂG¶Þ(	Þ«;Â(	ÂG¶'Þ(	ÞÉØBÈ+NÙKÎº›»
ž»)^ÉÛN¸)‚ÈhÞ¸øNº[ÂÊÊ	^ÙYŽ¹ÛÎ«:ºyÙZž¸¸Ž¸ºBæÀ¢Gf–6S¢†“Óæ(	ÂG¶Þ(	ÞÉØB»;NÉzÂÊ;Î¸©BÉé«:Ù™^ÉÛ‚«¸ª^ÙYÂÙYÂ«ŽÉØÎÉØBÈJØ9ÞÙYŽÈKŽÉ©BæÀ¢v&æ–æs¢†“Óæ(	ÂG¶Þ(	ÞÉØBÉÛ^È‰žÙYŽ¸ºN¸©BÉÛNÉÊºÂÊ	^È8Ù™NÙYŽÊxºy«:È*ÎÈºN«;Â«+Þ«8Nº[ÂÙ™^ÉÛŽÙYŽÈKŽÉ©BæÀ¢VW7F–öã¢†“Óæ¸)Ž¸©B(	ÂG¶Þ(	ÞÉyÉkN¹jB«ZÎË+NÊÉÛ‚»
žÈ¹ÞÉËÎºÂÉÙ¸»^ÙZÈ‰‚ÉèŽÉØN«˜ÎÉ©Cö ¢ÒÀ¢W3¢°¢6÷&S¢†âÆ²“ÓæÆF&V6VçG&ÂFRG¶çÒW2*²G¶·Ü+²æÀ¢W¢†âÆÆ"“ÓæG¶çÒW6*²G¶Ü+²6öÖò&V7W'6ò’6öæV7F*²G¶'Ü+²6öâVæ66œ;6â6öæ7&WFæÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒ–çfW'F–F–FR&Wf—6"*²G¶Ü+²’*²G¶'Ü+²&6÷'&Vv—"VÂÜ:—FöFòòVÂ&—FÖòæÀ¢Gf–6S¢†“ÓæVÆ–vRVâ6òWV\;ò’ö'6W'f&ÆRVRW‡&W6R*²G¶Ü+²æÀ¢v&æ–æs¢†“Óææòæ÷&ÖÆ–6W2*²G¶Ü+²6öÆò÷'VR&W7VÇFRfÖ–Æ–#²6ö×'VV&†V6†÷2’Ì:ÖÖ—FW2æÀ¢VW7F–öã¢†“Óæ+ô<;6ÖòVVFò&W7öæFW"FRÖæW&6öæ7&WF*²G¶Ü+³ö ¢ÒÀ¢g#¢°¢6÷&S¢†âÆ²“ÓæÆL:&6†R6VçG&ÆRFRG¶çÒW7B*²G¶·Ò+²æÀ¢W¢†âÆÆ"“ÓæG¶çÒWF–Æ—6R*²G¶Ò+²6öÖÖR&W76÷W&6RWB&VÆ–R*²G¶'Ò+²:VæR7F–öâ6öæ7,:‡FRæÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒ&VçfW'<:–R–çf—FR:&Wfö—"*²G¶Ò+²WB*²G¶'Ò+²f–âN(	–§W7FW"ÆÜ:—F†öFR÷RÆR'—F†ÖRæÀ¢Gf–6S¢†“Óæ6†ö—6—76W¢VâWF—B2ö'6W'f&ÆRV’W‡&–ÖR*²G¶Ò+²æÀ¢v&æ–æs¢†“ÓææRæ÷&ÖÆ—6W¢2*²G¶Ò+²6÷W2,:—FW‡FRVR6R66Œ:–ÖW7BfÖ–Æ–W"²l:—&–f–W¢ÆW2f—G2WBÆW2Æ–Ö—FW2æÀ¢VW7F–öã¢†“Óæ6öÖÖVçBV—2Ö¦R,:—öæG&R6öæ7,:‡FVÖVçB:*²G¶Ò+²ö ¢ÒÀ¢FS¢°¢6÷&S¢†âÆ²“ÓæF–R¦VçG&ÆRVfv&RföâG¶çÒ—7B(	âG¶·Þ(	ÂæÀ¢W¢†âÆÆ"“ÓæG¶çÒçWG§B(	âG¶Þ(	ÂÇ2&W76÷W&6RVæBfW&&–æFWB(	âG¶'Þ(	ÂÖ—BV–æVÒ¶öæ·&WFVâ66‡&—GBæÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒVÖvV¶V‡'Bf÷&FW'BF§RVbÂ(	âG¶Þ(	ÂVæB(	âG¶'Þ(	Â§R,;ÆfVâVæBÖWF†öFRöFW"FV×òç§W76VâæÀ¢Gf–6S¢†“Óæ|:F†ÆRV–æVâ¶ÆV–æVâÂ&Vö&6‡F&&Vâ66‡&—GBÂFW"(	âG¶Þ(	ÂW6G,;Æ6·BæÀ¢v&æ–æs¢†“Óææ÷&ÖÆ—6–W&R(	âG¶Þ(	Âæ–6‡BçW"W2vWvö†æ†V—C²,;ÆfRf·FVâVæBw&Vç¦VâæÀ¢VW7F–öã¢†“Óæv–R¶æâ–6‚Vb(	âG¶Þ(	Â¶öæ·&WB&Vv–W&Vãö ¢ÒÀ¢C¢°¢6÷&S¢†âÆ²“ÓæF&Vf6VçG&ÂFRG¶çÒ:’(	ÂG¶·Þ(	ÒæÀ¢W¢†âÆÆ"“ÓæG¶çÒW6(	ÂG¶Þ(	Ò6öÖò&V7W'6òRÆ–v(	ÂG¶'Þ(	ÒVÖ:|:6ò6öæ7&WFæÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒ–çfW'F–FVFRVR(	ÂG¶Þ(	ÒR(	ÂG¶'Þ(	Ò6V¦Ò&Wf—7F÷2&§W7F"òÜ:—FöFò÷Rò&—FÖòæÀ¢Gf–6S¢†“ÓæW66öÆ†VÒ76òWVVæòRö'6W'l:fVÂVRW‡&W76R(	ÂG¶Þ(	ÒæÀ¢v&æ–æs¢†“Óæì:6òæ÷&ÖÆ—¦R(	ÂG¶Þ(	Ò<;2÷'VR&V6RfÖ–Æ–#²6öæf—&ÖRfF÷2RÆ–Ö—FW2æÀ¢VW7F–öã¢†“Óæ6öÖò÷76ò&W7öæFW"FRÖöFò6öæ7&WFò(	ÂG¶Þ(	Óö ¢ÒÀ¢'S¢°¢6÷&S¢†âÆ²“Óæ	=½-Ýò}M}­-²*²G¶çÜ+²(	B*²G¶·Ü+²æÀ¢W¢†âÆÆ"“Óæ	­-*²G¶çÜ+²ýí½Í}=]"*²G¶Ü+²­¢]=‚-ý}½-]"*²G¶'Ü+²­íÝ­]-Ý½ÂM]--]ÂæÀ¢&Wc¢†âÆÆ"“Óæ	ý]]-Ý=-ò­-*²G¶çÜ+²ý]M½=]"ýí-]-Â*²G¶Ü+²‚*²G¶'Ü+²Â­í]­-í-"ýíí½‚-]ÍòæÀ¢Gf–6S¢†“Óæ	-½]-RÝ]í½Íí’‚Ý½íM]Í½’2Â­í-í½’-½m]"*²G¶Ü+²æÀ¢v&æ–æs¢†“Óæ	ÝR}--R*²G¶Ü+²ÝíÍí’-í½Í­ârÝ}ý-½}Ýí-ƒ²ýí-]Í-RM­-²‚=Ým²æÀ¢VW7F–öã¢†“Óæ	­¢òÍí=2­íÝ­]-Ýâí--]--ÂÝ*²G¶Ü+³ö ¢ÒÀ¢#¢°¢6÷&S¢†âÆ²“ÓæŠ}˜M˜]˜}˜]Š’Š}˜MŠ=‹=Š}‹=˜­Š’˜MŠ‹}Š}˜-Š’G¶çÒ˜}˜¢*²G¶·Ü+²æÀ¢W¢†âÆÆ"“ÓæŠ­‹=Š­ŠíŠý˜RŠ‹}Š}˜-Š’G¶çÒ*²G¶Ü+²˜=˜]˜‹Šò˜Š­‹Š‹r*²G¶'Ü+²ŠŠí‹}˜Š’‹˜]˜M˜­Š’æÀ¢&Wc¢†âÆÆ"“ÓæŠ­Šý‹˜‚Š‹}Š}˜-Š’G¶çÒŠ}˜M˜]‹˜=˜‹=Š’Š]˜M˜’˜]‹Š}ŠÍ‹Š’*²G¶Ü+²˜Œ*²G¶'Ü+²˜Š­‹Šý˜­˜BŠ}˜MŠ=‹=˜M˜Š‚Š=˜‚Š}˜M˜Š­˜­‹Š’æÀ¢Gf–6S¢†“ÓæŠ}ŠíŠ­‹Ší‹}˜Š’‹]‹­˜­‹Š’˜-Š}Š˜MŠ’˜M˜M˜]˜MŠ}ŠÝ‹Š’Š­‹Š™‹‹˜b*²G¶Ü+²æÀ¢v&æ–æs¢†“Óæ˜MŠrŠ­‹Š­Š‹*²G¶Ü+²Š=˜]‹˜½Šr‹}Š˜­‹˜­˜½Šr˜M˜]ŠÍ‹ŠòŠ=˜m˜r˜]Š=˜M˜˜‰²‹Š}ŠÍ‹’Š}˜MŠÝ˜-Š}Šm˜"˜Š}˜MŠÝŠý˜ŠòæÀ¢VW7F–öã¢†“Óæ˜=˜­˜˜­˜]˜=˜m˜m˜¢Š}˜MŠ}‹=Š­ŠÍŠ}ŠŠ’Š‹]˜‹Š’‹˜]˜M˜­Š’˜M˜*²G¶Ü+½‰ö ¢ÒÀ¢†“¢°¢6÷&S¢†âÆ²“ÓæG¶çÒ
I^
Kâ
Jî
X
In
XÞ
Jò
K^
Kþ
K~
Jò(	ÂG¶·Þ(	Ò
Kž
XŽ
ZFÀ¢W¢†âÆÆ"“ÓæG¶çÒ(	ÂG¶Þ(	Ò
I^
X²
KŽ
Kî
J~
J‚
JÎ
JŽ
Kî
I^
K(	ÂG¶'Þ(	Ò
I^
X²
Hþ
IR
J
X¾
K‚
I^
Jn
Jâ
KŽ
Xr
IÎ
X¾
J
KÎ
JN
Kâ
Kž
XŽ
ZFÀ¢&Wc¢†âÆÆ"“ÓæG¶çÒ
I^
X
Hž
K.
Iþ
X
KŽ
XÞ
J^
Kþ
JN
Kò(	ÂG¶Þ(	Ò
IN
K(	ÂG¶'Þ(	Ò
I^
X
IÎ
Kî
H
I¢
I^
K
I^
Xr
JN
K
X
I^
Kâ
Jþ
Kâ
I~
JN
Kò
KŽ
X
J~
Kî
K
JŽ
Xr
I^
X²
I^
Kž
JN
X
Kž
XŽ
ZFÀ¢Gf–6S¢†“Óæ(	ÂG¶Þ(	Ò
I^
X²
Jn
Kþ
In
Kî
JŽ
Xr
K^
Kî
K.
Kâ
I¾
X¾
Iþ
Kâ
IN
K
KŽ
XÞ
J®
K~
XÞ
Iò
I^
Jn
Jâ
I®
X
JŽ
X~
H.
ZFÀ¢v&æ–æs¢†“Óæ(	ÂG¶Þ(	Ò
I^
X²
I^
X~
K^
K"
J®
K
Kþ
I®
Kþ
JB
Kž
X¾
JŽ
Xr
I^
Xr
I^
Kî
K
J2
KŽ
Kî
Jî
Kî
JŽ
XÞ
Jò
J‚
Jî
Kî
JŽ
X~
H#²
JN
J^
XÞ
Jò
IN
K
KŽ
X
Jî
Kî
Hþ
H
IÎ
Kî
H
I®
X~
H.
ZFÀ¢VW7F–öã¢†“Óæ
Jî
XŽ
H"(	ÂG¶Þ(	Ò
I^
Kâ
J
X¾
K‚
Hž
JN
XÞ
JN
K
I^
XŽ
KŽ
Xr
Jn
Xr
KŽ
I^
JN
Kâ
Kž
X.
Hö ¢Ð§Ó° ¦gVæ7F–öâ'V–ÆDvVæW&–4Æö6ÆT6öçFVçB‡&öf–ÆRÂÆæwVvRÂæÖR’°¢6öç7B66fföÆBÒvVæW&–4Æö6ÆU66fföÆG5¶ÆæwVvUÓ°¢6öç7B6VÖçF–2Ò&öf–ÆRç6VÖçF–2æVã°¢6öç7BWÒ6VÖçF–2çW&–v‡C°¢6öç7B&WbÒ6VÖçF–2ç&WfW'6VC°¢6öç7B&÷FFRÒ†Æ—7BÂ–æFW‚’ÓâÆ—7E¶–æFW‚RÆ—7BæÆVæwF…Ó°¢&WGW&âFDÆVv7”f–VÆG2‡°¢æÖRÀ¢6†÷'DæÖS¢æÖRÀ¢W&–v‡D¶W—v÷&G3¢²ââçWÒÀ¢&WfW'6VD¶W—v÷&G3¢²ââç&WeÒÀ¢6÷&UF†VÖS¢66fföÆBæ6÷&R†æÖRÂ6VÖçF–2æ6÷&R’À¢W&–v‡DÖVæ–æw3¢'&’æg&öÒ‡²ÆVæwFƒ¢bÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚’Â&÷FFR‡WÂ–æFW‚²2’’’À¢&WfW'6VDÖVæ–æw3¢'&’æg&öÒ‡²ÆVæwFƒ¢bÒÂ…òÂ–æFW‚’Óâ66fföÆBç&Wb†æÖRÂ&÷FFR‡&WbÂ–æFW‚’Â&÷FFR‡&WbÂ–æFW‚²2’’’À¢6†F÷tÖVæ–æw3¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBç&Wb†æÖRÂ&÷FFR‡&WbÂ–æFW‚’Â&÷FFR‡WÂ–æFW‚’’’À¢7G&VæwF‡3¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚’Â&÷FFR‡WÂ–æFW‚²B’’’À¢6†ÆÆVævW3¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBç&Wb†æÖRÂ&÷FFR‡&WbÂ–æFW‚’Â&÷FFR‡&WbÂ–æFW‚²B’’’À¢Gf–6Uf&–çG3¢°¢W&–v‡C¢'&’æg&öÒ‡²ÆVæwFƒ¢bÒÂ…òÂ–æFW‚’Óâ66fföÆBæGf–6R‡&÷FFR‡WÂ–æFW‚’’’À¢&WfW'6VC¢'&’æg&öÒ‡²ÆVæwFƒ¢bÒÂ…òÂ–æFW‚’Óâ66fföÆBæGf–6R‡&÷FFR‡&WbÂ–æFW‚’’¢ÒÀ¢v&æ–æuf&–çG3¢°¢W&–v‡C¢'&’æg&öÒ‡²ÆVæwFƒ¢RÒÂ…òÂ–æFW‚’Óâ66fföÆBçv&æ–ær‡&÷FFR‡WÂ–æFW‚’’’À¢&WfW'6VC¢'&’æg&öÒ‡²ÆVæwFƒ¢RÒÂ…òÂ–æFW‚’Óâ66fföÆBçv&æ–ær‡&÷FFR‡&WbÂ–æFW‚’’¢ÒÀ¢&VfÆV7F–öåf&–çG3¢'&’æg&öÒ‡²ÆVæwFƒ¢‚ÒÂ…òÂ–æFW‚’Óâ66fföÆBçVW7F–öâ†–æFW‚R"ò&÷FFR‡&WbÂ–æFW‚’¢&÷FFR‡WÂ–æFW‚’’’À¢÷6—F–öäÖVæ–æw3¢°¢7C¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚’Â&÷FFR‡&WbÂ–æFW‚’’’À¢&W6VçC¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚²"’Â&÷FFR‡&WbÂ–æFW‚²"’’’À¢gWGW&S¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚²B’Â&÷FFR‡&WbÂ–æFW‚²B’’’À¢6–ævÆS¢'&’æg&öÒ‡²ÆVæwFƒ¢BÒÂ…òÂ–æFW‚’Óâ66fföÆBçW†æÖRÂ&÷FFR‡WÂ–æFW‚²’Â&÷FFR‡&WbÂ–æFW‚²’’¢ÒÀ¢FöÖ–äÖVæ–æw3¢ö&¦V7Bæg&öÔVçG&–W2…²&Æ÷fR"Â&6&VW""Â'7GVG’"Â&ÖöæW’"Â'&VÆF–öç6†—"Â'6VÆb"Â&÷F†W"%ÒæÖ‚†FöÖ–âÂFöÖ–ä–æFW‚’Óâ°¢FöÖ–âÀ¢·66fföÆBçW†æÖRÂ&÷FFR‡WÂFöÖ–ä–æFW‚’Â&÷FFR‡WÂFöÖ–ä–æFW‚²2’’Â66fföÆBç&Wb†æÖRÂ&÷FFR‡&WbÂFöÖ–ä–æFW‚’Â&÷FFR‡&WbÂFöÖ–ä–æFW‚²2’•Ð¢Ò’¢Ò“°§Ð ¦gVæ7F–öâ'V–ÆDÆö6Æ—¦VD6öçFVçB‡&öf–ÆRÂÆæwVvR’°¢6öç7BæÖRÒvWDÆö6Æ—¦VD6&DæÖR‡&öf–ÆRÂÆæwVvR“°¢–b†ÆæwVvRÓÓÒ&Vâ"’&WGW&â'V–ÆDVævÆ—6„6öçFVçB‡&öf–ÆRÂæÖR“°¢–b†ÆæwVvRÓÓÒ'¦‚Ô4â"’&WGW&â'V–ÆD6†–æW6T6öçFVçB‡&öf–ÆRÂæÖRÂfÇ6R“°¢–b†ÆæwVvRÓÓÒ'¦‚ÕEr"’&WGW&â'V–ÆD6†–æW6T6öçFVçB‡&öf–ÆRÂæÖRÂG'VR“°¢&WGW&â'V–ÆDvVæW&–4Æö6ÆT6öçFVçB‡&öf–ÆRÂÆæwVvRÂæÖR“°§Ð ¦6öç7BF&÷DFV6²ÒF&÷E6VÖçF–5&öf–ÆW2æÖ‚‡&öf–ÆR’Óâ°¢6öç7BÆö6Æ—¦VBÒö&¦V7Bæg&öÔVçG&–W2‡F&÷DÆæwVvT6öFW2æÖ‚†ÆæwVvR’Óâ¶ÆæwVvRÂ'V–ÆDÆö6Æ—¦VD6öçFVçB‡&öf–ÆRÂÆæwVvR•Ò’“°¢&WGW&â°¢ââç&öf–ÆRÀ¢æÖT6ã¢Æö6Æ—¦VE²'¦‚Ô4â%ÒææÖRÀ¢æÖTVã¢Æö6Æ—¦VBæVâææÖRÀ¢¶W—v÷&G3¢Æö6Æ—¦VE²'¦‚Ô4â%ÒçW&–v‡D¶W—v÷&G2À¢W&–v‡DÖVæ–æs¢Æö6Æ—¦VE²'¦‚Ô4â%ÒçW&–v‡DÖVæ–æw5³ÒÀ¢&WfW'6VDÖVæ–æs¢Æö6Æ—¦VE²'¦‚Ô4â%Òç&WfW'6VDÖVæ–æw5³ÒÀ¢Gf–6S¢Æö6Æ—¦VE²'¦‚Ô4â%ÒæGf–6Uf&–çG2çW&–v‡E³ÒÀ¢v&æ–æs¢Æö6Æ—¦VE²'¦‚Ô4â%Òçv&æ–æuf&–çG2çW&–v‡E³ÒÀ¢Æö6Æ—¦V@¢Ó°§Ò“° ¦gVæ7F–öâvWDÆö6Æ—¦VD6&B†6&BÂÆæwVvRÒ&Vâ"’°¢6öç7B6VÆV7FVDÆæwVvRÒF&÷DÆæwVvT6öFW2æ–æ6ÇVFW2†ÆæwVvR’òÆæwVvR¢&Vâ#°¢6öç7BÆö6Æ—¦VBÒ6&CòæÆö6Æ—¦VCòå·6VÆV7FVDÆæwVvUÒÇÂ6&CòæÆö6Æ—¦VCòæVã°¢–b‚Æö6Æ—¦VB’°¢6öç6öÆRçv&â†Ö—76–ærF&÷BÆö6Æ—¦F–öã¢G¶6&Còæ–BÇÂ'Væ¶æ÷vâ'ÒâG·6VÆV7FVDÆæwVvWÖ“°¢&WGW&âF&÷DFV6µ³ÒæÆö6Æ—¦VBæVã°¢Ð¢&WGW&âÆö6Æ—¦VC°§Ð ¦gVæ7F–öâvWD÷&–VçFF–öä¶W—v÷&G2†6&BÂ÷&–VçFF–öâÒ'W&–v‡B"ÂÆæwVvRÒ&Vâ"’°¢6öç7BÆö6Æ—¦VBÒvWDÆö6Æ—¦VD6&B†6&BÂÆæwVvR“°¢&WGW&â÷&–VçFF–öâÓÓÒ'&WfW'6VB"òÆö6Æ—¦VBç&WfW'6VD¶W—v÷&G2¢Æö6Æ—¦VBçW&–v‡D¶W—v÷&G3°§Ð ¦gVæ7F–öâfÆ–FFUF&÷E6VÖçF–46÷'W2‚’°¢6öç7B—77VW2ÒµÓ°¢–b‡F&÷DFV6²æÆVæwF‚ÓÒs‚’—77VW2çW6‚†W‡V7FVBs‚6&G2Â&V6V—fVBG·F&÷DFV6²æÆVæwF‡Ö“°¢6öç7B&WV—&VD'&—2Ò°¢W&–v‡D¶W—v÷&G3¢‚À¢&WfW'6VD¶W—v÷&G3¢‚À¢W&–v‡DÖVæ–æw3¢bÀ¢&WfW'6VDÖVæ–æw3¢bÀ¢6†F÷tÖVæ–æw3¢BÀ¢7G&VæwF‡3¢BÀ¢6†ÆÆVævW3¢BÀ¢&VfÆV7F–öåf&–çG3¢€¢Ó°¢F&÷DFV6²æf÷$V6‚‚†6&B’Óâ°¢²&–B"Â&&6æ"Â'7V—B"Â'&æ²"Â&VÆVÖVçB"Â&çVÖ&W""Â&&6†WG—R"Â'7–Ö&öÇ2"Â'F†VÖW2"Â&Æö6Æ—¦VB%Òæf÷$V6‚‚†f–VÆB’Óâ°¢–b†6&E¶f–VÆEÒÓÓÒVæFVf–æVBÇÂ6&E¶f–VÆEÒÓÓÒçVÆÂ’—77VW2çW6‚†G¶6&Bæ–GÒâG¶f–VÆGÒÖ—76–æv“°¢Ò“°¢F&÷DÆæwVvT6öFW2æf÷$V6‚‚†ÆæwVvR’Óâ°¢6öç7B6öçFVçBÒ6&BæÆö6Æ—¦VE¶ÆæwVvUÓ°¢ö&¦V7BæVçG&–W2‡&WV—&VD'&—2’æf÷$V6‚‚…¶f–VÆBÂÖ–æ–×VÕÒ’Óâ°¢–b‚'&’æ—4'&’†6öçFVçCòå¶f–VÆEÒ’ÇÂ6öçFVçE¶f–VÆEÒæÆVæwF‚ÂÖ–æ–×VÒ’—77VW2çW6‚†G¶6&Bæ–GÒâG¶ÆæwVvWÒâG¶f–VÆGÒÂG¶Ö–æ–×V×Ö“°¢Ò“°¢²'W&–v‡B"Â'&WfW'6VB%Òæf÷$V6‚‚†÷&–VçFF–öâ’Óâ°¢–b‚'&’æ—4'&’†6öçFVçCòæGf–6Uf&–çG3òå¶÷&–VçFF–öåÒ’ÇÂ6öçFVçBæGf–6Uf&–çG5¶÷&–VçFF–öåÒæÆVæwF‚Âb’—77VW2çW6‚†G¶6&Bæ–GÒâG¶ÆæwVvWÒæGf–6Uf&–çG2âG¶÷&–VçFF–öçÒÂf“°¢–b‚'&’æ—4'&’†6öçFVçCòçv&æ–æuf&–çG3òå¶÷&–VçFF–öåÒ’ÇÂ6öçFVçBçv&æ–æuf&–çG5¶÷&–VçFF–öåÒæÆVæwF‚ÂR’—77VW2çW6‚†G¶6&Bæ–GÒâG¶ÆæwVvWÒçv&æ–æuf&–çG2âG¶÷&–VçFF–öçÒÂV“°¢Ò“°¢²'7B"Â'&W6VçB"Â&gWGW&R"Â'6–ævÆR%Òæf÷$V6‚‚‡÷6—F–öâ’Óâ°¢–b‚'&’æ—4'&’†6öçFVçCòç÷6—F–öäÖVæ–æw3òå·÷6—F–öåÒ’ÇÂ6öçFVçBç÷6—F–öäÖVæ–æw5·÷6—F–öåÒæÆVæwF‚ÂB’—77VW2çW6‚†G¶6&Bæ–GÒâG¶ÆæwVvWÒç÷6—F–öäÖVæ–æw2âG·÷6—F–öçÒÂF“°¢Ò“°¢²&Æ÷fR"Â&6&VW""Â'7GVG’"Â&ÖöæW’"Â'&VÆF–öç6†—"Â'6VÆb"Â&÷F†W"%Òæf÷$V6‚‚†FöÖ–â’Óâ°¢–b‚'&’æ—4'&’†6öçFVçCòæFöÖ–äÖVæ–æw3òå¶FöÖ–åÒ’ÇÂ6öçFVçBæFöÖ–äÖVæ–æw5¶FöÖ–åÒæÆVæwF‚Â"’—77VW2çW6‚†G¶6&Bæ–GÒâG¶ÆæwVvWÒæFöÖ–äÖVæ–æw2âG¶FöÖ–çÒÂ&“°¢Ò“°¢Ò“°¢Ò“°¢–b†—77VW2æÆVæwF‚’6öç6öÆRçv&â‚%F&÷B6VÖçF–26÷'W2fÆ–FF–öâf–ÆVB"Â—77VW2“°¢&WGW&â²fÆ–C¢—77VW2æÆVæwF‚ÓÓÒÂ—77VW2Ó°§Ð