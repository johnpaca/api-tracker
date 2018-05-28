import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { FilterBase }     from './filter-base';
 
@Component({
  selector: 'app-filter',
  templateUrl: './dynamic-form-filter.component.html'
})
export class DynamicFormFilterComponent {
  
  @Input() filter: FilterBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.filter.key].valid; }
}
