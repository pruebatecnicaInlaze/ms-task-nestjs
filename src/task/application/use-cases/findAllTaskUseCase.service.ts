import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { Task } from '../../domain';
import { TaskRepository } from '../ports';

@Injectable()
export class FindAllTaskUseCase
  implements IUseCase<null, ResponseBuildingModel<Task[]>>
{
  constructor(private readonly taskRepository: TaskRepository) {}
  public execute(): Observable<ResponseBuildingModel<Task[]>> {
    return this.taskRepository.findAll().pipe(
      map((tasks) => new ResponseBuildingModel<Task[]>(true, tasks)),
      catchError((error) =>
        of(
          new ResponseBuildingModel<Task[]>(false, undefined, {
            code: 'ERROR_FIND_ALL_TASKS',
            error: error.message,
            title: 'Error',
          }),
        ),
      ),
    );
  }
}
