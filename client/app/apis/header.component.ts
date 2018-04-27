// header.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Header } from '../shared/models/api.model';

@Component({
    moduleId: module.id,
    selector: 'header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    // we will pass in header from App component
    @Input('group')
    public headerForm: FormGroup;

   
    ngOnInit() {

    }
    
}
