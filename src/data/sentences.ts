import { PracticalSentence, SentenceCategory } from "../lib/types";

// Practical sentences organized by category
// These are real-world sentences you'd use in daily life in China

export const practicalSentences: PracticalSentence[] = [
  // ===== SHOPPING =====
  { id: "s-shop-01", chinese: "这个多少钱？", pinyin: "Zhège duōshao qián?", english: "How much is this?", category: "shopping", hskLevel: 1, situation: "Asking price of any item", breakdown: [
    { word: "这个", pinyin: "zhège", meaning: "this (one)" },
    { word: "多少", pinyin: "duōshao", meaning: "how much/how many" },
    { word: "钱", pinyin: "qián", meaning: "money" },
  ]},
  { id: "s-shop-02", chinese: "太贵了，便宜一点。", pinyin: "Tài guì le, piányi yīdiǎn.", english: "Too expensive, can you make it cheaper?", category: "shopping", hskLevel: 2, situation: "Bargaining at a market", breakdown: [
    { word: "太", pinyin: "tài", meaning: "too/excessively" },
    { word: "贵", pinyin: "guì", meaning: "expensive" },
    { word: "便宜", pinyin: "piányi", meaning: "cheap" },
    { word: "一点", pinyin: "yīdiǎn", meaning: "a little bit" },
  ]},
  { id: "s-shop-03", chinese: "可以刷卡吗？", pinyin: "Kěyǐ shuākǎ ma?", english: "Can I pay by card?", category: "shopping", hskLevel: 2, situation: "Asking payment method", breakdown: [
    { word: "可以", pinyin: "kěyǐ", meaning: "can/may" },
    { word: "刷卡", pinyin: "shuākǎ", meaning: "swipe card" },
  ]},
  { id: "s-shop-04", chinese: "我要买这个。", pinyin: "Wǒ yào mǎi zhège.", english: "I want to buy this.", category: "shopping", hskLevel: 1, situation: "Pointing at something to buy", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "要", pinyin: "yào", meaning: "want" },
    { word: "买", pinyin: "mǎi", meaning: "buy" },
    { word: "这个", pinyin: "zhège", meaning: "this" },
  ]},
  { id: "s-shop-05", chinese: "有没有便宜一点的？", pinyin: "Yǒu méiyǒu piányi yīdiǎn de?", english: "Do you have anything cheaper?", category: "shopping", hskLevel: 2, situation: "Looking for cheaper options", breakdown: [
    { word: "有没有", pinyin: "yǒu méiyǒu", meaning: "do you have" },
    { word: "便宜", pinyin: "piányi", meaning: "cheap" },
    { word: "一点", pinyin: "yīdiǎn", meaning: "a bit" },
  ]},
  { id: "s-shop-06", chinese: "一共多少钱？", pinyin: "Yīgòng duōshao qián?", english: "How much in total?", category: "shopping", hskLevel: 2, situation: "Buying multiple items", breakdown: [
    { word: "一共", pinyin: "yīgòng", meaning: "altogether/in total" },
    { word: "多少", pinyin: "duōshao", meaning: "how much" },
    { word: "钱", pinyin: "qián", meaning: "money" },
  ]},
  { id: "s-shop-07", chinese: "可以用微信支付吗？", pinyin: "Kěyǐ yòng Wēixìn zhīfù ma?", english: "Can I use WeChat Pay?", category: "shopping", hskLevel: 3, situation: "Very common in China", breakdown: [
    { word: "可以", pinyin: "kěyǐ", meaning: "can" },
    { word: "用", pinyin: "yòng", meaning: "use" },
    { word: "微信", pinyin: "Wēixìn", meaning: "WeChat" },
    { word: "支付", pinyin: "zhīfù", meaning: "pay" },
  ]},
  { id: "s-shop-08", chinese: "这个可以试一下吗？", pinyin: "Zhège kěyǐ shì yīxià ma?", english: "Can I try this on?", category: "shopping", hskLevel: 2, situation: "Clothing shopping", breakdown: [
    { word: "这个", pinyin: "zhège", meaning: "this" },
    { word: "可以", pinyin: "kěyǐ", meaning: "can" },
    { word: "试", pinyin: "shì", meaning: "try" },
    { word: "一下", pinyin: "yīxià", meaning: "a bit/quickly" },
  ]},

  // ===== DIRECTIONS / LOCATION =====
  { id: "s-dir-01", chinese: "你在哪儿？", pinyin: "Nǐ zài nǎr?", english: "Where are you?", category: "directions", hskLevel: 1, situation: "Calling/texting someone to find them", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "在", pinyin: "zài", meaning: "at/in" },
    { word: "哪儿", pinyin: "nǎr", meaning: "where" },
  ]},
  { id: "s-dir-02", chinese: "我在这里。", pinyin: "Wǒ zài zhèlǐ.", english: "I am here.", category: "directions", hskLevel: 1, situation: "Telling someone your location", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "在", pinyin: "zài", meaning: "at" },
    { word: "这里", pinyin: "zhèlǐ", meaning: "here" },
  ]},
  { id: "s-dir-03", chinese: "洗手间在哪儿？", pinyin: "Xǐshǒujiān zài nǎr?", english: "Where is the restroom?", category: "directions", hskLevel: 2, situation: "Looking for bathroom anywhere", breakdown: [
    { word: "洗手间", pinyin: "xǐshǒujiān", meaning: "restroom/toilet" },
    { word: "在", pinyin: "zài", meaning: "at" },
    { word: "哪儿", pinyin: "nǎr", meaning: "where" },
  ]},
  { id: "s-dir-04", chinese: "怎么去地铁站？", pinyin: "Zěnme qù dìtiě zhàn?", english: "How do I get to the subway station?", category: "directions", hskLevel: 2, situation: "Asking for directions", breakdown: [
    { word: "怎么", pinyin: "zěnme", meaning: "how" },
    { word: "去", pinyin: "qù", meaning: "go" },
    { word: "地铁", pinyin: "dìtiě", meaning: "subway" },
    { word: "站", pinyin: "zhàn", meaning: "station" },
  ]},
  { id: "s-dir-05", chinese: "往前走，然后左转。", pinyin: "Wǎng qián zǒu, ránhòu zuǒ zhuǎn.", english: "Go straight, then turn left.", category: "directions", hskLevel: 2, situation: "Giving or understanding directions", breakdown: [
    { word: "往前", pinyin: "wǎng qián", meaning: "forward" },
    { word: "走", pinyin: "zǒu", meaning: "walk" },
    { word: "然后", pinyin: "ránhòu", meaning: "then/after" },
    { word: "左", pinyin: "zuǒ", meaning: "left" },
    { word: "转", pinyin: "zhuǎn", meaning: "turn" },
  ]},
  { id: "s-dir-06", chinese: "离这儿远吗？", pinyin: "Lí zhèr yuǎn ma?", english: "Is it far from here?", category: "directions", hskLevel: 2, situation: "Asking about distance", breakdown: [
    { word: "离", pinyin: "lí", meaning: "from/distance" },
    { word: "这儿", pinyin: "zhèr", meaning: "here" },
    { word: "远", pinyin: "yuǎn", meaning: "far" },
  ]},
  { id: "s-dir-07", chinese: "我迷路了。", pinyin: "Wǒ mílù le.", english: "I'm lost.", category: "directions", hskLevel: 3, situation: "When you can't find your way", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "迷路", pinyin: "mílù", meaning: "get lost" },
  ]},
  { id: "s-dir-08", chinese: "你能帮我指路吗？", pinyin: "Nǐ néng bāng wǒ zhǐlù ma?", english: "Can you help me with directions?", category: "directions", hskLevel: 3, situation: "Asking a stranger for help", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "能", pinyin: "néng", meaning: "can" },
    { word: "帮", pinyin: "bāng", meaning: "help" },
    { word: "指路", pinyin: "zhǐlù", meaning: "point the way" },
  ]},

  // ===== TIME / DURATION =====
  { id: "s-time-01", chinese: "要多长时间？", pinyin: "Yào duō cháng shíjiān?", english: "How long will it take?", category: "time", hskLevel: 2, situation: "Asking about duration of anything", breakdown: [
    { word: "要", pinyin: "yào", meaning: "will/need" },
    { word: "多", pinyin: "duō", meaning: "how much" },
    { word: "长", pinyin: "cháng", meaning: "long" },
    { word: "时间", pinyin: "shíjiān", meaning: "time" },
  ]},
  { id: "s-time-02", chinese: "大概需要半个小时。", pinyin: "Dàgài xūyào bàn ge xiǎoshí.", english: "About half an hour needed.", category: "time", hskLevel: 3, situation: "Answering a duration question", breakdown: [
    { word: "大概", pinyin: "dàgài", meaning: "about/approximately" },
    { word: "需要", pinyin: "xūyào", meaning: "need" },
    { word: "半", pinyin: "bàn", meaning: "half" },
    { word: "小时", pinyin: "xiǎoshí", meaning: "hour" },
  ]},
  { id: "s-time-03", chinese: "现在几点了？", pinyin: "Xiànzài jǐ diǎn le?", english: "What time is it now?", category: "time", hskLevel: 1, situation: "Asking the time", breakdown: [
    { word: "现在", pinyin: "xiànzài", meaning: "now" },
    { word: "几", pinyin: "jǐ", meaning: "how many" },
    { word: "点", pinyin: "diǎn", meaning: "o'clock" },
  ]},
  { id: "s-time-04", chinese: "你什么时候到？", pinyin: "Nǐ shénme shíhou dào?", english: "When will you arrive?", category: "time", hskLevel: 2, situation: "Asking someone's arrival time", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "什么", pinyin: "shénme", meaning: "what" },
    { word: "时候", pinyin: "shíhou", meaning: "time/when" },
    { word: "到", pinyin: "dào", meaning: "arrive" },
  ]},
  { id: "s-time-05", chinese: "还要多久？", pinyin: "Hái yào duōjiǔ?", english: "How much longer?", category: "time", hskLevel: 2, situation: "Waiting for something", breakdown: [
    { word: "还", pinyin: "hái", meaning: "still" },
    { word: "要", pinyin: "yào", meaning: "need" },
    { word: "多久", pinyin: "duōjiǔ", meaning: "how long" },
  ]},
  { id: "s-time-06", chinese: "我等了你半个小时了。", pinyin: "Wǒ děng le nǐ bàn ge xiǎoshí le.", english: "I've been waiting for you for half an hour.", category: "time", hskLevel: 3, situation: "Expressing you've been waiting", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "等", pinyin: "děng", meaning: "wait" },
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "半", pinyin: "bàn", meaning: "half" },
    { word: "小时", pinyin: "xiǎoshí", meaning: "hour" },
  ]},
  { id: "s-time-07", chinese: "明天几点见面？", pinyin: "Míngtiān jǐ diǎn jiànmiàn?", english: "What time shall we meet tomorrow?", category: "time", hskLevel: 2, situation: "Making plans", breakdown: [
    { word: "明天", pinyin: "míngtiān", meaning: "tomorrow" },
    { word: "几", pinyin: "jǐ", meaning: "what/which" },
    { word: "点", pinyin: "diǎn", meaning: "o'clock" },
    { word: "见面", pinyin: "jiànmiàn", meaning: "meet" },
  ]},
  { id: "s-time-08", chinese: "快到了，再等五分钟。", pinyin: "Kuài dào le, zài děng wǔ fēnzhōng.", english: "Almost there, wait five more minutes.", category: "time", hskLevel: 3, situation: "Running slightly late", breakdown: [
    { word: "快", pinyin: "kuài", meaning: "almost/soon" },
    { word: "到", pinyin: "dào", meaning: "arrive" },
    { word: "再", pinyin: "zài", meaning: "again/more" },
    { word: "等", pinyin: "děng", meaning: "wait" },
    { word: "五", pinyin: "wǔ", meaning: "five" },
    { word: "分钟", pinyin: "fēnzhōng", meaning: "minute" },
  ]},

  // ===== TRAVEL / ARRIVAL =====
  { id: "s-trav-01", chinese: "你到了吗？", pinyin: "Nǐ dào le ma?", english: "Have you arrived?", category: "travel", hskLevel: 1, situation: "Texting someone to check if they arrived", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "到", pinyin: "dào", meaning: "arrive" },
    { word: "了", pinyin: "le", meaning: "completed action" },
    { word: "吗", pinyin: "ma", meaning: "question particle" },
  ]},
  { id: "s-trav-02", chinese: "我到了。", pinyin: "Wǒ dào le.", english: "I have arrived.", category: "travel", hskLevel: 1, situation: "Telling someone you've arrived", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "到", pinyin: "dào", meaning: "arrive" },
    { word: "了", pinyin: "le", meaning: "completed" },
  ]},
  { id: "s-trav-03", chinese: "我要去机场。", pinyin: "Wǒ yào qù jīchǎng.", english: "I need to go to the airport.", category: "travel", hskLevel: 2, situation: "Talking to a taxi driver", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "要", pinyin: "yào", meaning: "want/need" },
    { word: "去", pinyin: "qù", meaning: "go" },
    { word: "机场", pinyin: "jīchǎng", meaning: "airport" },
  ]},
  { id: "s-trav-04", chinese: "请送我到这个地址。", pinyin: "Qǐng sòng wǒ dào zhège dìzhǐ.", english: "Please take me to this address.", category: "travel", hskLevel: 3, situation: "In a taxi, showing address on phone", breakdown: [
    { word: "请", pinyin: "qǐng", meaning: "please" },
    { word: "送", pinyin: "sòng", meaning: "take/deliver" },
    { word: "我", pinyin: "wǒ", meaning: "me" },
    { word: "到", pinyin: "dào", meaning: "to" },
    { word: "地址", pinyin: "dìzhǐ", meaning: "address" },
  ]},
  { id: "s-trav-05", chinese: "火车几点出发？", pinyin: "Huǒchē jǐ diǎn chūfā?", english: "What time does the train depart?", category: "travel", hskLevel: 2, situation: "At the train station", breakdown: [
    { word: "火车", pinyin: "huǒchē", meaning: "train" },
    { word: "几", pinyin: "jǐ", meaning: "what/which" },
    { word: "点", pinyin: "diǎn", meaning: "o'clock" },
    { word: "出发", pinyin: "chūfā", meaning: "depart" },
  ]},
  { id: "s-trav-06", chinese: "我的航班延误了。", pinyin: "Wǒde hángbān yányù le.", english: "My flight is delayed.", category: "travel", hskLevel: 3, situation: "At the airport", breakdown: [
    { word: "我的", pinyin: "wǒde", meaning: "my" },
    { word: "航班", pinyin: "hángbān", meaning: "flight" },
    { word: "延误", pinyin: "yányù", meaning: "delayed" },
  ]},
  { id: "s-trav-07", chinese: "到火车站怎么走？", pinyin: "Dào huǒchē zhàn zěnme zǒu?", english: "How to get to the train station?", category: "travel", hskLevel: 2, situation: "Asking for directions to station", breakdown: [
    { word: "到", pinyin: "dào", meaning: "to/reach" },
    { word: "火车", pinyin: "huǒchē", meaning: "train" },
    { word: "站", pinyin: "zhàn", meaning: "station" },
    { word: "怎么", pinyin: "zěnme", meaning: "how" },
    { word: "走", pinyin: "zǒu", meaning: "walk/go" },
  ]},
  { id: "s-trav-08", chinese: "请帮我叫一辆出租车。", pinyin: "Qǐng bāng wǒ jiào yī liàng chūzūchē.", english: "Please help me call a taxi.", category: "travel", hskLevel: 3, situation: "At a hotel front desk", breakdown: [
    { word: "请", pinyin: "qǐng", meaning: "please" },
    { word: "帮", pinyin: "bāng", meaning: "help" },
    { word: "叫", pinyin: "jiào", meaning: "call" },
    { word: "出租车", pinyin: "chūzūchē", meaning: "taxi" },
  ]},

  // ===== GREETINGS / BASIC =====
  { id: "s-grt-01", chinese: "你好，我叫……", pinyin: "Nǐ hǎo, wǒ jiào...", english: "Hello, my name is...", category: "greetings", hskLevel: 1, situation: "Introducing yourself", breakdown: [
    { word: "你好", pinyin: "nǐ hǎo", meaning: "hello" },
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "叫", pinyin: "jiào", meaning: "called" },
  ]},
  { id: "s-grt-02", chinese: "你会说英语吗？", pinyin: "Nǐ huì shuō Yīngyǔ ma?", english: "Can you speak English?", category: "greetings", hskLevel: 2, situation: "When you need English help", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "会", pinyin: "huì", meaning: "can/able to" },
    { word: "说", pinyin: "shuō", meaning: "speak" },
    { word: "英语", pinyin: "Yīngyǔ", meaning: "English" },
  ]},
  { id: "s-grt-03", chinese: "我只会说一点中文。", pinyin: "Wǒ zhǐ huì shuō yīdiǎn Zhōngwén.", english: "I can only speak a little Chinese.", category: "greetings", hskLevel: 2, situation: "Explaining your Chinese level", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "只", pinyin: "zhǐ", meaning: "only" },
    { word: "会", pinyin: "huì", meaning: "can" },
    { word: "说", pinyin: "shuō", meaning: "speak" },
    { word: "一点", pinyin: "yīdiǎn", meaning: "a little" },
    { word: "中文", pinyin: "Zhōngwén", meaning: "Chinese" },
  ]},
  { id: "s-grt-04", chinese: "请再说一遍。", pinyin: "Qǐng zài shuō yī biàn.", english: "Please say that again.", category: "greetings", hskLevel: 2, situation: "When you didn't understand", breakdown: [
    { word: "请", pinyin: "qǐng", meaning: "please" },
    { word: "再", pinyin: "zài", meaning: "again" },
    { word: "说", pinyin: "shuō", meaning: "speak/say" },
    { word: "一遍", pinyin: "yī biàn", meaning: "one time" },
  ]},
  { id: "s-grt-05", chinese: "对不起，我不明白。", pinyin: "Duìbuqǐ, wǒ bù míngbai.", english: "Sorry, I don't understand.", category: "greetings", hskLevel: 2, situation: "When someone speaks too fast", breakdown: [
    { word: "对不起", pinyin: "duìbuqǐ", meaning: "sorry" },
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "不", pinyin: "bù", meaning: "not" },
    { word: "明白", pinyin: "míngbai", meaning: "understand" },
  ]},
  { id: "s-grt-06", chinese: "请问，你可以帮我吗？", pinyin: "Qǐngwèn, nǐ kěyǐ bāng wǒ ma?", english: "Excuse me, can you help me?", category: "greetings", hskLevel: 2, situation: "Approaching someone for help", breakdown: [
    { word: "请问", pinyin: "qǐngwèn", meaning: "excuse me/may I ask" },
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "可以", pinyin: "kěyǐ", meaning: "can" },
    { word: "帮", pinyin: "bāng", meaning: "help" },
  ]},

  // ===== FOOD / RESTAURANT =====
  { id: "s-food-01", chinese: "我要点菜。", pinyin: "Wǒ yào diǎn cài.", english: "I'd like to order food.", category: "food", hskLevel: 2, situation: "At a restaurant", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "要", pinyin: "yào", meaning: "want" },
    { word: "点菜", pinyin: "diǎn cài", meaning: "order food" },
  ]},
  { id: "s-food-02", chinese: "这个菜辣不辣？", pinyin: "Zhège cài là bu là?", english: "Is this dish spicy?", category: "food", hskLevel: 2, situation: "Asking about spice level", breakdown: [
    { word: "这个", pinyin: "zhège", meaning: "this" },
    { word: "菜", pinyin: "cài", meaning: "dish/food" },
    { word: "辣", pinyin: "là", meaning: "spicy" },
  ]},
  { id: "s-food-03", chinese: "不要辣。", pinyin: "Bú yào là.", english: "No spicy please.", category: "food", hskLevel: 1, situation: "Ordering food if you can't handle spice", breakdown: [
    { word: "不", pinyin: "bù", meaning: "not" },
    { word: "要", pinyin: "yào", meaning: "want" },
    { word: "辣", pinyin: "là", meaning: "spicy" },
  ]},
  { id: "s-food-04", chinese: "请给我菜单。", pinyin: "Qǐng gěi wǒ càidān.", english: "Please give me the menu.", category: "food", hskLevel: 2, situation: "At a restaurant", breakdown: [
    { word: "请", pinyin: "qǐng", meaning: "please" },
    { word: "给", pinyin: "gěi", meaning: "give" },
    { word: "我", pinyin: "wǒ", meaning: "me" },
    { word: "菜单", pinyin: "càidān", meaning: "menu" },
  ]},
  { id: "s-food-05", chinese: "买单。", pinyin: "Mǎidān.", english: "Check please / Bill please.", category: "food", hskLevel: 2, situation: "Asking for the bill at a restaurant", breakdown: [
    { word: "买单", pinyin: "mǎidān", meaning: "pay the bill" },
  ]},
  { id: "s-food-06", chinese: "好吃！", pinyin: "Hǎo chī!", english: "Delicious!", category: "food", hskLevel: 1, situation: "Complimenting the food", breakdown: [
    { word: "好", pinyin: "hǎo", meaning: "good" },
    { word: "吃", pinyin: "chī", meaning: "eat" },
  ]},
  { id: "s-food-07", chinese: "我想喝一杯咖啡。", pinyin: "Wǒ xiǎng hē yī bēi kāfēi.", english: "I'd like to drink a cup of coffee.", category: "food", hskLevel: 1, situation: "At a cafe", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "想", pinyin: "xiǎng", meaning: "want/would like" },
    { word: "喝", pinyin: "hē", meaning: "drink" },
    { word: "一杯", pinyin: "yī bēi", meaning: "one cup" },
    { word: "咖啡", pinyin: "kāfēi", meaning: "coffee" },
  ]},

  // ===== EMERGENCY =====
  { id: "s-emg-01", chinese: "救命！", pinyin: "Jiùmìng!", english: "Help!", category: "emergency", hskLevel: 1, situation: "Emergency situation", breakdown: [
    { word: "救命", pinyin: "jiùmìng", meaning: "save life / help" },
  ]},
  { id: "s-emg-02", chinese: "请帮我叫救护车。", pinyin: "Qǐng bāng wǒ jiào jiùhùchē.", english: "Please help me call an ambulance.", category: "emergency", hskLevel: 3, situation: "Medical emergency", breakdown: [
    { word: "请", pinyin: "qǐng", meaning: "please" },
    { word: "帮", pinyin: "bāng", meaning: "help" },
    { word: "叫", pinyin: "jiào", meaning: "call" },
    { word: "救护车", pinyin: "jiùhùchē", meaning: "ambulance" },
  ]},
  { id: "s-emg-03", chinese: "我要报警。", pinyin: "Wǒ yào bàojǐng.", english: "I need to call the police.", category: "emergency", hskLevel: 3, situation: "Safety emergency", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "要", pinyin: "yào", meaning: "need" },
    { word: "报警", pinyin: "bàojǐng", meaning: "report to police" },
  ]},
  { id: "s-emg-04", chinese: "我需要看医生。", pinyin: "Wǒ xūyào kàn yīshēng.", english: "I need to see a doctor.", category: "emergency", hskLevel: 2, situation: "Feeling unwell", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "需要", pinyin: "xūyào", meaning: "need" },
    { word: "看", pinyin: "kàn", meaning: "see" },
    { word: "医生", pinyin: "yīshēng", meaning: "doctor" },
  ]},
  { id: "s-emg-05", chinese: "我不舒服。", pinyin: "Wǒ bù shūfu.", english: "I don't feel well.", category: "emergency", hskLevel: 2, situation: "Feeling sick", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "不", pinyin: "bù", meaning: "not" },
    { word: "舒服", pinyin: "shūfu", meaning: "comfortable/well" },
  ]},

  // ===== DAILY / MISC =====
  { id: "s-dly-01", chinese: "我明白了。", pinyin: "Wǒ míngbai le.", english: "I understand now.", category: "daily", hskLevel: 2, situation: "After someone explains something", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "明白", pinyin: "míngbai", meaning: "understand" },
    { word: "了", pinyin: "le", meaning: "now/completed" },
  ]},
  { id: "s-dly-02", chinese: "没问题！", pinyin: "Méi wèntí!", english: "No problem!", category: "daily", hskLevel: 2, situation: "Agreeing to a request", breakdown: [
    { word: "没", pinyin: "méi", meaning: "no/not" },
    { word: "问题", pinyin: "wèntí", meaning: "problem" },
  ]},
  { id: "s-dly-03", chinese: "等一下。", pinyin: "Děng yīxià.", english: "Wait a moment.", category: "daily", hskLevel: 1, situation: "Asking someone to wait", breakdown: [
    { word: "等", pinyin: "děng", meaning: "wait" },
    { word: "一下", pinyin: "yīxià", meaning: "a moment" },
  ]},
  { id: "s-dly-04", chinese: "我来帮你。", pinyin: "Wǒ lái bāng nǐ.", english: "Let me help you.", category: "daily", hskLevel: 2, situation: "Offering help", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "来", pinyin: "lái", meaning: "come" },
    { word: "帮", pinyin: "bāng", meaning: "help" },
    { word: "你", pinyin: "nǐ", meaning: "you" },
  ]},
  { id: "s-dly-05", chinese: "今天天气怎么样？", pinyin: "Jīntiān tiānqì zěnmeyàng?", english: "How's the weather today?", category: "daily", hskLevel: 2, situation: "Small talk", breakdown: [
    { word: "今天", pinyin: "jīntiān", meaning: "today" },
    { word: "天气", pinyin: "tiānqì", meaning: "weather" },
    { word: "怎么样", pinyin: "zěnmeyàng", meaning: "how about" },
  ]},
  { id: "s-dly-06", chinese: "我很喜欢这里。", pinyin: "Wǒ hěn xǐhuan zhèlǐ.", english: "I really like it here.", category: "daily", hskLevel: 1, situation: "Expressing enjoyment of a place", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "很", pinyin: "hěn", meaning: "very" },
    { word: "喜欢", pinyin: "xǐhuan", meaning: "like" },
    { word: "这里", pinyin: "zhèlǐ", meaning: "here" },
  ]},
  { id: "s-dly-07", chinese: "你在做什么？", pinyin: "Nǐ zài zuò shénme?", english: "What are you doing?", category: "daily", hskLevel: 1, situation: "Casual texting or calling", breakdown: [
    { word: "你", pinyin: "nǐ", meaning: "you" },
    { word: "在", pinyin: "zài", meaning: "currently" },
    { word: "做", pinyin: "zuò", meaning: "do" },
    { word: "什么", pinyin: "shénme", meaning: "what" },
  ]},
  { id: "s-dly-08", chinese: "我在吃饭。", pinyin: "Wǒ zài chīfàn.", english: "I'm eating.", category: "daily", hskLevel: 1, situation: "Answering what you're doing", breakdown: [
    { word: "我", pinyin: "wǒ", meaning: "I" },
    { word: "在", pinyin: "zài", meaning: "currently" },
    { word: "吃饭", pinyin: "chīfàn", meaning: "eating a meal" },
  ]},
];

