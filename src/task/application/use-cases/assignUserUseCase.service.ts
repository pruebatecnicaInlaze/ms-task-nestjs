import { Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';

import { environment } from '../../../config';
import { IUseCase, ResponseBuildingModel } from '../../../common';
import { Task } from '../../domain';
import { HttpRepository, TaskRepository } from '../ports';
import { AssignUserTaskCommand } from '../commands';
import { UserResponseInterface } from './interface';

@Injectable()
export class AssignUserUseCase
  implements IUseCase<AssignUserTaskCommand, ResponseBuildingModel<Task>>
{
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly httpRepository: HttpRepository,
  ) {}

  public execute(
    infoAssignTask: AssignUserTaskCommand,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.httpRepository
      .get<
        ResponseBuildingModel<UserResponseInterface>
      >(`${environment.urlConnectionMicroserviceUser}/findUserByEmail/${infoAssignTask.emailUser}`)
      .pipe(
        switchMap((response) => {
          const userId = response.result.id;
          const userName = response.result.fullName;
          return this.taskRepository.findById(infoAssignTask.taskId).pipe(
            switchMap((task) => {
              task.userId = userId;
              task.userName = userName;
              return this.taskRepository
                .update(task.id, task)
                .pipe(map(() => task));
            }),
          );
        }),
        map((task) => new ResponseBuildingModel(true, task, null)),
      );
  }
}
