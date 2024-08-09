import { SubTask } from './sub-task';

export interface Task {
  taskId: string;
  label: string;
  note: {
    text: string;
    isImportant: boolean;
  };
  subTasks: [SubTask];
  dueDate: Date;
  isCompleted: boolean;
  isDeleted: boolean;
}
