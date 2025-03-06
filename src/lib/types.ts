
export type Priority = 'low' | 'medium' | 'high';

export type Category = {
  id: string;
  name: string;
  color: string;
  icon?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewMode = 'list' | 'calendar';
