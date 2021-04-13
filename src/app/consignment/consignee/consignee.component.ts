import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { ICityDetail, IStateDetail } from "../../app.model";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit, OnChanges, OnDestroy {
  emailError: boolean;
  pincodeError: boolean;
  noError: boolean;
  nameError: boolean;
  addError: boolean;
  cityError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetails: any;
  @Output() consigneeDetails: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<
    IStateDetail
  >();
  @Input() tab = 1;
  @Output() disableNext: EventEmitter<any> = new EventEmitter<any>();
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
    this.stateId = this.generalForm.controls.consigneestate.value;
    this.cities = this.cityAll.filter(
      (d) => d.state["id"] === Number(this.stateId)
    );
  }
  // tslint:disable-next-line:typedef

  generateForms() {
    const group = {
      consigneestate: [this.initialFormDetails.controls.consigneestate.value],

      consigneecity: new FormControl(
        this.initialFormDetails.controls.consigneecity.value,
        [
          //Validators.required,
          Validators.pattern("[a-zA-Z ]+$"),
          Validators.maxLength(64),
        ]
      ),

      consigneename: new FormControl(
        this.initialFormDetails.controls.consigneename.value,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z ]+$"),
          Validators.maxLength(68),
        ]
      ),
      consigneeadd: new FormControl(
        this.initialFormDetails.controls.consigneeadd.value,
        [
          Validators.required,
          Validators.pattern("^[#.0-9a-zA-Zs,-]+$"),
          Validators.maxLength(256),
        ]
      ),

      consigneepincode: new FormControl(
        this.initialFormDetails.controls.consigneepincode.value,
        [
          Validators.required,
          Validators.pattern("^[1-9]{1}[0-9]{5}$"),
          Validators.maxLength(6),
        ]
      ),
      consigneeemailadd: new FormControl(
        this.initialFormDetails.controls.consigneeemailadd.value,
        [Validators.required, Validators.email, Validators.maxLength(128)]
      ),
      consigneemobileno: new FormControl(
        this.initialFormDetails.controls.consigneemobileno.value,
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
  // tslint:disable-next-line:typedef
  submit() {
    this.consigneeDetails.emit(this.generalForm.value);
  }
  checkEmail() {
    if (this.generalForm.controls.consigneeemailadd.valid) {
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
    if (this.generalForm.controls.consigneepincode.valid) {
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
  checkNo() {
    if (this.generalForm.controls.consigneemobileno.valid) {
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
  checkName() {
    if (this.generalForm.controls.consigneename.valid) {
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
  checkCity() {
    if (this.generalForm.controls.consigneecity.valid) {
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
    if (this.generalForm.controls.consigneeadd.valid) {
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
  ngOnDestroy(): void {
    this.consigneeDetails.emit(this.generalForm.value);
  }
}
