import { v4 as UUID } from 'uuid';
import { TaskStatus } from '../value-objects';
import { Task } from '../task';

export class TaskFactory {
  public static create(
    title: string,
    description: string,
    limitDate: Date,
    status: string,
  ) {
    const taskUuid = UUID();
    const statusTask = new TaskStatus(status as TaskStatus['value']);
    return new Task(taskUuid, title, description, limitDate, statusTask);
  }
}
