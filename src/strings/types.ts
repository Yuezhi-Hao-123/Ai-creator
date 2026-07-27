/**
 * Shared strings type — structural shape that both en and zh conform to.
 * Uses `string` for all leaf values so literal types don't conflict.
 */

export interface Strings {
  app: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    profile: string;
    topics: string;
    plan: string;
    analyze: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    cards: {
      profile: { title: string; description: string };
      topics: { title: string; description: string };
      plan: { title: string; description: string };
      analyze: { title: string; description: string };
    };
  };
  profile: {
    title: string;
    description: string;
    platform: { label: string; placeholder: string };
    category: { label: string; placeholder: string };
    targetAudience: { label: string; placeholder: string };
    contentStyle: { label: string; placeholder: string };
    videoDuration: { label: string; placeholder: string };
    language: { label: string; placeholder: string };
    saveButton: string;
    saveSuccess: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  topics: {
    title: string;
    description: string;
    inputPlaceholder: string;
    generateButton: string;
    generating: string;
    idleTitle: string;
    idleDescription: string;
    profileContext: string;
    createPlan: string;
  };
  plan: {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    sections: {
      openingHook: string;
      contentStructure: string;
      keyPoints: string;
      endingCta: string;
      coverText: string;
    };
    copyAll: string;
    downloadMd: string;
    copySuccess: string;
  };
  analyze: {
    title: string;
    description: string;
    metrics: {
      views: string;
      likes: string;
      comments: string;
      saves: string;
      shares: string;
    };
    videoTopic: string;
    videoTopicPlaceholder: string;
    analyzeButton: string;
    analyzing: string;
    engagementRate: string;
    engagementLevel: string;
    suggestions: string;
    keyTakeaway: string;
    copyReport: string;
    startOver: string;
    idleTitle: string;
    idleDescription: string;
  };
  errors: {
    validation: string;
    apiKeyMissing: string;
    network: string;
    parseFailed: string;
    unknown: string;
    rateLimited: string;
    aiUnavailable: string;
  };
  general: {
    retry: string;
    save: string;
    cancel: string;
    delete: string;
    copy: string;
    download: string;
    back: string;
    next: string;
  };
  footer: {
    builtWith: string;
    poweredBy: string;
  };
}
