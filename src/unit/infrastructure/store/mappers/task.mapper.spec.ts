import { Task, TaskData, TaskMapper, TaskStatus } from '../../../../task';

describe('TaskMapper', () => {
  it('should map TaskData to Task', () => {
    const taskData: TaskData = {
      id: 'task1',
      userId: 'user1',
      title: 'Test Task',
      description: 'This is a test task',
      limitDate: new Date('2023-12-31'),
      status: 'In_progress',
    };

    const task = TaskMapper.toDomain(taskData);

    expect(task).toBeInstanceOf(Task);
    expect(task.id).toBe(taskData.id);
    expect(task.userId).toBe(taskData.userId);
    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
    expect(task.limitDate).toEqual(taskData.limitDate);
    expect(task.status.value).toBe(taskData.status);
  });

  it('should map Task to TaskData', () => {
    const task = new Task(
      'task1',
      'user1',
      'Test Task',
      'This is a test task',
      new Date('2023-12-31'),
      new TaskStatus('In_progress' as 'To_do' | 'In_progress' | 'Done'),
    );

    const taskData = TaskMapper.toEntity(task);

    expect(taskData).toBeInstanceOf(TaskData);
    expect(taskData.id).toBe(task.id);
    expect(taskData.userId).toBe(task.userId);
    expect(taskData.title).toBe(task.title);
    expect(taskData.description).toBe(task.description);
    expect(taskData.limitDate).toEqual(task.limitDate);
    expect(taskData.status).toBe(task.status.value);
  });
});
