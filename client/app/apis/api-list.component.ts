import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Api } from '../shared/models/api.model';
import { Header } from '../shared/models/api.model';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {

  //api = new Api();
  apis: Api[] = [];
  isLoading = true;
  isEditing: boolean[] = [];

  addApiForm: FormGroup;
  hostName = new FormControl('', Validators.required);
  path = new FormControl('', Validators.required);
  data = new FormControl('', Validators.required);
  method = new FormControl('', Validators.required);


  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public applicationRef: ApplicationRef) { }

  ngOnInit() {

    this.clearEditFlags();

    this.getApis();
    this.addApiForm = this.formBuilder.group({
      hostName: this.hostName,
      path: this.path,
      headers: this.formBuilder.array([this.initHeader()]),
      method: this.method,
      data: this.data
    });
  }

  clearEditFlags() {
    this.isEditing.forEach(element => {
      element = false;
    }); 
  }

  initHeader() {
    // initialize our header array
    return this.formBuilder.group({
        key: ['', Validators.required],
        value: ['']
    });
  }
  
  getApis() {
    this.apiService.getApis().subscribe(
      data => {

        console.log(data);
        let i = 0;
        data.forEach(element => {
          console.log(element);

          this.apis[i] = new Api();
          this.apis[i]._id = element._id;
          this.apis[i].data = element.data;
          this.apis[i].hostName = element.hostName;
          this.apis[i].method = element.method;
          this.apis[i].path = element.path;

          let j = 0;
          this.apis[i].headers = new Array();
          element.headers.forEach(element => {
            this.apis[i].headers[j] = new Header();
            this.apis[i].headers[j].key = element.hasOwnProperty('key') ? element.key : '';
            this.apis[i].headers[j].value = element.hasOwnProperty('value') ? element.value : '';
            j++;
          });

          this.isEditing[i] = false;

          i++;
        });
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addApi() {
    console.log(this.addApiForm.value);

    this.apiService.addApi(this.createApiObject()).subscribe(
      res => {
        this.apis.push(res);
        this.addApiForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  onApiAdd(api: Api) {
  
    console.log('onApiAdd: adding api ', api);
    
    this.apiService.addApi(api).subscribe(
        res => {
          this.apis.push(res);
          this.addApiForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error)
      );
      
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

  enableEditing(i: number) {
    this.clearEditFlags();
    this.isEditing[i] = true;
  }

  cancelEditing(value: true) {
    this.clearEditFlags();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the apis to reset the editing
    this.getApis();
  }

  onApiUpdate(api: Api) {
    this.clearEditFlags();
    this.apiService.editApi(api).subscribe(
      () => {
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );

    this.getApis();

  }

  deleteApi(api: Api) {
    console.log('deleting ', api);
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.apiService.deleteApi(api).subscribe(
        () => {
          this.clearEditFlags();
          const pos = this.apis.map(elem => elem._id).indexOf(api._id);
          this.apis.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }



}
