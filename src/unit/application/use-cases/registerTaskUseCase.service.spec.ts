import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseBuildingModel } from '../../../common';
import {
  RegisterTaskCommand,
  RegisterTaskUseCase,
  Task,
  TaskRepository,
  TaskStatus,
} from '../../../task';

describe('RegisterTaskUseCase', () => {
  let registerTaskUseCase: RegisterTaskUseCase;
  let taskRepository: TaskRepository;

  const task: Task = {
    id: 'task1',
    userId: 'user1',
    userName: 'User1 Test',
    title: 'Test Task',
    description: 'This is a test task',
    limitDate: new Date('2023-12-31'),
    status: 'To_do' as unknown as TaskStatus,
  };

  const registerTaskCommand: RegisterTaskCommand = {
    userId: 'user1',
    title: 'Test Task',
    description: 'This is a test task',
    limitDate: new Date('2023-12-31'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterTaskUseCase,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn().mockReturnValue(of(task)),
          },
        },
      ],
    }).compile();

    registerTaskUseCase = module.get<RegisterTaskUseCase>(RegisterTaskUseCase);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(registerTaskUseCase).toBeDefined();
  });

  it('should register a task successfully', (done) => {
    registerTaskUseCase.execute(registerTaskCommand).subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(true);
      expect(response.result).toEqual(task);
      done();
    });
  });
});
