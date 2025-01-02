import { StatusTask } from './enums';

export class TaskStatus {
  constructor(readonly value: StatusTask) {}

  public equals(status: TaskStatus) {
    return this.value === status.value;
  }
}
