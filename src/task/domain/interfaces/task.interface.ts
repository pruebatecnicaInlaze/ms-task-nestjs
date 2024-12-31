import { TaskStatus } from '../value-objects';

export interface ITask {
  id: string;
  userId: string;
  title: string;
  description: string;
  limitDate: Date;
  status: TaskStatus;
}
