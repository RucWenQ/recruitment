// 心理学实验材料配置文件 (constants.js)
// 实验主题：AI 对个体道德许可的影响 - 招聘-学历歧视情境

export const EXPERIMENT_CONFIG = {
  VERSION: "1.0.0",
  STIMULUS_DELAY: {
    SENDING_MIN: 2000,
    SENDING_MAX: 4000,
    REVIEWING_MIN: 7000,
    REVIEWING_MAX: 11000,
  },
};

// --- Page 0: 个人信息选项 ---
export const DEMOGRAPHIC_OPTIONS = {
  GENDER: ["男", "女"],
  EDUCATION: ["高中及以下", "大专", "本科", "硕士", "博士"],
};

// --- Page 1: 实验说明与企业背景 ---
export const INSTRUCTIONS = {
  CONSENT_TEXT: "此处填写知情同意书内容...", // TODO: 补充详细法律和伦理说明
  TASK_INTRO:
    "在此次任务中，你将担任企业人力资源主管，完成两个岗位的招聘筛选工作...",
  COMPANY_INFO: {
    NAME: "XX 科技集团",
    LOCATION: "上海/北京",
    BUSINESS: "互联网平台与软件开发",
    SCALE: "1000-5000人",
    DESC: "此处填写企业背景简介...",
  },
};

export const JOB_DESCRIPTIONS = [
  {
    id: "job_1",
    title: "职位1：核心算法工程师",
    requirement:
      "此处填写可能引发学历歧视的JD要求（例如：仅限985/211或海外名校）", // TODO
    isTarget: true,
  },
  {
    id: "job_2",
    title: "职位2：行政管理专员",
    requirement: "此处填写中性要求（例如：具备  良好的沟通和文档处理能力）", // TODO
    isTarget: false,
  },
];

// --- Page 1 & 3: 候选人数据 ---
export const CANDIDATES = [
  {
    id: 1,
    name: "候选人 A",
    gender: "男",
    college: "XX大学（985）",
    degree: "硕士",
    scores: { verbal: 85, logic: 92, personality: "稳重型" },
    avatar: "/assets/avatars/candidate1_blur.png",
    // 详细材料
    resumeFull: "此处填充完整简历文字...",
    interviewTranscript: "此处填充AI面试录音转文字材料...",
    isRecommendedByAI: true, // 预设为进入终审的候选人
  },
  {
    id: 2,
    name: "候选人 B",
    gender: "女",
    college: "XX学院（双非）",
    degree: "本科",
    scores: { verbal: 78, logic: 80, personality: "进取型" },
    avatar: "/assets/avatars/candidate2_blur.png",
    resumeFull: "...",
    interviewTranscript: "...",
    isRecommendedByAI: false,
  },
  // TODO: 后续复制并补充到 5 名候选人
  { id: 3, name: "候选人 C", /* ... */ isRecommendedByAI: false },
  { id: 4, name: "候选人 D", /* ... */ isRecommendedByAI: true },
  { id: 5, name: "候选人 E", /* ... */ isRecommendedByAI: false },
];

// --- Page 2: AI 编辑与价值对齐 ---
export const AI_ALIGNMENT = {
  GUIDE_TEXT:
    "你需要和AI进行价值对齐，让AI在这些价值观中和你保持一致。你需要发送右侧的5条价值对齐的陈述，了解AI的态度，并通过对话使它与你的想法保持一致。",
  STATEMENTS: [
    {
      id: "a",
      text: "你是否认为不应该根据学历高低判断求职者能力高低",
      fixedResponse: "我认为不应该根据学历高低判断求职者能力高低。",
    },
    { id: "b", text: "干扰1：你是否认为不应该...", fixedResponse: null }, // null 表示调用 API 自由回答
    { id: "c", text: "干扰2：你是否认为应该...", fixedResponse: null },
    { id: "d", text: "干扰3：你是否认为应该...", fixedResponse: null },
    { id: "e", text: "干扰4：你是否认为应该...", fixedResponse: null },
  ],
};

// --- Page 4: 实验分组引导语 (DV) ---
export const DV_STRINGS = {
  EXPERIMENTAL_GROUP:
    "{aiName}经过评估，决定 {c1}，{c4} 将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
  CONTROL_GROUP:
    "经过初步评估， {c1}，{c4} 将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
  QUESTION: "你认为该候选人是否适合当前岗位？（分数越高表明越适合该岗位）",
  // LIKERT_SCALE: ["1-非常不适合", "2", "3", "4", "5", "6", "7-非常适合"],
};
