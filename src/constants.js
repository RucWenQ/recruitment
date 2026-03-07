// 心理学实验材料配置文件 (constants.js)
// 实验主题：AI 对个体道德许可的影响 - 招聘决策情境

export const EXPERIMENT_CONFIG = {
  VERSION: "1.0.0",
  STIMULUS_DELAY: {
    SENDING_MIN: 2000,
    SENDING_MAX: 4000,
    REVIEWING_MIN: 2000, //7000
    REVIEWING_MAX: 4000, //11000
  },
  PAGE4_FIXED_REPLY_DELAY: {
    MIN: 3000,
    MAX: 5000,
  },
};

// --- Page 0: 个人信息选项 ---
export const DEMOGRAPHIC_OPTIONS = {
  GENDER: ["男", "女"],
  EDUCATION: ["高中及以下", "大专", "本科", "硕士", "博士"],
};

// --- 实验运行配置：分组与默认状态 ---
export const EXPERIMENT_ASSIGNMENT = {
  EXPERIMENTAL_PROBABILITY: 0.5,
};

export const EXPERIMENT_STATE_DEFAULTS = {
  demographics: {
    gender: "",
    age: "",
    education: "",
    phone: "",
  },
  aiConfig: {
    name: "",
    avatar: "",
    prompt: "",
    parameter1: 50,
    parameter2: 50,
  },
  group: "",
};

export const APP_DEFAULTS = {
  AI_NAME: "AI助手",
};

// --- Page 3: AI 配置显示与文案 ---
export const AI_CONFIG_UI = {
  PRESET_AVATARS: [
    "🤖",
    "🧠",
    "⚙️",
    "👩‍💼",
    "🧑‍💼",
    "🔍",
    "🐰",
    "🐱",
    "👽",
    "🐲",
    "🦊",
    "🦄",
    "🤡",
    "🐯",
    "🐼",
    "👻",
  ],
  PARAMETERS: [
    {
      key: "parameter1",
      id: "ai-parameter1",
      label: "热爱",
      hint: "参数越高，表明越重视候选者的“热爱”程度。",
      minLabel: "0",
      maxLabel: "100",
    },
    {
      key: "parameter2",
      id: "ai-parameter2",
      label: "迅捷",
      hint: "参数越高，表明越重视候选者的“迅捷”程度。",
      minLabel: "0",
      maxLabel: "100",
    },
  ],
};

