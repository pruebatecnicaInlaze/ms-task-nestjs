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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { ResponseBuildingModel } from '../../../../common';
import {
  AssignUserTaskCommand,
  AssignUserUseCase,
  DeleteTaskUseCase,
  FindAllTaskUseCase,
  RegisterTaskCommand,
  RegisterTaskUseCase,
  UpdateInformationCommand,
  UpdateTaskUseCase,
} from '../../../application';
import { Task } from '../../../domain';
import { AssignTaskDto, RegisterTaskDto, UpdateTaskDto } from './dto';
import { ExampleDocsOpenApi } from '../../../../constants';
@ApiTags('Task Endpoints')
@Controller('task')
export class TaskController {
  constructor(
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly registerTaskUseCase: RegisterTaskUseCase,
    private readonly assignUserTaskUseCase: AssignUserUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The list of successfully created tasks',
    example: ExampleDocsOpenApi.successListApi,
  })
  @Get('listAll')
  public findAllTasks(): Observable<ResponseBuildingModel<Task[]>> {
    return this.findAllTaskUseCase.execute();
  }

  @Post('registerTask')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully create.',
    example: ExampleDocsOpenApi.successCreatedTask,
  })
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
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully assigned.',
    example: ExampleDocsOpenApi.successAssignTask,
  })
  public assignTaskToUser(
    @Body() assignTask: AssignTaskDto,
  ): Observable<ResponseBuildingModel<Task>> {
    return this.assignUserTaskUseCase.execute(
      new AssignUserTaskCommand(assignTask.taskId, assignTask.emailUser),
    );
  }

  @Put('updateTask/:id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
    example: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated task.',
    example: ExampleDocsOpenApi.successUpdateTask,
  })
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
        updateDtoTask.status,
      ),
    );
  }

  @Delete('deleteTask/:id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
    example: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully delete.',
    example: ExampleDocsOpenApi.succeedDelete,
  })
  public deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
  ): Observable<ResponseBuildingModel<boolean>> {
    return this.deleteTaskUseCase.execute(id);
  }
}
