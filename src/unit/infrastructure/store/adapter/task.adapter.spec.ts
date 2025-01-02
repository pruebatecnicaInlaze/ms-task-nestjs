import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Task, TaskAdapter, TaskData, TaskMapper } from '../../../../task';
import { Repository } from 'typeorm';

describe('TaskAdapter', () => {
  let taskAdapter: TaskAdapter;
  let taskRepository: Repository<TaskData>;

  const taskData: TaskData = {
    id: 'task1',
    userId: 'user1',
    userName: 'User1 Test',
    title: 'Test Task',
    description: 'This is a test task',
    limitDate: new Date('2023-12-31'),
    status: 'In_progress',
  };

  const task: Task = TaskMapper.toDomain(taskData);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskAdapter,
        {
          provide: getRepositoryToken(TaskData),
          useValue: {
            find: jest.fn().mockReturnValue(of([taskData])),
            findOne: jest.fn().mockReturnValue(of(taskData)),
            save: jest.fn().mockReturnValue(of(taskData)),
            update: jest.fn().mockReturnValue(of(taskData)),
            delete: jest.fn().mockReturnValue(of(true)),
          },
        },
      ],
    }).compile();

    taskAdapter = module.get<TaskAdapter>(TaskAdapter);
    taskRepository = module.get<Repository<TaskData>>(
      getRepositoryToken(TaskData),
    );
  });

  it('should be defined', () => {
    expect(taskAdapter).toBeDefined();
  });

  it('should find all tasks', (done) => {
    taskAdapter.findAll().subscribe((tasks) => {
      expect(tasks).toEqual([task]);
      done();
    });
  });

  it('should find a task by id', (done) => {
    taskAdapter.findById('task1').subscribe((foundTask) => {
      expect(foundTask).toEqual(task);
      done();
    });
  });

  it('should create a task', (done) => {
    taskAdapter.create(task).subscribe((createdTask) => {
      expect(createdTask).toEqual(task);
      done();
    });
  });

  it('should update a task', (done) => {
    taskAdapter.update('task1', task).subscribe((updatedTask) => {
      expect(updatedTask).toEqual(task);
      done();
    });
  });

  it('should delete a task', (done) => {
    taskAdapter.delete('task1').subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });
});