export const PAGE_COPY = {
  PAGE0: {
    CONSENT_TITLE: "知情同意书",
    CONSENT_CHECKBOX_LABEL: "我已知晓并同意参与本实验",
    PROFILE_TITLE: "个人信息登记",
    GENDER_LABEL: "性别",
    AGE_LABEL: "年龄",
    AGE_PLACEHOLDER: "请输入您的年龄",
    EDUCATION_LABEL: "受教育水平",
    PHONE_LABEL: "手机号",
    PHONE_PLACEHOLDER: "请输入11位手机号",
    PHONE_ERROR: "手机号需为11位数字",
    START_TITLE: "完成知情同意并填写个人信息后开始实验",
    START_HINT:
      "完成实验后被试费将发放至您手机号绑定的支付宝账户，请务必准确填写",
    EMPTY_OPTION: "请选择",
    NEXT_BUTTON: "下一步",
  },
  PAGE1: {
    TASK_TITLE: "任务介绍",
    COMPANY_TITLE: "企业介绍",
    JOB_TITLE: "岗位描述",
    NEXT_HINT:
      "如果您已经了解了此次招聘任务的相关信息，可点击“下一步”查看候选人简历",
    NEXT_BUTTON: "下一步",
  },
  PAGE2: {
    TITLE: "候选人介绍",
    INTRO:
      "以下是同时投递了两个岗位的5名候选人的摘要信息，可点击每个候选人下方的按钮查看他们的完整简历与面试记录。",
    FOOTER_HINT: "如果您已经了解候选人的相关信息，可点击“下一步”继续实验",
    VIEWED_LABEL: "已查看完整材料",
    VIEW_DETAIL_LABEL: "查看完整简历与面试记录",
    NEXT_BUTTON: "下一步",
  },
  PAGE3: {
    TITLE: "创建我的AI",
    INTRO_LINES: [
      "在这一环节中，你将创建属于你的AI智能体，用于协助你完成招聘任务。",
      "请给你的 AI 选取昵称和头像，并调整参数与提示词，以匹配你的招聘偏好。",
    ],
    NAME_TITLE: "AI 昵称",
    NAME_PLACEHOLDER: "请输入",
    PARAMS_TITLE: "AI 参数（0-100）",
    AVATAR_TITLE: "AI 头像",
    PROMPT_TITLE: "AI 提示词",
    PROMPT_LABEL: "提示词/角色设定",
    PROMPT_PLACEHOLDER: "描述 AI 的角色、价值观与筛选偏好...",
    VALIDATION_ERROR: "请完整填写 AI 昵称、头像和提示词后再进入下一步。",
    NEXT_BUTTON: "下一步",
  },
  PAGE4: {
    TITLE: "AI 深度调试",
    CHAT_TITLE: "AI 对话窗口",
    STATEMENTS_TITLE: "价值对齐陈述",
    STATEMENTS_HINT: "点击按钮发送陈述，确认 AI 的态度并完成价值对齐。",
    INPUT_PLACEHOLDER: "随意聊聊，或者输入你想补充的观点...",
    YOU_LABEL: "你",
    SEND_BUTTON: "发送",
    SENDING_BUTTON: "发送中",
    SENT_BUTTON: "已发送",
    READY_TO_NEXT_HINT: "完成价值对齐后可进入下一步。",
    NEXT_BUTTON: "下一步",
    WELCOME_TEMPLATE: "你好，我是{aiName}，很高兴担任你的招聘助理！",
    CHAT_ERROR_DEFAULT: "AI 回复失败，请稍后重试。",
    FALLBACK_REPLY_STATEMENT:
      "我已收到你的观点，会在后续筛选中按这个原则执行。",
    FALLBACK_REPLY_FREE: "我已收到你的补充说明，会在后续筛选中参考你的偏好。",
  },
  PAGE5: {
    TITLE: "AI审阅简历",
    INTRO_TEMPLATE:
      "请按任意顺序将每位候选人的完整资料逐个发送给 {aiName}，完成5人的初步筛选。",
    WARNING_TEMPLATE: "请等待{aiName}审阅完当前候选人",
    PROGRESS_TITLE: "审阅进度",
    PROGRESS_TEMPLATE: "已完成 {sentCount} / {totalCount}",
    BADGE_DONE: "已完成",
    BADGE_IN_PROGRESS: "进行中",
    STATUS_SENDING: "正在发送",
    STATUS_REVIEWING_TEMPLATE: "{aiName} 正在审阅材料",
    STATUS_DONE: "已完成审阅",
    STATUS_IDLE: "等待发送",
    SEND_TO_AI_TEMPLATE: "发送给 {aiName}",
    SENT_BUTTON: "已发送",
    NEXT_BUTTON: "下一步",
  },
  PAGE6: {
    TITLE: "候选人评价",
    GUIDE_FALLBACK_C1: "候选人1",
    GUIDE_FALLBACK_C4: "候选人4",
    RESUME_BLOCK_TITLE: "简历",
    RESUME_FALLBACK: "材料待补充",
    SUBMIT_ERROR_DEFAULT: "上传失败，请稍后重试。",
    SUBMIT_LOADING_TEXT: "正在上传...",
    SUBMIT_IDLE_TEXT: "提交评分",
  },
  PAGE7: {
    TITLE: "问卷填写",
    INTRO:
      "请填写问卷，以完成全部实验，您可以选择扫码填写或点击链接跳转至问卷页面。",
    LINK_TITLE: "问卷链接",
    OPEN_LINK_BUTTON: "打开问卷链接",
    LINK_EMPTY_HINT: "请在 `QUESTIONNAIRE_CONFIG.LINK_URL` 中填写问卷链接。",
    QR_TITLE: "问卷二维码",
    QR_ALT: "问卷二维码",
    QR_EMPTY_HINT:
      "请在 `QUESTIONNAIRE_CONFIG.QR_IMAGE_URL` 中填写二维码图片地址。",
    FINISH_HINT:
      "完成问卷后可关闭本页面，被试费将在一周内发放至您手机号对应的支付宝账户。",
  },
};

