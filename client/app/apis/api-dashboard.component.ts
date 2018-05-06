import { Component, OnInit, ApplicationRef } from '@angular/core';

import { ApiEventService } from '../services/apiEvent.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ApiEvent } from '../shared/models/apiEvent.model';

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  styleUrls: ['./api-dashboard.component.css']
})
export class ApiDashboardComponent implements OnInit {

  apiEvents: ApiEvent[] = [];
  isLoading: boolean = true;

  constructor(private apiEventService: ApiEventService) { }

  ngOnInit() {
    this.getApiEvents();
  }
  
  getApiEvents() {
    this.apiEventService.getApiEvents().subscribe(
      data => {

        let i = 0;
        data.forEach(element => {

          this.apiEvents[i] = new ApiEvent();
          this.apiEvents[i]._id = element._id;
          this.apiEvents[i].httpStatus = element.httpStatus;
          this.apiEvents[i].responseTimeMilliseconds = element.responseTimeMilliseconds;
          this.apiEvents[i].responseSize = element.responseSize;
          this.apiEvents[i].date = element.date;
          this.apiEvents[i].dayOfWeek = element.dayOfWeek;
          this.apiEvents[i].dayOfMonth = element.dayOfMonth;
          this.apiEvents[i].month = element.month;
          this.apiEvents[i].year = element.year;

          i++;
        });
      },
      error => console.log(error),
      () => this.isLoading = false
    );


  }



}
