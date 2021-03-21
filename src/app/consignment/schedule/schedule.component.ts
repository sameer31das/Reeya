import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @Input() initialFormDetail: any;
  dateError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Output() Schedule: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  Mode = [];
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();

    this.sharedService.getConsignmentMode().subscribe((data) => {
      this.Mode = Object.keys(data.result).map((key) => [
        Number(key),
        data.result[key],
      ]);
    });
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      pickup: [this.initialFormDetail.controls.pickup.value],
      delivery: [this.initialFormDetail.controls.delivery.value],
      mode: [this.initialFormDetail.controls.mode.value],
      vehicle: [this.initialFormDetail.controls.vehicle.value],
    };
    this.generalForm = this.fb.group(group);
  }
  checkDate() {
    if (
      this.generalForm.controls.pickup.value >
      this.generalForm.controls.delivery.value
    ) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Schedule.emit(this.generalForm.value);
  }
}
