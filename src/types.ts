export interface Topic {
  day: number;
  title: string;
  difficulty: string;
  prerequisites: string;
  interviewWhy: string;
  focus: string[];
  slug: string;
}

export interface CounterState {
  currentDay: number;
  lastGeneratedDate: string | null;
  completedDays: number[];
}

export interface AppConfig {
  timezone: string;
  scheduleTime: string;
  learnerEmail: string;
  siteUrl: string;
  site: {
    title: string;
    subtitle: string;
  };
  mail: {
    subjectTemplate: string;
  };
  git: {
    commitTemplate: string;
  };
}

export interface RevisionTarget {
  day: number;
  title: string;
  reason: string;
}

export interface PrepareResult {
  status: "skip" | "ready";
  today: string;
  day: number;
  topic: Topic;
  revisionTargets: RevisionTarget[];
  markdownPath: string;
  htmlPath: string;
  pdfPath: string;
  sitePath: string;
  reason?: string;
}

export interface FinalizeResult {
  markdownPath: string;
  htmlPath: string;
  pdfPath: string;
  sitePath: string;
  homepagePath: string;
  email: {
    attempted: boolean;
    delivered: boolean;
    message: string;
  };
  git: {
    committed: boolean;
    pushed: boolean;
    message: string;
  };
}

