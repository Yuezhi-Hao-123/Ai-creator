/**
 * All UI text strings — Chinese (Simplified).
 */
const zh = {
  app: {
    title: "AI 内容规划器",
    description: "用 AI 规划、创作和优化你的短视频",
  },

  nav: {
    home: "首页",
    profile: "创作者资料",
    topics: "选题灵感",
    plan: "内容方案",
    analyze: "数据分析",
  },

  home: {
    welcome: "AI 内容规划器",
    subtitle: "用 AI 规划、创作和优化你的短视频",
    cards: {
      profile: {
        title: "创作者资料",
        description: "设置你的创作者身份",
      },
      topics: {
        title: "选题灵感",
        description: "生成新鲜的视频选题",
      },
      plan: {
        title: "内容方案",
        description: "撰写吸引人的视频脚本",
      },
      analyze: {
        title: "数据分析",
        description: "分析并改进你的内容表现",
      },
    },
  },

  profile: {
    title: "创作者资料",
    description: "告诉我们你的频道信息，AI 会为你量身定制内容。",
    platform: {
      label: "平台",
      placeholder: "选择你主要使用的平台",
    },
    category: {
      label: "内容类别",
      placeholder: "例如：科技、美食、旅行、搞笑、教育",
    },
    targetAudience: {
      label: "目标观众",
      placeholder: "例如：Z世代科技爱好者、年轻父母",
    },
    contentStyle: {
      label: "内容风格",
      placeholder: "选择你的风格",
    },
    videoDuration: {
      label: "视频时长",
      placeholder: "选择典型时长",
    },
    language: {
      label: "视频语言",
      placeholder: "例如：中文",
    },
    saveButton: "保存资料",
    saveSuccess: "资料已保存",
    emptyTitle: "还没有资料",
    emptyDescription: "创建你的创作者资料，获取更个性化的内容建议。",
  },

  topics: {
    title: "选题灵感",
    description: "输入一个主题，让 AI 为你生成新鲜的视频创意思路。",
    inputPlaceholder: "例如：烹饪入门、科技评测、日常Vlog...",
    generateButton: "生成选题",
    generating: "生成中...",
    idleTitle: "准备头脑风暴",
    idleDescription: "在上方输入主题，让 AI 激发你的创意。",
    profileContext: "基于你的 {platform} 资料生成",
    createPlan: "创建内容方案",
  },

  plan: {
    title: "内容方案",
    description: "AI 生成的视频脚本和结构。",
    emptyTitle: "未选择选题",
    emptyDescription: "请先从「选题灵感」中选择一个选题，或在下方面粘贴你的选题。",
    sections: {
      openingHook: "开场钩子",
      contentStructure: "内容结构",
      keyPoints: "关键要点",
      endingCta: "结尾互动",
      coverText: "封面文字",
    },
    copyAll: "复制全部",
    downloadWord: "下载 Word",
    copySuccess: "内容已复制到剪贴板",
  },

  analyze: {
    title: "数据分析",
    description: "输入你的视频数据，获取 AI 改进建议。",
    metrics: {
      views: "播放量",
      likes: "点赞",
      comments: "评论",
      saves: "收藏",
      shares: "分享",
      retention3s: "3秒留存率 %",
      retention5s: "5秒留存率 %",
      completionRate: "完播率 %",
      coverClickRate: "封面点击率 %",
    },
    advancedMetrics: "高级指标（可选）",
    videoTopic: "视频主题（可选）",
    videoTopicPlaceholder: "这个视频是关于什么的？",
    analyzeButton: "分析数据",
    analyzing: "分析中...",
    engagementRate: "互动率",
    engagementLevel: "等级",
    suggestions: "AI 改进建议",
    keyTakeaway: "核心要点",
    copyReport: "复制报告",
    startOver: "重新开始",
    idleTitle: "分析你的表现",
    idleDescription: "在上方输入视频数据，获取 AI 驱动改进建议。",
  },

  errors: {
    validation: "请检查你的输入并重试。",
    apiKeyMissing: "AI 服务未配置，请设置 API Key。",
    network: "网络错误，请检查连接后重试。",
    parseFailed: "AI 响应解析失败，请重试。",
    unknown: "出了点问题，请重试。",
    rateLimited: "请求太频繁，请稍等片刻再试。",
    aiUnavailable: "AI 服务暂时不可用，请稍后再试。",
  },

  general: {
    retry: "重试",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    copy: "复制",
    download: "下载",
    back: "返回",
    next: "下一步",
  },

  footer: {
    builtWith: "基于 DeepSeek AI 构建",
    poweredBy: "由 Next.js & Supabase 驱动",
  },
} as const;

export default zh;
