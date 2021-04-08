import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-consignmentdetail",
  templateUrl: "./consignmentdetail.component.html",
  styleUrls: ["./consignmentdetail.component.css"],
})
export class ConsignmentdetailComponent implements OnInit {
  @Input() initialFormDetails: any;
  @Output() Detail: EventEmitter<any> = new EventEmitter<any>();
  @Output() Schedules: EventEmitter<any> = new EventEmitter<any>();
  @Output() Attachment: EventEmitter<any> = new EventEmitter<any>();
  @Output() Remarks: EventEmitter<any> = new EventEmitter<any>();
  @Output() Invoices: EventEmitter<any> = new EventEmitter<any>();
  @Output() Items: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  section = 0;

  ngOnInit() {}

  Details(data) {
    this.Detail.emit(data);
  }
  remarks(data) {
    this.Remarks.emit(data);
  }
  invoices(data) {
    this.Invoices.emit(data);
  }
  items(data) {
    this.Items.emit(data);
  }
  Schedule(data) {
    this.Schedules.emit(data);
  }
  Attachments(data) {
    this.Attachment.emit(data);
  }
}
