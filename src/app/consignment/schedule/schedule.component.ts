import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ShareServices } from "../../app.services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @Input() initialFormDetail: any;
  dateError: boolean;
  billError: boolean;
  modeError: boolean;
  vehicleError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Output() Schedule: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() disableNext: EventEmitter<any> = new EventEmitter<any>();
  lblEway = "No file chosen";
  fileEway: any;
  eWaySubscription: Subscription;

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
      pickup: [
        this.initialFormDetail.controls.pickup.value,
        Validators.required,
      ],
      delivery: [
        this.initialFormDetail.controls.delivery.value,
        Validators.required,
      ],
      mode: [this.initialFormDetail.controls.mode.value, Validators.required],

      bill: [""],
      vehicle: new FormControl(this.initialFormDetail.controls.vehicle.value, [
        Validators.pattern(" ^[#.0-9a-zA-Zs,-]+$"),
        Validators.maxLength(32),
      ]),
      billno: new FormControl(this.initialFormDetail.controls.billno.value, [
        Validators.pattern("[0-9]{12}$"),
        Validators.maxLength(16),
      ]),
    };
    this.generalForm = this.fb.group(group);
  }
  selectEwayBill(file: FileList) {
    this.fileEway = file["target"].files[0];
    this.lblEway = this.fileEway["name"];
    this.eWaySubscription = this.sharedService
      .uploadDocument(this.fileEway)
      .subscribe((eway) => {
        this.generalForm.controls.bill.setValue(eway.result);
      });
  }
  checkBill() {
    if (this.generalForm.controls.billno.valid) {
      this.billError = false;
    } else {
      this.billError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkVehicle() {
    if (this.generalForm.controls.vehicle.valid) {
      this.vehicleError = false;
    } else {
      this.vehicleError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkDate() {
    if (
      this.generalForm.controls.pickup.value >
        this.generalForm.controls.delivery.value &&
      this.generalForm.controls.pickup.valid &&
      this.generalForm.controls.delivery.valid
    ) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }
  checkMode() {
    if (this.generalForm.controls.mode.valid) {
      this.modeError = true;
    } else {
      this.modeError = false;
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Schedule.emit(this.generalForm.value);
  }
}
