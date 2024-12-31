import { TaskStatus } from '../../../task';

describe('TaskStatus', () => {
  it('should create a TaskStatus instance with value "To_do"', () => {
    const status = new TaskStatus('To_do');
    expect(status.value).toBe('To_do');
  });

  it('should create a TaskStatus instance with value "In_progress"', () => {
    const status = new TaskStatus('In_progress');
    expect(status.value).toBe('In_progress');
  });

  it('should create a TaskStatus instance with value "Done"', () => {
    const status = new TaskStatus('Done');
    expect(status.value).toBe('Done');
  });

  it('should return true when comparing two TaskStatus instances with the same value', () => {
    const status1 = new TaskStatus('To_do');
    const status2 = new TaskStatus('To_do');
    expect(status1.equals(status2)).toBe(true);
  });

  it('should return false when comparing two TaskStatus instances with different values', () => {
    const status1 = new TaskStatus('To_do');
    const status2 = new TaskStatus('Done');
    expect(status1.equals(status2)).toBe(false);
  });
});
