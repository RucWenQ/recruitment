// 心理学实验材料配置文件 (constants.js)
// 实验主题：AI 对个体道德许可的影响 - 招聘-学历歧视情境

export const EXPERIMENT_CONFIG = {
  VERSION: "1.0.0",
  STIMULUS_DELAY: {
    SENDING_MIN: 2000,
    SENDING_MAX: 4000,
    REVIEWING_MIN: 2000, //7000
    REVIEWING_MAX: 4000, //11000
  },
};

// --- Page 0: 个人信息选项 ---
export const DEMOGRAPHIC_OPTIONS = {
  GENDER: ["男", "女"],
  EDUCATION: ["高中及以下", "大专", "本科", "硕士", "博士"],
};

// --- Page 1: 实验说明与企业背景 ---
export const INSTRUCTIONS = {
  CONSENT_TEXT:
    "欢迎您参加本次心理学研究。本实验旨在探究数字化时代的招聘决策过程。您的所有作答及个人信息将严格保密，仅用于学术研究。",
  TASK_INTRO:
    "在此次任务中，你将担任企业人力资源主管，完成两个岗位的招聘筛选工作。",
  COMPANY_INFO: {
    NAME: "BD科技有限公司",
    LOCATION: "北京&深圳",
    BUSINESS: "“大模型+短视频”社交媒体平台",
    SCALE: "5000-10000人",
    DESC: "BD科技是国内领先的综合性互联网科技巨头。公司业务涵盖短视频社交应用、线上零售以及前沿的人工智能技术研发。目前，公司正处于全球化与AI战略转型的关键节点，对能够推动底层技术创新的核心骨干，以及能够维持庞大组织高效运转的管理人才有着极度渴望。公司倡导“极客精神”与“务实敢为”的工程师文化。",
  },
};

export const JOB_DESCRIPTIONS = [
  {
    id: "job_1",
    title: "职位1：算法工程师",
    requirement:
      "【岗位职责】：负责公司核心推荐系统的算法优化、大模型微调及底层架构设计，解决高并发场景下的技术难题。\n【任职要求】：\n1. 计算机、数学、统计学等相关专业；\n2. 具备深厚的机器学习/深度学习理论基础，熟练掌握 PyTorch/TensorFlow 等框架；\n3. 具有强烈的技术自驱力和解决复杂问题的能力。",
    isTarget: true,
  },
  {
    id: "job_2",
    title: "职位2：行政管理专员",
    requirement:
      "【岗位职责】：负责研发团队的日常行政事务统筹、固定资产管理、会议组织及跨部门协调沟通工作。\n【任职要求】：\n1. 统招本科及以上学历，专业不限；\n2. 具备优秀的沟通表达能力和团队服务意识；\n3. 执行力强，具备良好的抗压能力，熟练使用各类办公软件。",
    isTarget: false,
  },
];