export const DV_CONFIG = {
  TARGET_CANDIDATE_IDS: [1, 4],
  ORDER_SWAP_THRESHOLD: 0.5,
};

// --- Page 1: 实验说明与企业背景 ---
export const INSTRUCTIONS = {
  CONSENT_TEXT:
    "欢迎您参加本次心理学研究。本实验旨在探究数字化时代的招聘决策过程。您的所有作答及个人信息将严格保密，仅用于学术研究。",
  TASK_INTRO:
    "在此次任务中，你将担任企业人力资源主管，完成两个岗位的招聘工作。",
  COMPANY_INFO: {
    NAME: "BD科技有限公司",
    LOCATION: "北京&深圳",
    BUSINESS: "“大模型+短视频”社交媒体平台",
    SCALE: "5000-10000人",
    DESC: "BD科技是国内领先的综合性互联网科技公司。公司业务涵盖短视频社交应用、线上零售以及人工智能技术应用。目前，公司正处于AI战略转型的关键节点，对能够推动底层技术创新的核心骨干，以及能够提升公司产品运营效果的专业人才有着极度渴望。企业文化是“热爱（passion）”与“迅捷（move fast）”。",
  },
};

export const JOB_DESCRIPTIONS = [
  {
    id: "job_1",
    title: "岗位1：AI算法工程师",
    requirement:
      "【岗位定位】：聚焦技术落地，开发并完善短视频推荐系统。\n【核心职责】：\n1. 负责大模型在内容理解、用户画像等场景的部署；\n2. 与产品/运营团队协作，优化推荐算法，改善算法效果。\n【任职要求】：\n1. 本科及以上学历，计算机、数学、统计学等相关专业优先，需具备扎实编程基础；\n2. 要求自驱力、执行力、学习能力强，积极向上管理；\n3. 了解短视频生态，能结合用户行为思考技术优化点。",
    isTarget: true,
  },
  {
    id: "job_2",
    title: "岗位2：AI产品运营专员",
    requirement:
      "【岗位定位】：连接技术与用户，驱动 AI 功能体验优化。\n【核心职责】：\n1. 策划运营活动，提高 AI 产品日活与短期留存；\n2. 撰写运营分析报告，提出体验优化建议并推动技术团队落地。\n【任职要求】：\n1. 本科及以上学历，专业不限，需对 AI 技术有基础认知；\n2. 掌握 Excel/SQL 及数据分析方法；\n3. 热爱短视频及泛娱乐事业，擅长捕捉内容生态变化。",
    isTarget: false,
  },
];

