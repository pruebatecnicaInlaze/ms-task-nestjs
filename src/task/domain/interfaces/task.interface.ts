import { TaskStatus } from '../value-objects';

export interface ITask {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  limitDate: Date;
  status: TaskStatus;
}
