import { Task, TaskStatus } from '../../../domain';
import { TaskData } from '../entities';

export class TaskMapper {
  public static toDomain(taskEntity: TaskData): Task {
    const taskStatus = new TaskStatus(
      taskEntity.status as 'To_do' | 'In_progress' | 'Done',
    );
    return new Task(
      taskEntity.id,
      taskEntity.userId,
      taskEntity.userName,
      taskEntity.title,
      taskEntity.description,
      taskEntity.limitDate,
      taskStatus,
    );
  }

  public static toEntity(task: Task): TaskData {
    const entity = new TaskData();
    entity.id = task.id;
    entity.userId = task.userId;
    entity.userName = task.userName;
    entity.title = task.title;
    entity.description = task.description;
    entity.limitDate = task.limitDate;
    entity.status = task.status.value;
    return entity;
  }
}
