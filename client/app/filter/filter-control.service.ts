import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FilterBase } from './filter-base';

@Injectable()
export class FilterControlService {
  constructor() { }

  toFormGroup(filters: FilterBase<any>[] ) {
    let group: any = {};

    filters.forEach(filter => {
      group[filter.key] = filter.required ? new FormControl(filter.value || '', Validators.required)
                                              : new FormControl(filter.value || '');
      console.log('adding filter: ' + filter.key + ' filter value: ' + filter.value);                                        
    });
    return new FormGroup(group);
  }
}