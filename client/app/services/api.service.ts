import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Api } from '../shared/models/api.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getApis(): Observable<Api[]> {
    return this.http.get<Api[]>('/api/apis');
  }

  countApis(): Observable<number> {
    return this.http.get<number>('/api/apis/count');
  }

  addApi(Api: Api): Observable<Api> {
    return this.http.post<Api>('/api/api', Api);
  }

  getApi(Api: Api): Observable<Api> {
    return this.http.get<Api>(`/api/api/${Api._id}`);
  }

  editApi(Api: Api): Observable<string> {
    return this.http.put(`/api/api/${Api._id}`, Api, { responseType: 'text' });
  }

  deleteApi(Api: Api): Observable<string> {
    return this.http.delete(`/api/api/${Api._id}`, { responseType: 'text' });
  }

}
