import { Injectable }       from '@angular/core';
 
import { DropdownFilter } from './filter-dropdown';
import { FilterBase }     from './filter-base';
import { TextboxFilter }  from './filter-textbox';
import { RadioButtonFilter } from './filter-radiobutton';
 
@Injectable()
export class FilterService {
 
  getFilters() {
 
     
    let filters: FilterBase<any>[] = [
 
      new DropdownFilter({
        key: 'time',
        label: 'Time Period',
        value: 'Last Hour',
        options: [
          {key: '1',  value: 'Last Hour'},
          {key: '4',  value: 'Last 4 Hours'},
          {key: '8',  value: 'Last 8 Hours'},
          {key: '24', value: 'Today'}
        ],
        order: 2
      }),
      
      new RadioButtonFilter({
        key: 'level',
        label: 'Report Level',
        value: 'summary',
        options: [
          {key: 'summary',  value: 'Summary'},
          {key: 'detail',  value: 'Detail'}
        ],
        order: 1
      })];


    //   new TextboxFilter({
    //     key: 'firstName',
    //     label: 'First name',
    //     value: 'Bombasto',
    //     required: true,
    //     order: 3
    //   }),
 
    //   new TextboxFilter({
    //     key: 'emailAddress',
    //     label: 'Email',
    //     type: 'email',
    //     order: 4
    //   })
    // ];
 
    return filters.sort((a, b) => a.order - b.order);
  }
}