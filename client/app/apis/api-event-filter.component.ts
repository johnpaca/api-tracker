import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Filter, ReportLevel } from '../shared/models/filter.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-api-event-filter',
  templateUrl: './api-event-filter.component.html',
  styleUrls: ['./api-event-filter.component.css'],

})
export class ApiEventFilterComponent  {

  
  @Input() filter: Filter;
  @Output() onFilterChange = new EventEmitter<Filter>();
  
  levels: string[] = [ReportLevel.Summary, ReportLevel.Detail];
  timePeriods: string[] = ['Last Hour', 'Last 4 Hours', 'Last 8 Hours', 'Last 24', 'Last Week', 'Last Month', 'Last Year'];
  timePeriodHours: number[] = [1,4,8,24,168,720,8760];

  submitEventFilter(filter: Filter) {
    let idx = this.timePeriods.indexOf(this.filter.timePeriodString);    
    this.filter.timePeriodHours = this.timePeriodHours[idx];
    console.log('Filter options: ', this.filter);
    this.onFilterChange.emit(this.filter);    
    
  }
  
}
