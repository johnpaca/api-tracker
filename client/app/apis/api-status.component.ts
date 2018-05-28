import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.css']
})
export class ApiStatusComponent implements OnInit, OnChanges {

  @Input('status') status: string;

  outputEmoji: string;

  ngOnInit() {
    console.log('ngOnInit:', this.status);
  }

  ngOnChanges() {
    console.log('ngOnChanges:', this.status);

    this.outputEmoji = '';
    for (let i = 0; i < this.status.length; i++) 
      if (this.status.charAt(i) === 'K') {
        this.outputEmoji += '😀';
      } else {
        this.outputEmoji += '5';
      }
    }
}

