import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('task')
export class TaskData {
  @PrimaryColumn() public id: string;
  @Column() public userId: string;
  @Column() public userName: string;
  @Column() public title: string;
  @Column() public description: string;
  @Column() public limitDate: Date;
  @Column() public status: string;
}