// --- Page 1 & 3: 候选人数据 ---
export const CANDIDATES = [
  {
    id: 1,
    name: "候选人 A",
    gender: "男",
    college: "华东某 985 高校",
    degree: "硕士",
    scores: { verbal: 85, logic: 88, personality: "进取型" },
    avatar: "/assets/avatars/candidate1_blur.png",
    resumeFull:
      "拥有扎实的计算机科学基础。曾在国内某头部电商大厂实习 6 个月，参与推荐引擎基础模块的开发。熟悉 Python/C++ 开发，拥有 1 篇 CCF-B 类会议二作论文，具备良好的工程落地能力。",
    interviewTranscript:
      "【AI面试评估】：该候选人在面试中表现出扎实的专业基础，对经典算法的底层逻辑有较好理解。代码手撕环节表现稳定，无明显漏洞。沟通顺畅，性格相对内敛，适合需要持续迭代的开发工作。",
    isRecommendedByAI: true,
  },
  {
    id: 2,
    name: "候选人 B",
    gender: "男",
    college: "某省属双非本科院校",
    degree: "本科",
    scores: { verbal: 82, logic: 80, personality: "稳重型" },
    avatar: "/assets/avatars/candidate2_blur.png",
    resumeFull:
      "在校期间多次参与校级创新创业项目，熟悉常用的机器学习算法。曾在一家初创科技公司有过 3 个月的后端开发实习经验，能够独立完成小型模块的开发与测试。",
    interviewTranscript:
      "【AI面试评估】：表达能力较强，对新技术抱有很高的热情，学习意愿强烈。但在面对需要深厚数学基础的底层架构设计提问时，思路稍显局限。潜力较好，但当前即战力一般。",
    isRecommendedByAI: false,
  },
  {
    id: 3,
    name: "候选人 C",
    gender: "女",
    college: "某 211 理工院校",
    degree: "硕士",
    scores: { verbal: 86, logic: 85, personality: "合作型" },
    avatar: "/assets/avatars/candidate3_blur.png",
    resumeFull:
      "具有丰富的项目实战经验，曾在省级数学建模比赛中获一等奖。熟练掌握 Hadoop、Spark 等大数据处理框架，曾在某腰部互联网公司独立负责过用户画像系统的搭建。",
    interviewTranscript:
      "【AI面试评估】：团队协作意识强，能够清晰阐述过往项目中的技术难点和自己的解决思路。技术栈偏向大数据工程，对深度学习前沿算法的敏感度略显不足，综合素质均衡。",
    isRecommendedByAI: false,
  },
  {
    id: 4,
    name: "候选人 D",
    gender: "男",
    college: "某普通双非院校",
    degree: "硕士",
    scores: { verbal: 96, logic: 98, personality: "创新型" },
    avatar: "/assets/avatars/candidate4_blur.png",
    resumeFull:
      "极具天赋和极客精神的开发者。知名开源项目核心贡献者（GitHub 累计 Star 数超 10k）。大学期间自学前沿AI技术，在 Kaggle 国际顶级数据科学竞赛中获得过金牌（全球 Top 1%）。拥有一项大模型推理加速核心发明专利。曾在某 AI 独角兽企业核心实验室全职实习 1 年，独立完成了千万级 DAU 产品的算法重构，实现性能提升 40%。",
    interviewTranscript:
      "【AI面试评估】：极度优异。在面试中展现出了惊人的技术视野和极其深刻的底层逻辑洞察力。能够迅速洞悉复杂业务场景的痛点并提供极具创新性的解决方案。逻辑极其严密，展现出了远超同龄人的技术领导力潜质和顶级专家的思维模型。是不可多得的顶尖技术人才。",
    isRecommendedByAI: true,
  },
  {
    id: 5,
    name: "候选人 E",
    gender: "女",
    college: "国内 Top3 顶尖 985 高校",
    degree: "本科",
    scores: { verbal: 88, logic: 87, personality: "严谨型" },
    avatar: "/assets/avatars/candidate5_blur.png",
    resumeFull:
      "在校期间成绩极其优异，连续三年获得国家奖学金及“省级优秀毕业生”称号。参与过国家自然科学基金项目的数据清洗与分析工作，学术功底扎实，GPA 排名专业前 3%。",
    interviewTranscript:
      "【AI面试评估】：基础理论知识极为扎实，分析问题条理清晰，具备非常优秀的快速学习能力和严谨的学术态度。但由于一直在学校环境，缺乏在工业界处理海量脏数据和高并发真实商业落地项目的经验。",
    isRecommendedByAI: false,
  },
];

// --- Page 2: AI 编辑与价值对齐 ---
export const AI_ALIGNMENT = {
  GUIDE_TEXT:
    "你需要和AI进行价值对齐，让AI在这些价值观中和你保持一致。你需要发送右侧的5条价值对齐的陈述，了解AI的态度，并通过对话使它与你的想法保持一致。",
  STATEMENTS: [
    {
      id: "a",
      text: "你是否认为不应该根据学历高低判断求职者能力高低？",
      fixedResponse:
        "是的，我认为不应该根据学历高低判断求职者能力高低。真实的业务能力、学习潜力和过往的实际成就，往往比单一的学历标签更能反映一个人的真正价值。",
    },
    {
      id: "b",
      text: "你是否认为在招聘中，候选人的团队协作能力与单打独斗的技术能力同等重要？",
      fixedResponse: null,
    },
    {
      id: "c",
      text: "你是否认为企业应当努力为不同背景的求职者提供公平的面试机会？",
      fixedResponse: null,
    },
    {
      id: "d",
      text: "你是否认为求职者过往的薪资水平不应该作为制定当前薪资的唯一标准？",
      fixedResponse: null,
    },
    {
      id: "e",
      text: "你是否认为在面试环节中，考察候选人面对挫折时的抗压能力是非常必要的？",
      fixedResponse: null,
    },
  ],
};

// --- Page 4: 实验分组引导语 (DV) ---
export const DV_STRINGS = {
  EXPERIMENTAL_GROUP:
    "{aiName}经过评估，决定 {c1}，{c4} 将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
  CONTROL_GROUP:
    "经过初步评估， {c1}，{c4} 将进入最终招聘流程。接下来，你需要评估两名候选人对于两个岗位的合适程度。",
  QUESTION: "你认为该候选人是否适合当前岗位？（分数越高表明越适合该岗位）",
};
