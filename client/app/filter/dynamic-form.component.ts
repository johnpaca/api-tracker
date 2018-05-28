import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { FilterBase } from './filter-base';
import { FilterControlService } from './filter-control.service';
import { Filter } from '../shared/models/filter.model';
import { FilterService } from '../filter/filter.service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FilterControlService, FilterService ]
})
export class DynamicFormComponent implements OnInit {
 
  filters: FilterBase<any>[] = [];

  @Output() onFilterChange = new EventEmitter<Filter>();
  
  form: FormGroup;
  currentFilter: Filter = new Filter();
  payLoad: string;
 
  constructor(private fcs: FilterControlService, private service: FilterService ) {  
    console.log('constructor');
    this.filters = this.service.getFilters();
    this.form = this.fcs.toFormGroup(this.filters);
  }
 
  ngOnInit() {
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.currentFilter.level = this.form.value.level;
    this.currentFilter.timePeriod = this.form.value.time;
    this.onFilterChange.emit(this.currentFilter);
    
  }
}
