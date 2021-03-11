import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-editconsignment",
  templateUrl: "./editconsignment.component.html",
  styleUrls: ["./editconsignment.component.css"],
})
export class EditConsignmentComponent implements OnInit {
  @Input() initialFormDetails: any;
  @Output() Detail: EventEmitter<any> = new EventEmitter<any>();
  @Output() Schedules: EventEmitter<any> = new EventEmitter<any>();
  @Output() Attachment: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  section = 0;
  // tslint:disable-next-line:typedef
  ngOnInit() {}
  // tslint:disable-next-line:typedef
  Details(data) {
    this.Detail.emit(data);
  }
  // tslint:disable-next-line:typedef
  Schedule(data) {
    this.Schedules.emit(data);
  }
  Attachments(data) {
    this.Attachment.emit(data);
  }
}
