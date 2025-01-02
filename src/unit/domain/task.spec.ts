import { Task, TaskStatus } from '../../task';

describe('Task', () => {
  it('should create a task instance', () => {
    const id = '1';
    const userId = 'user1';
    const title = 'Test Task';
    const userName = 'UserName Test Task';
    const description = 'This is a test task';
    const limitDate = new Date('2023-12-31');
    const status = 'In_progress';

    const task = new Task(
      id,
      userId,
      userName,
      title,
      description,
      limitDate,
      status as unknown as TaskStatus,
    );

    expect(task.id).toBe(id);
    expect(task.userId).toBe(userId);
    expect(task.title).toBe(title);
    expect(task.description).toBe(description);
    expect(task.limitDate).toBe(limitDate);
    expect(task.status).toBe(status);
  });
});
