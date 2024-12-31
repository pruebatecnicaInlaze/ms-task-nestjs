import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseBuildingModel } from '../../../common';
import { DeleteTaskUseCase } from '../../../task/application/use-cases/deleteTaskUseCase.service';
import { TaskRepository } from '../../../task/application/ports';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTaskUseCase,
        {
          provide: TaskRepository,
          useValue: {
            delete: jest.fn().mockReturnValue(of(true)),
          },
        },
      ],
    }).compile();

    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(deleteTaskUseCase).toBeDefined();
  });

  it('should delete a task successfully', (done) => {
    deleteTaskUseCase.execute('task1').subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(true);
      done();
    });
  });

  it('should handle errors', (done) => {
    jest.spyOn(taskRepository, 'delete').mockReturnValueOnce(of(false));

    deleteTaskUseCase.execute('task1').subscribe((response) => {
      expect(response).toBeInstanceOf(ResponseBuildingModel);
      expect(response.succeeded).toBe(true);
      done();
    });
  });
});