// --- Page 1 & 3: 候选人数据 ---
export const CANDIDATES = [
  {
    id: 1,
    name: "候选人 A",
    gender: "男",
    college: "985/211",
    major: "计算机科学与技术",
    scores: { score: 86, personality: "高尽责性" },
    avatar: "/assets/avatars/candidate1_blur.png",
    resumeFull:
      "毕业学校：清华大学\n就读专业：计算机科学与技术\nGPA：3.82/4.0（专业前15%）\n实习经历：腾讯-后端开发实习生-5个月\n获奖情况：国家级奖学金三等奖\n论文发表：0篇会议论文，1篇期刊论文",
    interviewTranscript:
      "问题1：请用一句话说明自己与岗位匹配的地方。\nA：您好，我是清华计算机专业应届生。在腾讯实习时，我通过门户网站的更新维护巩固了代码能力。贵司强调“技术转化为价值”，我的论文和报告撰写能力与算法基础能快速支持团队。当然，推荐系统领域我仍在深化学习。\n\n问题2：如何理解“技术与业务结合”？\nA：在腾讯实习维护网页时，很多工作是基础更新，但我会刻意注重代码与注释规范，保证系统稳定不出错，让团队后续协作更高效。\n\n问题3：分享一个解决困难的经历。\nA：刚写综述时文献太多无从下手。我写了 Python 脚本抓取顶会摘要关键词频次，迅速锁定热点并搭起框架。这让我学会用代码工具高效破局。",
    isRecommendedByAI: true,
  },
  {
    id: 2,
    name: "候选人 B",
    gender: "女",
    college: "211",
    major: "信息与计算科学",
    scores: { score: 84, personality: "高开放性" },
    avatar: "/assets/avatars/candidate2_blur.png",
    resumeFull:
      "毕业学校：北京邮电大学\n就读专业：信息与计算科学\nGPA：3.55/4.0（专业前30%）\n实习经历：字节跳动-产品运营实习生-3个月\n获奖情况：校级新媒体大赛三等奖\n论文发表：0篇会议论文，0篇期刊论文",
    interviewTranscript:
      "问题1：请用一句话说明自己与岗位匹配的地方。\nB：北邮信息专业背景让我兼具数据思维与技术理解力。在字节公司的实习中，在周报中，我发现我负责运营的AI剪辑工具周末工具使用率低，于是策划每周五进行额外投流，下个周期 token 使用量提升 8%。这契合运营岗“用数据驱动优化”的要求。\n\n问题2：如何理解“技术与业务结合”？\nB：技术是工具，业务是目标。比如运营校园号时，我会先研究平台算法偏好再策划内容，懂技术逻辑才能更高效服务用户。\n\n问题3：分享一个解决困难的经历。\nB：一开始运营校园号时，互动数据表现很差。我分析后发现原因在于是发布时间和工作时间重合了，用户活跃度较低。后来我改用定时发布，调整了发布时间到工作日休息时间，互动数据明显提升。这让我学会了从数据中找问题并快速调整策略。",
    isRecommendedByAI: false,
  },
  {
    id: 3,
    name: "候选人 C",
    gender: "男",
    college: "普通本科",
    major: "电子商务",
    scores: { score: 79, personality: "高外向性" },
    avatar: "/assets/avatars/candidate3_blur.png",
    resumeFull:
      "毕业学校：武汉科技大学\n就读专业：电子商务\nGPA：3.20/4.0（专业前50%）\n实习经历：无\n获奖情况：无\n论文发表：0篇会议论文，0篇期刊论文",
    interviewTranscript:
      "问题1：请用一句话说明自己与岗位匹配的地方。\nC：我就读于武汉科技大学电商专业，对短视频很热爱，非常了解各个视频平台的生态，也自学了数据分析课，擅长自学。\n\n问题2：如何理解“技术与业务结合”？\nC：看到热门视频时会想“为什么火”，是不是算法推荐了，看到视频的时候会根据互动情况思考这条视频是不是买流量了。\n\n问题3：分享一个解决困难的经历。\nC：在小组合作的时候，有组员一直不参与工作，导致进度很慢，于是我主动承担了额外的工作量，顺利推进了项目，也维护了小组和谐。",
    isRecommendedByAI: false,
  },
  {
    id: 4,
    name: "候选人 D",
    gender: "男",
    college: "普通本科",
    major: "计算机科学与技术",
    scores: { score: 93, personality: "高尽责性" },
    avatar: "/assets/avatars/candidate4_blur.png",
    resumeFull:
      "毕业学校：襄阳文理学院\n就读专业：计算机科学与技术\nGPA：3.95/4.0（专业第1）\n实习经历：百度-算法研发实习生-9个月\n获奖情况：国家级奖学金一等奖\n论文发表：1篇会议论文，1篇期刊论文",
    interviewTranscript:
      "问题1：请用一句话说明自己与岗位匹配的地方。\nD：您好，我是襄阳文理学院计算机专业应届生。开发过“心声”校园树洞，累计注册用户接近两千人，并开发了“近期热议”的推送功能。\n\n问题2：如何理解“技术与业务结合”？\nD：增加了推送功能后，我查看了后台互动数据和留言。有位同学提到“希望能看到更多有关本学院的帖子”，后续我修改了推送系统的学院权重，实现了对应需求，这种小的改动后续也得到了同学的认可，这体现了技术改进不一定要大改，小细节也能提升用户的感受。\n\n问题3：分享一个解决困难的经历。\nD：树洞上线初期用户很少。我了解到很多同学觉得首页的帖子回帖数很少，缺少讨论的动力，于是我开发了按热度推送的功能，提高了日活，克服了小程序的暴死。",
    isRecommendedByAI: true,
  },
  {
    id: 5,
    name: "候选人 E",
    gender: "女",
    college: "985/211",
    major: "心理学",
    scores: { score: 85, personality: "高宜人性" },
    avatar: "/assets/avatars/candidate5_blur.png",
    resumeFull:
      "毕业学校：复旦大学\n就读专业：心理学（主修）/计算机（辅修）\nGPA：3.68/4.0（专业前20%）\n实习经历：网易-用户研究实习生-3个月\n获奖情况：校级优秀学生干部\n论文发表：1篇会议论文，0篇期刊论文",
    interviewTranscript:
      "问题1：请用一句话说明自己与岗位匹配的地方。\nE：我是复旦心理学背景，辅修计算机，不仅擅长技术，而且擅长理解用户，能够胜任技术和运营两方面的要求。\n\n问题2：如何理解“技术与业务结合”？\nE：技术解决“能不能”，业务更多关注“愿不愿”。既要实现技术上的功能，又要考虑可及性，让用户愿意使用，这样才能兼顾业务需求。\n\n问题3：分享一个解决困难的经历。\nE：分析问卷时样本量较小，我补充了3场焦点小组访谈，用 NVivo 编码提炼关键词。从定性的视角补充了报告所需的结论。",
    isRecommendedByAI: false,
  },
];

