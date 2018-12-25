import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.css']
})
export class ApiStatusComponent implements OnInit, OnChanges {

  @Input('status') status: string;

  statusArray: string[];

  ngOnInit() {
    console.log('ngOnInit:', this.status);
  }

  ngOnChanges() {
    console.log('ngOnChanges:', this.status);

    this.statusArray = [];
    if (this.status && this.status.length) {
      for (let i = 0; i < this.status.length; i++) 
        this.statusArray[i] = this.status.charAt(i);
    }
  }
}

