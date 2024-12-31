import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ResponseBuildingModel } from '../../../../common';
import {
  FindAllTaskUseCase,
  RegisterTaskCommand,
  RegisterTaskUseCase,
} from '../../../application';
import { Task } from '../../../domain';
import { RegisterTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly registerTaskUseCase: RegisterTaskUseCase,
  ) {}

  @Get('listAll')
  public findAllTasks(): Observable<ResponseBuildingModel<Task[]>> {
    return this.findAllTaskUseCase.execute();
  }

  @Post('registerTask')
  public registerTask(
    @Body() registerDtoTask: RegisterTaskDto,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.registerTaskUseCase.execute(
      new RegisterTaskCommand(
        registerDtoTask.title,
        registerDtoTask.description,
        registerDtoTask.limitDate,
        registerDtoTask.userId ?? '',
      ),
    );
  }
}
