import { Component, OnInit, ApplicationRef } from '@angular/core';

import { ApiEventService } from '../services/apiEvent.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ApiEvent } from '../shared/models/apiEvent.model';
import { Filter } from '../shared/models/filter.model';

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  styleUrls: ['./api-dashboard.component.css']
})
export class ApiDashboardComponent implements OnInit {

  isLoading: boolean = true;
  apiData: {}[] = [];
  isSummaryView: boolean = true;
  isDetailView: boolean = false;
  startDate: Date;
  endDate: Date;
  filter: Filter = new Filter();

  constructor(private apiEventService: ApiEventService) { 
    console.log('api dashboard constructor');
  }

  ngOnInit() {
    this.getApiEventSummary(1);
  }
  
  onFilterChange(filter: Filter) {
    this.isSummaryView = filter.level === 'Summary' ? true : false;
    this.isDetailView = filter.level === 'Detail' ? true : false;
    if (filter.level === 'Detail') {
      this.getApiEventDetail(filter.timePeriodHours);
    } else if (filter.level === 'Summary') {
      this.getApiEventSummary(filter.timePeriodHours);  
    }
  }  

  mapResponseToDetail(data) {
    this.apiData.length = 0;
    let i = 0;
    data.forEach(element => {
      this.apiData[i] = {};
      this.apiData[i]['httpStatus'] = element.httpStatus;
      this.apiData[i]['url'] = element.url;
      this.apiData[i]['responseTimeMilliseconds'] = element.responseTimeMilliseconds;
      this.apiData[i]['responseSize'] = element.responseSize;
      this.apiData[i]['date'] = element.date;
      i++;
    });
  }

  mapResponseToSummary(data) {
    this.apiData.length = 0;
    let i = 0;
    data.forEach(element => {
      this.apiData[i] = {};
      this.apiData[i]['url'] = element.url;
      this.apiData[i]['averageResponseTimeMilliseconds'] = element.averageResponseTimeMilliseconds;
      this.apiData[i]['percentageErrorWarn'] = element.percentageErrorWarn;
      this.apiData[i]['status'] = [];
      element.status.forEach(element2 => {
        this.apiData[i]['status'] += element2;
      });
      this.apiData[i]['count'] = element.count;
      i++;
    });
  }

  setStartDateEndDate(timePeriod: number) {
    this.endDate = new Date();
    let numberOfHours = (1000 * 60 * 60) * timePeriod;
    this.startDate = new Date(this.endDate.getTime() - numberOfHours);
  }

  getApiEventSummary(timePeriod: number) {
    this.isLoading = true;
    this.setStartDateEndDate(timePeriod);

    this.apiEventService.getApiEventSummary(this.startDate, this.endDate).subscribe(
      data => {
        this.mapResponseToSummary(data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }  

  getApiEventDetail(timePeriod: number) {
    this.isLoading = true;
    this.setStartDateEndDate(timePeriod);
    this.apiEventService.getApiEventDetail(this.startDate, this.endDate).subscribe(
      data => {
        this.mapResponseToDetail(data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );


  }



}
