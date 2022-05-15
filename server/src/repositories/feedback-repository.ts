
export interface FeedbackRepositoriesTypes{
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackRepository{
  create: (data:FeedbackRepositoriesTypes ) => Promise<void>
}