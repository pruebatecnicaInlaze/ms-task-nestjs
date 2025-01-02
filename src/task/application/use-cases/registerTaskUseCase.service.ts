import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { Task, TaskFactory } from '../../domain';
import { RegisterTaskCommand } from '../commands';
import { TaskRepository } from '../ports';

@Injectable()
export class RegisterTaskUseCase
  implements IUseCase<RegisterTaskCommand, ResponseBuildingModel<Task>>
{
  constructor(private readonly taskRepository: TaskRepository) {}
  public execute(
    registerCommand: RegisterTaskCommand,
  ): Observable<ResponseBuildingModel<Task>> {
    const task = TaskFactory.create(
      registerCommand.userId,
      registerCommand.userName,
      registerCommand.title,
      registerCommand.description,
      registerCommand.limitDate,
      'To_do',
    );
    return this.taskRepository.create(task).pipe(
      map((createdTask) => new ResponseBuildingModel(true, createdTask)),
      catchError((error) =>
        of(
          new ResponseBuildingModel(false, null, {
            code: 'ERROR_CREATE_TASK',
            error: error.message,
            title: 'Error',
          }),
        ),
      ),
    );
  }
}
