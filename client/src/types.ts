export type TaskType = {
  id?: number;
  title: string;
  createdAt?: string;
  notRelevant?: boolean;
};

export type CompletionType = {
  id?: number;
  date: string;
  task: string;
  createdAt?: string;
};
