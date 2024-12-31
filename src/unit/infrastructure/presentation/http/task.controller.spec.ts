import { Test, TestingModule } from '@nestjs/testing';
import {
  Task,
  TaskController,
  AssignUserUseCase,
  DeleteTaskUseCase,
  FindAllTaskUseCase,
  RegisterTaskUseCase,
  UpdateTaskUseCase,
  AssignTaskDto,
  RegisterTaskDto,
  UpdateTaskDto,
  TaskStatus,
} from '../../../../task';
import { of } from 'rxjs';
import { ResponseBuildingModel } from '../../../../common';

describe('TaskController', () => {
  let taskController: TaskController;
  let findAllTaskUseCase: FindAllTaskUseCase;
  let registerTaskUseCase: RegisterTaskUseCase;
  let assignUserTaskUseCase: AssignUserUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: FindAllTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: RegisterTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: AssignUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteTaskUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    registerTaskUseCase = module.get<RegisterTaskUseCase>(RegisterTaskUseCase);
    assignUserTaskUseCase = module.get<AssignUserUseCase>(AssignUserUseCase);
    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should return an array of tasks', (done) => {
    const result = new ResponseBuildingModel<Task[]>(true, []);
    jest.spyOn(findAllTaskUseCase, 'execute').mockReturnValue(of(result));

    taskController.findAllTasks().subscribe((data) => {
      expect(data).toBe(result);
      done();
    });
  });

  it('should register a task', (done) => {
    const registerTaskDto: RegisterTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
      limitDate: new Date('2023-12-31'),
      userId: 'user1',
    };
    const result = new ResponseBuildingModel<Task>(
      true,
      new Task(
        '1',
        'user1',
        'Test Task',
        'This is a test task',
        new Date('2023-12-31'),
        'In_progress' as unknown as TaskStatus,
      ),
    );
    jest.spyOn(registerTaskUseCase, 'execute').mockReturnValue(of(result));

    taskController.registerTask(registerTaskDto).subscribe((data) => {
      expect(data).toBe(result);
      done();
    });
  });

  it('should assign a task to a user', (done) => {
    const assignTaskDto: AssignTaskDto = {
      taskId: 'task1',
      emailUser: 'user@example.com',
    };
    const result = new ResponseBuildingModel<Task>(
      true,
      new Task(
        'task1',
        'user1',
        'Test Task',
        'This is a test task',
        new Date('2023-12-31'),
        'In_progress' as unknown as TaskStatus,
      ),
    );
    jest.spyOn(assignUserTaskUseCase, 'execute').mockReturnValue(of(result));

    taskController.assignTaskToUser(assignTaskDto).subscribe((data) => {
      expect(data).toBe(result);
      done();
    });
  });

  it('should update a task', (done) => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'This is an updated task',
      limitDate: new Date('2023-12-31'),
      userId: 'user1',
    };
    const result = new ResponseBuildingModel<Task>(
      true,
      new Task(
        'task1',
        'user1',
        'Updated Task',
        'This is an updated task',
        new Date('2023-12-31'),
        'In_progress' as unknown as TaskStatus,
      ),
    );
    jest.spyOn(updateTaskUseCase, 'execute').mockReturnValue(of(result));

    taskController.updateTask('task1', updateTaskDto).subscribe((data) => {
      expect(data).toBe(result);
      done();
    });
  });

  it('should delete a task', (done) => {
    const result = new ResponseBuildingModel<boolean>(true, true);
    jest.spyOn(deleteTaskUseCase, 'execute').mockReturnValue(of(result));

    taskController.deleteTask('task1').subscribe((data) => {
      expect(data).toBe(result);
      done();
    });
  });
});
