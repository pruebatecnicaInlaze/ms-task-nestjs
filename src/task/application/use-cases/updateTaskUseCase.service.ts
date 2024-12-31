import { Task, TaskStatus } from '../../domain';
import { IUseCase, ResponseBuildingModel } from '../../../common';
import { UpdateInformationCommand } from '../commands';
import { map, mergeMap, Observable } from 'rxjs';
import { TaskRepository } from '../ports';

export class UpdateTaskUseCase
  implements IUseCase<UpdateInformationCommand, ResponseBuildingModel<Task>>
{
  constructor(private readonly taskRepository: TaskRepository) {}
  public execute(
    updateInformationCommand: UpdateInformationCommand,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.taskRepository.findById(updateInformationCommand.taskId).pipe(
      map((task) => {
        if (!task) {
          throw new ResponseBuildingModel(false, null, {
            code: 'ERROR_TASK_NOT_FOUND',
            error: 'Task not found',
            title: 'Error',
          });
        }
        if (updateInformationCommand.title) {
          task.title = updateInformationCommand.title;
        }
        if (updateInformationCommand.description) {
          task.description = updateInformationCommand.description;
        }
        if (updateInformationCommand.limitDate) {
          task.limitDate = updateInformationCommand.limitDate;
        }
        if (updateInformationCommand.statusTask) {
          task.status =
            updateInformationCommand.statusTask as unknown as TaskStatus;
        }
        return this.taskRepository.update(task.id, task);
      }),
      mergeMap((updatedTask) =>
        updatedTask.pipe(map((task) => new ResponseBuildingModel(true, task))),
      ),
    );
  }
}
