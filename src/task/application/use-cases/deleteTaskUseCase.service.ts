import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { TaskRepository } from '../ports';

@Injectable()
export class DeleteTaskUseCase
  implements IUseCase<string, ResponseBuildingModel<boolean>>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  public execute(idTask: string): Observable<ResponseBuildingModel<boolean>> {
    return this.taskRepository
      .delete(idTask)
      .pipe(map(() => new ResponseBuildingModel(true)));
  }
}
