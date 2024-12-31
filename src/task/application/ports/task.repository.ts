import { Observable } from 'rxjs';
import { Task } from '../../domain';

export abstract class TaskRepository {
  abstract findAll(): Observable<Task[]>;
  abstract findById(id: string): Observable<Task>;
  abstract create(task: Task): Observable<Task>;
  abstract update(id: string, task: Task): Observable<Task>;
  abstract delete(id: string): Observable<boolean>;
}
