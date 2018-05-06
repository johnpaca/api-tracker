import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { Api } from '../shared/models/api.model';
import { Header } from '../shared/models/api.model';

@Component({
  selector: 'app-api-edit',
  templateUrl: './api-edit.component.html',
  styleUrls: ['./api-edit.component.css']
})
export class ApiEditComponent implements OnInit {

  @Input() api?: Api;
  @Output('onApiAdd') onApiAdd = new EventEmitter<Api>();
  @Output('onApiUpdate') onApiUpdate = new EventEmitter<Api>();
  @Output('onCancel') onCancel = new EventEmitter<boolean>();

  editApiForm: FormGroup;
  hostName = new FormControl('', Validators.required);
  path = new FormControl('', Validators.required);
  data = new FormControl('', Validators.required);
  method = new FormControl('', Validators.required);

  isNew: boolean = true;

  constructor(private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.editApiForm = this.formBuilder.group({
      hostName: this.hostName,
      path: this.path,
      headers: this.formBuilder.array([]),
      method: this.method,
      data: this.data
    });

    const control = <FormArray>this.editApiForm.controls['headers'];
    
    if (!this.api) {
      this.api = new Api();
      this.api.headers = new Array<Header>();
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    // create a formArray for each header
    this.api.headers.forEach(element => {
      control.push(this.initHeaderGroup());           
    });
  }

  cancelEditing() {
    this.onCancel.emit(true);
  }

  editAddApi(api: Api) {
    this.isNew ? this.onApiAdd.emit(api) : this.onApiUpdate.emit(api);
  }

  addHeader() {
    // add the header to the list
    const control = <FormArray>this.editApiForm.controls['headers'];
    control.push(this.initHeaderGroup()); 
    this.api.headers.push(this.initHeader());
  }

  initHeader() {
    // initialize our header array
    return { key: '', value: '' };
  }
  
  initHeaderGroup() {
    // initialize our header array
    return this.formBuilder.group({
        key: ['', Validators.required],
        value: ['']
    });
  }
  
  removeHeader(index: number) {
    const control = <FormArray>this.editApiForm.controls['headers'];
    control.removeAt(index);
  }  
  

}
