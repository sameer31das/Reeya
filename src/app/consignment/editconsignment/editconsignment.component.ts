import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  Inject,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IAssignEmployeeParams, IEmployees } from "src/app/app.model";
import { ShareServices } from "../../app.services";
import { formatDate } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-editconsignment",
  templateUrl: "./editconsignment.component.html",
  styleUrls: ["./editconsignment.component.css"],
})
export class EditConsignmentComponent implements OnInit, OnDestroy {
  fileEway: any;
  lblEway: any;
  lng: any;
  lat: any;
  updateStatusResponse: any;
  rescheduleStatusResponse: any;
  eWaySubscription: Subscription;
  statusData: any[];
  ewayBill:string;
  lblStatus:string;
  lblStatusAssign:string;
  lblReschedule:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sharedService: ShareServices,
    public dialogRef: MatDialogRef<EditConsignmentComponent>
  ) {}
  section = 0;
  drpEmployee: any;
  generalForm: FormGroup;
  // statuses = [{ name: "delivered", id: 3 }];
  statuses = [];
  newUpdateData: any;
  rescheduleData = { status: this.newUpdateData, deliveryDate: "" };
  ngOnInit() {
    this.sharedService.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.lng = pos.lng;

      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
    this.generateForms();
    this.sharedService.getEmployee().subscribe((data) => {
      this.drpEmployee = data.result;
    });
    this.sharedService.getConsignmentStatus().subscribe((data) => {
      this.statuses = data.result;
      this.statusData = Object.values(this.statuses);
    });
  }
  generateForms() {
    const group = {
      employeeList: [""],
      photo: [""],
      bill: [""],
      statusLabel: [""],
      status: [""],
      carrier: [""],
      txtRescheduledDate: [""],
      reason: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  onSelectionChange(status) {
    let _key = Object.keys(this.statuses).find(
      (key) => this.statuses[key] === status
    );
    this.generalForm.controls.status.setValue(_key);
  }
  submitUpdateSection() {
    this.newUpdateData = {
      latitude: this.lat,
      longitude: this.lng,
      status: Number(this.generalForm.controls.status.value),
      reason: this.generalForm.controls.reason.value,

      ewayBillUrl: this.ewayBill,
      carrier: this.generalForm.controls.carrier.value,
    };

    this.sharedService
      .updateStatus(Number(this.data?.id), this.newUpdateData)
      .subscribe((submitData) => {
        this.updateStatusResponse = submitData;
        this.lblStatus=submitData["message"]
      });
  }

  submitRescheduleSection() {
    if (this.newUpdateData !== undefined) {
      this.rescheduleData.status = this.newUpdateData;
    } else {
      this.rescheduleData.status = {
        latitude: this.lat,
        longitude: this.lng,
        status: 7,// rescheduled
        reason: this.generalForm.controls.reason.value,

        ewayBillUrl: "",
        carrier: "",
      };
    }

    this.rescheduleData.deliveryDate = new Date(
      this.generalForm.controls.txtRescheduledDate.value
    ).toISOString();

    this.sharedService
      .rescheduledDate(this.data?.id, this.rescheduleData)
      .subscribe((submitData) => {
        this.rescheduleStatusResponse = submitData;
        this.lblReschedule=submitData["message"];
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectEwayBill(file: FileList) {
    this.fileEway = file["target"].files[0];
    this.lblEway = this.fileEway["name"];
    this.sharedService.uploadDocument(this.fileEway).subscribe((eway) => {
      this.ewayBill=eway.result;
    });
  }
  assignEmployee(): void {
    const empParam: IAssignEmployeeParams = {
      id: this.data?.id,
      assignedTo: this.generalForm.controls.employeeList.value,
    };
    this.sharedService.assignEmployee(empParam).subscribe((data) => {
      this.lblStatusAssign=data["message"];
    });
  }
  ngOnDestroy() {
    if (this.eWaySubscription) {
      this.eWaySubscription.unsubscribe();
    }
  }
}
