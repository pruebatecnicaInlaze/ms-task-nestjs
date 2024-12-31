import { TypeStatus } from 'src/task/domain/types';
import { ITask, TaskStatus } from '../../../domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('task')
export class TaskData implements ITask {
  @PrimaryColumn() public id: string;
  @Column() public userId: string;
  @Column() public title: string;
  @Column() public description: string;
  @Column() public limitDate: Date;
  @Column() public status: TypeStatus | TaskStatus;
}
