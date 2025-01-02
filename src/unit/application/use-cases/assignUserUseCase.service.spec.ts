import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseBuildingModel } from '../../../common';
import {
  AssignUserTaskCommand,
  AssignUserUseCase,
  HttpRepository,
  Task,
  TaskRepository,
  TaskStatus,
  UserResponseInterface,
} from '../../../task';

describe('AssignUserUseCase', () => {
  let assignUserUseCase: AssignUserUseCase;
  let taskRepository: TaskRepository;
  let httpRepository: HttpRepository;

  const task: Task = {
    id: 'task1',
    userId: 'user1',
    userName: 'User1 Test',
    title: 'Test Task',
    description: 'This is a test task',
    limitDate: new Date('2023-12-31'),
    status: 'To_do' as unknown as TaskStatus,
  };

  const userResponse: ResponseBuildingModel<UserResponseInterface> = {
    succeeded: true,
    result: {
      id: 'user1',
      email: 'test@example.com',
      fullName: '',
      createAt: new Date(),
    },
  };

  const assignUserTaskCommand: AssignUserTaskCommand = {
    taskId: 'task1',
    emailUser: 'test@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignUserUseCase,
        {
          provide: TaskRepository,
          useValue: {
            findById: jest.fn().mockReturnValue(of(task)),
            update: jest.fn().mockReturnValue(of(task)),
          },
        },
        {
          provide: HttpRepository,
          useValue: {
            get: jest.fn().mockReturnValue(of(userResponse)),
          },
        },
      ],
    }).compile();

    assignUserUseCase = module.get<AssignUserUseCase>(AssignUserUseCase);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    httpRepository = module.get<HttpRepository>(HttpRepository);
  });

  it('should be defined', () => {
    expect(assignUserUseCase).toBeDefined();
  });

  it('should assign a user to a task successfully', (done) => {
    assignUserUseCase.execute(assignUserTaskCommand).subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(true);
      expect(response.result).toEqual(task);
      done();
    });
  });
});
