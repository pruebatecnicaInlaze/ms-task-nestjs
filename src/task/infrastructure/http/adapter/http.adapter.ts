import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

import { HttpRepository } from '../../../application';

@Injectable()
export class HttpAdapter implements HttpRepository {
  constructor(private readonly httpService: HttpService) {}
  get<T>(url: string): Observable<T> {
    return this.httpService.get(url).pipe(map((response) => response.data));
  }
}
