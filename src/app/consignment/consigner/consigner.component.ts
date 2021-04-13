import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
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
  nameError: boolean;
  cityError: boolean;
  addError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetails: any;
  @Output() consignerDetails: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() disableNext: EventEmitter<any> = new EventEmitter<any>();
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<
    IStateDetail
  >();
  cityAll: ICityDetail[];
  stateId: any;
  cities: any;

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
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

      name: new FormControl(this.initialFormDetails.controls.name.value, [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$"),
        Validators.maxLength(68),
      ]),
      add: new FormControl(this.initialFormDetails.controls.add.value, [
        Validators.required,
        Validators.pattern("^[#.0-9a-zA-Zs,-]+$"),
        Validators.maxLength(256),
      ]),

      pincode: new FormControl(this.initialFormDetails.controls.pincode.value, [
        Validators.required,
        Validators.pattern("^[1-9]{1}[0-9]{5}$"),
        Validators.maxLength(6),
      ]),
      city: new FormControl(this.initialFormDetails.controls.city.value, [
        //Validators.required,
        Validators.pattern("[a-zA-Z ]+$"),
        Validators.maxLength(64),
      ]),
      emailadd: new FormControl(
        this.initialFormDetails.controls.emailadd.value,
        [Validators.required, Validators.email, Validators.maxLength(128)]
      ),
      mobileno: new FormControl(
        this.initialFormDetails.controls.mobileno.value,
        [
          Validators.required,
          Validators.pattern("[0-9 ]*"),
          Validators.maxLength(16),
        ]
      ),
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
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkPincode() {
    if (this.generalForm.controls.pincode.valid) {
      this.pincodeError = false;
    } else {
      this.pincodeError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkName() {
    if (this.generalForm.controls.name.valid) {
      this.nameError = false;
    } else {
      this.nameError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkNo() {
    if (this.generalForm.controls.mobileno.valid) {
      this.noError = false;
    } else {
      this.noError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkCity() {
    if (this.generalForm.controls.city.valid) {
      this.cityError = false;
    } else {
      this.cityError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkAdd() {
    if (this.generalForm.controls.add.valid) {
      this.addError = false;
    } else {
      this.addError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.generalForm.valid !== true) {
      this.disableNext.emit(true);
    } else {
      this.disableNext.emit(false);
    }
    this.consignerDetails.emit(this.generalForm.value);
  }
}
