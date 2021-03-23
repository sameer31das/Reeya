import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { ShareServices } from "src/app/app.services";
import { IEmployee, IStateDetail, ICity, ICityDetail } from "../../app.model";

@Component({
  selector: "app-consigner",
  templateUrl: "./consigner.component.html",
  styleUrls: ["./consigner.component.scss"],
})
export class ConsignerComponent implements OnInit, OnDestroy, OnChanges {
  emailError: boolean;
  pincodeError: boolean;
  noError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetails: any;
  @Output() consignerDetails: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<
    IStateDetail
  >();
  cityAll: ICityDetail[];
  stateId: any;
  cities: any;

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sharedService.getCity().subscribe((item) => {
      this.cityAll = item.result;
      this.onStateChange();
    });
  }
  // tslint:disable-next-line:typedef
  onStateChange() {
    this.stateId = this.generalForm.controls.state.value;
    this.cities = this.cityAll?.filter(
      (d) => d.state["id"] === Number(this.stateId)
    );
  }
  generateForms() {
    const group = {
      state: [this.initialFormDetails.controls.state.value],
      city: [this.initialFormDetails.controls.city.value],
      name: [this.initialFormDetails.controls.name.value],
      add: [this.initialFormDetails.controls.add.value],
      pincode: [
        this.initialFormDetails.controls.pincode.value,
        Validators.pattern("[0-9 ]*"),
      ],
      emailadd: [
        this.initialFormDetails.controls.emailadd.value,
        Validators.email,
      ],
      mobileno: [
        this.initialFormDetails.controls.mobileno.value,
        Validators.pattern("[0-9 ]*"),
      ],
    };
    if (this.cityAll) {
      this.onStateChange();
    }
    this.generalForm = this.fb.group(group);
  }
  checkEmail() {
    if (this.generalForm.controls.emailadd.valid) {
      this.emailError = false;
    } else {
      this.emailError = true;
    }
  }
  checkPincode() {
    if (this.generalForm.controls.pincode.valid) {
      this.pincodeError = false;
    } else {
      this.pincodeError = true;
    }
  }
  checkNo() {
    if (this.generalForm.controls.mobileno.valid) {
      this.noError = false;
    } else {
      this.noError = true;
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.consignerDetails.emit(this.generalForm.value);
  }
}
