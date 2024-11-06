export interface Task {
  id: string;
  rule: string;
  content: string;
  encrypted: string;
  createdAt: number;
}

export interface Record {
  taskId: string;
  playerName: string;
  timeSpent: number; // 秒数
  completedAt: number;
}

export interface GameState {
  tasks: Task[];
  records: Record[];
}