import { ITask } from './interfaces';
import { TaskStatus } from './value-objects';

export class Task implements ITask {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public limitDate: Date,
    public status: TaskStatus,
  ) {}
}
