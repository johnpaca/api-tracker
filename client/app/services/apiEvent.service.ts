import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiEvent } from '../shared/models/apiEvent.model';

@Injectable()
export class ApiEventService {

  constructor(private http: HttpClient) { }

  getApiEventDetail(startDate: Date, endDate: Date): Observable<ApiEvent[]> {
    console.log('startDate ', startDate);
    console.log('endDate', endDate);
    let startDateString = this.convertDateToString(startDate);
    let endDateString = this.convertDateToString(endDate);
    let url = `/api/api-events/detail?startDate=${startDateString}&endDate=${endDateString}`;
    console.log(`url: ${url}`);
    return this.http.get<ApiEvent[]>(url);
  }

  getApiEventSummary(startDate: Date, endDate: Date): Observable<ApiEvent[]> {
    console.log('startDate ', startDate);
    console.log('endDate', endDate);
    let startDateString = this.convertDateToString(startDate);
    let endDateString = this.convertDateToString(endDate);

    let url = `/api/api-events/summary?startDate=${startDateString}&endDate=${endDateString}`;
    console.log(`url: ${url}`);
    return this.http.get<ApiEvent[]>(url);
  }

  countApiEvents(): Observable<number> {
    return this.http.get<number>('/api/api-events/count');
  }

  convertDateToString(date: Date) {
    let monthNumber = date.getMonth() + 1;
    let monthString = (monthNumber < 10) ? '0' + monthNumber : monthNumber;
    let dayOfMonth = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

    return (date.getFullYear() + "-" + 
            monthString + "-" +
            dayOfMonth + "T" +
            hour + ":" + minutes + ":" + seconds);
  }

}
