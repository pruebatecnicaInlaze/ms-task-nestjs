import { TypeStatus } from '../types';

export class TaskStatus {
  constructor(readonly value: TypeStatus) {}

  public equals(status: TaskStatus) {
    return this.value === status.value;
  }
}
