import { Observable } from 'rxjs';

export abstract class HttpRepository {
  abstract get<T>(url: string): Observable<T>;
}
