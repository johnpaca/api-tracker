import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiEvent } from '../shared/models/apiEvent.model';

@Injectable()
export class ApiEventService {

  constructor(private http: HttpClient) { }

  getApiEvents(): Observable<ApiEvent[]> {
    return this.http.get<ApiEvent[]>('/api/api-events');
  }

  countApiEvents(): Observable<number> {
    return this.http.get<number>('/api/api-events/count');
  }


}
