import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consignmentdetail',
  templateUrl: './consignmentdetail.component.html',
  styleUrls: ['./consignmentdetail.component.css']
})
export class ConsignmentdetailComponent implements OnInit {
  @Output() Detail: EventEmitter<any> = new EventEmitter<any>();
  @Output() Schedules: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  section = 0;
// tslint:disable-next-line:typedef
  ngOnInit() {
  }
  // tslint:disable-next-line:typedef
  Details(data) {
    this.Detail.emit(data);

  }
  // tslint:disable-next-line:typedef
  Schedule(data) {
    this.Schedules.emit(data);
  }

}

