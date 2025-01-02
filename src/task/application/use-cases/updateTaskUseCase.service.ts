import { Injectable, NotFoundException } from '@nestjs/common';
import { map, mergeMap, Observable } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { Task, TaskFactory, TaskStatus } from '../../domain';
import { UpdateInformationCommand } from '../commands';
import { TaskRepository } from '../ports';

@Injectable()
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
          throw new NotFoundException(
            new ResponseBuildingModel(false, null, {
              code: 'ERROR_TASK_NOT_FOUND',
              error: 'Task not found',
              title: 'Error',
            }),
          );
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
        return this.taskRepository.update(
          task.id,
          TaskFactory.update(
            task.id,
            task.userId,
            task.userName,
            task.title,
            task.description,
            task.limitDate,
            task.status,
          ),
        );
      }),
      mergeMap((updatedTask) =>
        updatedTask.pipe(map((task) => new ResponseBuildingModel(true, task))),
      ),
    );
  }
}
