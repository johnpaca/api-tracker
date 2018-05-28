import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Api } from '../shared/models/api.model';
import { Header } from '../shared/models/api.model';

@Component({
  selector: 'app-api-add',
  templateUrl: './api-add.component.html',
  styleUrls: ['./api-add.component.css']
})
export class ApiAddComponent implements OnInit {

  @Output() onApiAdd = new EventEmitter<Api>();

  api = new Api();

  addApiForm: FormGroup;
  hostName = new FormControl('', Validators.required);
  path = new FormControl('', Validators.required);
  data = new FormControl('');
  method = new FormControl('', Validators.required);


  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }


  ngOnInit() {
    this.addApiForm = this.formBuilder.group({
      hostName: this.hostName,
      path: this.path,
      headers: this.formBuilder.array([this.initHeader()]),
      method: this.method,
      data: this.data
    });
  }

  initHeader() {
    // initialize our header array
    return this.formBuilder.group({
      key: ['', Validators.required],
      value: ['']
    });
  }

  addApi() {
    console.log('Adding api', this.addApiForm.value);
    this.onApiAdd.emit(this.createApiObject());
  }

  createApiObject() {
    let api = new Api();
    api.hostName = this.addApiForm.value.hostName;
    api.path = this.addApiForm.value.path;
    api.method = this.addApiForm.value.method;
    api.data = this.addApiForm.value.data;
    api.headers = new Array();

    let arrayControl = <FormArray>this.addApiForm.controls['headers'];

    let i;
    for (i = 0; i < arrayControl.value.length; i++) {
      let header = new Header();
      header.key = arrayControl.value[i].key;
      header.value = arrayControl.value[i].value;
      api.headers[i] = header;
    }

    return api;
  }

  addHeader() {

    // add header to the list
    const control = <FormArray>this.addApiForm.controls['headers'];
    control.push(this.initHeader());
  }

  removeHeader(index: number) {
    const control = <FormArray>this.addApiForm.controls['headers'];
    control.removeAt(index);
  }

}
