import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ResponseBuildingModel } from '../../../common';
import {
  FindAllTaskUseCase,
  Task,
  TaskRepository,
  TaskStatus,
} from '../../../task';

describe('FindAllTaskUseCase', () => {
  let findAllTaskUseCase: FindAllTaskUseCase;
  let taskRepository: TaskRepository;

  const tasks: Task[] = [
    {
      id: 'task1',
      userId: 'user1',
      title: 'Test Task 1',
      description: 'This is a test task 1',
      limitDate: new Date('2023-12-31'),
      status: 'To_do' as unknown as TaskStatus,
    },
    {
      id: 'task2',
      userId: 'user2',
      title: 'Test Task 2',
      description: 'This is a test task 2',
      limitDate: new Date('2023-12-31'),
      status: 'To_do' as unknown as TaskStatus,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTaskUseCase,
        {
          provide: TaskRepository,
          useValue: {
            findAll: jest.fn().mockReturnValue(of(tasks)),
          },
        },
      ],
    }).compile();

    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should find all tasks successfully', (done) => {
    findAllTaskUseCase.execute().subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(true);
      expect(response.result).toEqual(tasks);
      done();
    });
  });

  it('should handle errors', (done) => {
    jest
      .spyOn(taskRepository, 'findAll')
      .mockReturnValueOnce(
        throwError(() => new ResponseBuildingModel(false, 'Test error')),
      );

    findAllTaskUseCase.execute().subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(false);
      expect(response.error).toEqual({
        code: 'ERROR_FIND_ALL_TASKS',
        title: 'Error',
      });
      done();
    });
  });
});