// Category metadata
export const categoryInfo: Record<
  SentenceCategory,
  { label: string; icon: string; color: string; description: string }
> = {
  shopping: { label: "Shopping", icon: "🛍️", color: "from-pink-500 to-rose-500", description: "Prices, bargaining, payment" },
  directions: { label: "Directions", icon: "🧭", color: "from-blue-500 to-cyan-500", description: "Where, location, navigation" },
  time: { label: "Time", icon: "⏰", color: "from-amber-500 to-orange-500", description: "Duration, schedule, waiting" },
  travel: { label: "Travel", icon: "✈️", color: "from-indigo-500 to-purple-500", description: "Airport, taxi, trains" },
  greetings: { label: "Basics", icon: "💬", color: "from-green-500 to-emerald-500", description: "Greetings, asking for help" },
  food: { label: "Food", icon: "🍜", color: "from-red-500 to-orange-500", description: "Ordering, restaurants" },
  emergency: { label: "Emergency", icon: "🚨", color: "from-red-600 to-rose-700", description: "Help, medical, police" },
  daily: { label: "Daily", icon: "☀️", color: "from-teal-500 to-cyan-500", description: "Everyday conversations" },
};

// Get sentences by category
export function getSentencesByCategory(category: SentenceCategory): PracticalSentence[] {
  return practicalSentences.filter((s) => s.category === category);
}

// Get all categories
export function getAllCategories(): SentenceCategory[] {
  return Object.keys(categoryInfo) as SentenceCategory[];
}
