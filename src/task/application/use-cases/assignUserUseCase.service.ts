import { Injectable } from '@nestjs/common';
import { IUseCase, ResponseBuildingModel } from '../../../common';
import { Task } from '../../domain';
import { map, Observable, switchMap } from 'rxjs';
import { HttpRepository, TaskRepository } from '../ports';
import { AssignUserTaskCommand } from '../commands';

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
      .get<{
        id: string;
      }>(
        `http://localhost:4040/users/findUserByEmail/${infoAssignTask.emailUser}`,
      )
      .pipe(
        // map((userData) => userData.id),
        switchMap((userId) => {
          console.log(userId);
          return this.taskRepository.findById(infoAssignTask.taskId).pipe(
            switchMap((task) =>
              this.taskRepository.update(task.id, {
                userId,
                ...task,
              }),
            ),
          );
        }),
        map((task) => new ResponseBuildingModel(true, task, null)),
      );
  }
}
