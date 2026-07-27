/**
 * All UI text strings for the app.
 * V1: English only. Future: add zh.ts and a locale switcher.
 */
const strings = {
  app: {
    title: "AI Content Planner",
    description:
      "Plan, create, and optimize your short videos with AI",
  },

  nav: {
    home: "Home",
    profile: "Creator Profile",
    topics: "Topic Ideas",
    plan: "Content Plan",
    analyze: "Performance Analysis",
  },

  home: {
    welcome: "AI Content Planner",
    subtitle: "Plan, create, and optimize your short videos with AI",
    cards: {
      profile: {
        title: "Creator Profile",
        description: "Set up your creator identity",
      },
      topics: {
        title: "Topic Ideas",
        description: "Generate fresh video topics",
      },
      plan: {
        title: "Content Plan",
        description: "Craft engaging video scripts",
      },
      analyze: {
        title: "Performance Analysis",
        description: "Analyze and improve your content",
      },
    },
  },

  profile: {
    title: "Creator Profile",
    description:
      "Tell us about your channel so AI can tailor content to your style.",
    platform: {
      label: "Platform",
      placeholder: "Select your main platform",
    },
    category: {
      label: "Content Category",
      placeholder: "e.g., Technology, Food, Travel, Comedy, Education",
    },
    targetAudience: {
      label: "Target Audience",
      placeholder: "e.g., Gen Z tech enthusiasts, young parents",
    },
    contentStyle: {
      label: "Content Style",
      placeholder: "Select your style",
    },
    videoDuration: {
      label: "Video Duration",
      placeholder: "Select typical duration",
    },
    language: {
      label: "Video Language",
      placeholder: "e.g., English",
    },
    saveButton: "Save Profile",
    saveSuccess: "Profile saved",
    emptyTitle: "No profile yet",
    emptyDescription:
      "Create your creator profile to get more personalized content suggestions.",
  },

  topics: {
    title: "Topic Ideas",
    description:
      "Enter a topic and let AI generate fresh video ideas for you.",
    inputPlaceholder:
      "e.g., cooking for beginners, tech reviews, daily vlog...",
    generateButton: "Generate",
    generating: "Generating...",
    idleTitle: "Ready to brainstorm",
    idleDescription: "Enter a topic above and let AI spark your creativity.",
    profileContext: "Generated based on your {platform} profile",
    createPlan: "Create Content Plan",
  },

  plan: {
    title: "Content Plan",
    description: "Your AI-generated video script and structure.",
    emptyTitle: "No topic selected",
    emptyDescription:
      "Select a topic from Topic Ideas first, or paste your topic below.",
    sections: {
      openingHook: "Opening Hook",
      contentStructure: "Content Structure",
      keyPoints: "Key Points",
      endingCta: "Ending CTA",
      coverText: "Cover Text",
    },
    copyAll: "Copy All",
    downloadWord: "Download Word",
    copySuccess: "Content copied to clipboard",
  },

  analyze: {
    title: "Performance Analysis",
    description:
      "Enter your video metrics and get AI-powered insights to improve.",
    metrics: {
      views: "Views",
      likes: "Likes",
      comments: "Comments",
      saves: "Saves",
      shares: "Shares",
      retention3s: "3s Retention %",
      retention5s: "5s Retention %",
      completionRate: "Completion Rate %",
      coverClickRate: "Cover Click Rate %",
    },
    advancedMetrics: "Advanced Metrics (optional)",
    videoTopic: "Video Topic (optional)",
    videoTopicPlaceholder: "What was this video about?",
    analyzeButton: "Analyze Performance",
    analyzing: "Analyzing...",
    engagementRate: "Engagement Rate",
    engagementLevel: "Level",
    suggestions: "AI Suggestions",
    keyTakeaway: "Key Takeaway",
    copyReport: "Copy Report",
    startOver: "Start Over",
    idleTitle: "Analyze your performance",
    idleDescription:
      "Enter your video metrics above to get AI-powered improvement suggestions.",
  },

  errors: {
    validation: "Please check your input and try again.",
    apiKeyMissing:
      "AI service is not configured. Please set your API key.",
    network: "Network error. Please check your connection and try again.",
    parseFailed:
      "Failed to parse AI response. Please try again.",
    unknown: "Something went wrong. Please try again.",
    rateLimited:
      "Too many requests. Please wait a moment and try again.",
    aiUnavailable: "AI service is temporarily unavailable. Please try again later.",
  },

  general: {
    retry: "Retry",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    copy: "Copy",
    download: "Download",
    back: "Back",
    next: "Next",
  },

  footer: {
    builtWith: "Built with DeepSeek AI",
    poweredBy: "Powered by Next.js & Supabase",
  },
} as const;

export default strings;
