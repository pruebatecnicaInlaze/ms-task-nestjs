import { Test, TestingModule } from '@nestjs/testing';
import {
  AssignUserUseCase,
  DeleteTaskUseCase,
  FindAllTaskUseCase,
  RegisterTaskUseCase,
  UpdateTaskUseCase,
  TaskController,
  TaskInfrastructureModule,
  TaskModule,
} from '../../task';

describe('TaskModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TaskInfrastructureModule],
      controllers: [TaskController],
      providers: [
        FindAllTaskUseCase,
        RegisterTaskUseCase,
        AssignUserUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        TaskModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    const taskModule = module.get<TaskModule>(TaskModule);
    expect(taskModule).toBeDefined();
  });

  it('should import TaskInfrastructureModule', () => {
    const taskInfrastructureModule = module.get(TaskInfrastructureModule);
    expect(taskInfrastructureModule).toBeDefined();
  });

  it('should provide TaskController', () => {
    const taskController = module.get<TaskController>(TaskController);
    expect(taskController).toBeDefined();
  });

  it('should provide FindAllTaskUseCase', () => {
    const findAllTaskUseCase =
      module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should provide RegisterTaskUseCase', () => {
    const registerTaskUseCase =
      module.get<RegisterTaskUseCase>(RegisterTaskUseCase);
    expect(registerTaskUseCase).toBeDefined();
  });

  it('should provide AssignUserUseCase', () => {
    const assignUserUseCase = module.get<AssignUserUseCase>(AssignUserUseCase);
    expect(assignUserUseCase).toBeDefined();
  });

  it('should provide UpdateTaskUseCase', () => {
    const updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    expect(updateTaskUseCase).toBeDefined();
  });

  it('should provide DeleteTaskUseCase', () => {
    const deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    expect(deleteTaskUseCase).toBeDefined();
  });
});
