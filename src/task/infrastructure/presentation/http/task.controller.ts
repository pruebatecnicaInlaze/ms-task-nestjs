import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ResponseBuildingModel } from '../../../../common';
import {
  AssignUserUseCase,
  DeleteTaskUseCase,
  FindAllTaskUseCase,
  RegisterTaskCommand,
  RegisterTaskUseCase,
  UpdateInformationCommand,
  UpdateTaskUseCase,
  AssignUserTaskCommand,
} from '../../../application';
import { Task } from '../../../domain';
import { AssignTaskDto, RegisterTaskDto, UpdateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly registerTaskUseCase: RegisterTaskUseCase,
    private readonly assignUserTaskUseCase: AssignUserUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
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
        '',
      ),
    );
  }

  @Post('assignTask')
  public assignTaskToUser(
    @Body() assignTask: AssignTaskDto,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.assignUserTaskUseCase.execute(
      new AssignUserTaskCommand(assignTask.taskId, assignTask.emailUser),
    );
  }

  @Put('updateTask/:id')
  public updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDtoTask: UpdateTaskDto,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.updateTaskUseCase.execute(
      new UpdateInformationCommand(
        id,
        updateDtoTask.title,
        updateDtoTask.description,
        updateDtoTask.limitDate,
        updateDtoTask.userId ?? '',
      ),
    );
  }

  @Delete('deleteTask/:id')
  public deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
  ): Observable<ResponseBuildingModel<boolean>> {
    return this.deleteTaskUseCase.execute(id);
  }
}
