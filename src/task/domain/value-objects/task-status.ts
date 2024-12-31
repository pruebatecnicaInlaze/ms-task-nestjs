export class TaskStatus {
  constructor(readonly value: 'To_do' | 'In_progress' | 'Done') {}

  public equals(status: TaskStatus) {
    return this.value === status.value;
  }
}
