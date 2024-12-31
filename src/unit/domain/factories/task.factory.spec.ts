import { Task, TaskFactory, TaskStatus } from '../../../task';

describe('TaskFactory', () => {
  it('should create a Task instance', () => {
    const userId = 'user1';
    const title = 'Test Task';
    const description = 'This is a test task';
    const limitDate = new Date('2023-12-31');
    const status = 'In_progress';

    const task = TaskFactory.create(
      userId,
      title,
      description,
      limitDate,
      status,
    );

    expect(task).toBeInstanceOf(Task);
    expect(task.userId).toBe(userId);
    expect(task.title).toBe(title);
    expect(task.description).toBe(description);
    expect(task.limitDate).toBe(limitDate);
    expect(task.status).toBeInstanceOf(TaskStatus);
    expect(task.status.value).toBe(status);
  });
});
