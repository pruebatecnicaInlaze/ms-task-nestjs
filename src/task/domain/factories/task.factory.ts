import { v4 as UUID } from 'uuid';
import { TaskStatus } from '../value-objects';
import { Task } from '../task';

export class TaskFactory {
  public static create(
    userId: string,
    userName: string,
    title: string,
    description: string,
    limitDate: Date,
    status: string,
  ) {
    const taskUuid = UUID();
    const statusTask = new TaskStatus(status as TaskStatus['value']);
    return new Task(
      taskUuid,
      userId,
      userName,
      title,
      description,
      limitDate,
      statusTask,
    );
  }

  public static update(
    taskId: string,
    userId: string,
    userName: string,
    title: string,
    description,
    limitDate: Date,
    status: TaskStatus,
  ) {
    return new Task(
      taskId,
      userId,
      userName,
      title,
      description,
      limitDate,
      status,
    );
  }
}
