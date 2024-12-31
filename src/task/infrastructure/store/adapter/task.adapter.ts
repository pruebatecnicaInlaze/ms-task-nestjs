import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';

import { TaskRepository } from '../../../application';
import { Task } from '../../../domain';
import { TaskData } from '../entities';
import { TaskMapper } from '../mappers';

@Injectable()
export class TaskAdapter implements TaskRepository {
  constructor(
    @InjectRepository(TaskData)
    private readonly taskRepository: Repository<TaskData>,
  ) {}
  public findAll(): Observable<Task[]> {
    return from(this.taskRepository.find()).pipe(
      map((taskDataArray) =>
        taskDataArray.map((taskData) => TaskMapper.toDomain(taskData)),
      ),
    );
  }
  public findById(id: string): Observable<Task> {
    return from(this.taskRepository.findOne({ where: { id } })).pipe(
      map((taskData) => TaskMapper.toDomain(taskData)),
    );
  }
  public create(task: Task): Observable<Task> {
    return from(this.taskRepository.save(task)).pipe(
      map((createdTaskData) => TaskMapper.toDomain(createdTaskData)),
    );
  }
  public update(id: string, task: Task): Observable<Task> {
    return from(this.taskRepository.update({ id }, task)).pipe(
      switchMap(() => this.taskRepository.findOne({ where: { id } })),
      map((updatedTaskData) => TaskMapper.toDomain(updatedTaskData)),
    );
  }
  public delete(id: string): Observable<boolean> {
    return from(this.taskRepository.delete({ id })).pipe(map(() => true));
  }
}
