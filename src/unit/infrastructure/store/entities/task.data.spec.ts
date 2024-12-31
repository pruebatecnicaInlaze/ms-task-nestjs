import { TaskData } from '../../../../task';

describe('TaskData', () => {
  it('should create an instance of TaskData', () => {
    const taskData = new TaskData();
    taskData.id = 'task1';
    taskData.userId = 'user1';
    taskData.title = 'Test Task';
    taskData.description = 'This is a test task';
    taskData.limitDate = new Date('2023-12-31');
    taskData.status = 'In_progress';

    expect(taskData).toBeInstanceOf(TaskData);
    expect(taskData.id).toBe('task1');
    expect(taskData.userId).toBe('user1');
    expect(taskData.title).toBe('Test Task');
    expect(taskData.description).toBe('This is a test task');
    expect(taskData.limitDate).toEqual(new Date('2023-12-31'));
    expect(taskData.status).toBe('In_progress');
  });
});