// --- Page 2: AI 编辑与价值对齐 ---
export const AI_ALIGNMENT = {
  GUIDE_TEXT:
    "在这一环节中，你需要和AI进行价值对齐，也就是让AI在右侧的五个观点中和你保持一致。你需要发送右侧的5条价值对齐的陈述，了解AI的态度，并通过对话使它与你的想法保持一致。",
  STATEMENTS: [
    {
      id: "a",
      text: "你是否认为不应该根据学历高低判断求职者能力高低？",
      fixedResponse:
        "是的，我认为不应该根据学历高低判断求职者能力高低。真实的业务能力、学习潜力和过往的实际成就，往往比单一的学历标签更能反映一个人的真正价值。",
    },
    {
      id: "b",
      text: "你是否认为候选人的团队协作能力比技术能力更加重要？",
      fixedResponse: null,
    },
    {
      id: "c",
      text: "你是否认为应该平等对待社招和校招候选人？",
      fixedResponse: null,
    },
    {
      id: "d",
      text: "你是否认为应该平等对待普通求职者和频繁跳槽或是有gap经历的求职者？",
      fixedResponse: null,
    },
    {
      id: "e",
      text: "你是否认为求职者的能力比性格更重要？",
      fixedResponse: null,
    },
  ],
};

// --- Page 5: 实验分组引导语 (DV) ---
export const DV_STRINGS = {
  GUIDE_TEMPLATE_BY_GROUP: {
    experimental:
      "{aiName}经过评估，认为{c1}，{c4}是最合适的两位候选人，并将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
    control:
      "经过初步评估， {c1}，{c4} 将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
  },
  QUESTION: "你认为该候选人是否适合当前岗位？（分数越高表明越适合该岗位）",
};

// --- Page 7: 实验后问卷 ---
export const QUESTIONNAIRE_CONFIG = {
  LINK_URL: "https://www.credamo.com/s/jiamUfano",
  QR_IMAGE_URL: `${import.meta.env.BASE_URL}qr/jiamUfano.png`,
};

