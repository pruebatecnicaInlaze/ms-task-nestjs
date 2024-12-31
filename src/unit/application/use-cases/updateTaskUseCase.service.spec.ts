import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';

import { ResponseBuildingModel } from '../../../common';
import {
  Task,
  TaskRepository,
  TaskStatus,
  UpdateInformationCommand,
  UpdateTaskUseCase,
} from '../../../task';

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepository: TaskRepository;

  const task: Task = {
    id: 'task1',
    userId: 'user1',
    title: 'Test Task',
    description: 'This is a test task',
    limitDate: new Date('2023-12-31'),
    status: 'In_progress' as unknown as TaskStatus,
  };

  const updateInformationCommand: UpdateInformationCommand = {
    taskId: 'task1',
    title: 'Updated Task',
    description: 'This is an updated test task',
    limitDate: new Date('2024-01-01'),
    statusTask: 'DONE',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        {
          provide: TaskRepository,
          useValue: {
            findById: jest.fn().mockReturnValue(of(task)),
            update: jest.fn().mockReturnValue(of(task)),
          },
        },
      ],
    }).compile();

    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(updateTaskUseCase).toBeDefined();
  });

  it('should update a task successfully', (done) => {
    updateTaskUseCase
      .execute(updateInformationCommand)
      .subscribe((response) => {
        expect(response).toBeInstanceOf(ResponseBuildingModel);
        expect(response.succeeded).toBe(true);
        expect(response.result).toEqual(task);
        done();
      });
  });

  it('should throw an error if task is not found', (done) => {
    jest.spyOn(taskRepository, 'findById').mockReturnValueOnce(of(null));

    updateTaskUseCase.execute(updateInformationCommand).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(ResponseBuildingModel);
        expect(error.succeeded).toBe(false);
        expect(error.error.code).toBe('ERROR_TASK_NOT_FOUND');
        done();
      },
    });
  });

  it('should handle repository update error', (done) => {
    const errorMessage = 'Update failed';
    jest
      .spyOn(taskRepository, 'update')
      .mockReturnValueOnce(
        throwError(() => new ResponseBuildingModel(false, errorMessage)),
      );

    updateTaskUseCase.execute(updateInformationCommand).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(ResponseBuildingModel);
        expect(error.succeeded).toBe(false);
        done();
      },
    });
  });
});
