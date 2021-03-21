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
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetails: any;
  @Output() consigneeDetails: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<
    IStateDetail
  >();
  @Input() tab = 1;
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
    this.stateId = this.generalForm.controls.consigneestate.value;
    this.cities = this.cityAll.filter(
      (d) => d.state["id"] === Number(this.stateId)
    );
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      consigneestate: [
        this.initialFormDetails.controls.consigneestate.value,
        Validators.required,
      ],
      consigneecity: [this.initialFormDetails.controls.consigneecity.value],
      consigneename: [
        this.initialFormDetails.controls.consigneename.value,
        Validators.required,
      ],
      consigneeadd: [
        this.initialFormDetails.controls.consigneeadd.value,
        Validators.required,
      ],
      consigneepincode: [
        this.initialFormDetails.controls.consigneepincode.value,
        Validators.pattern("[0-9 ]*"),
      ],
      consigneeemailadd: [
        this.initialFormDetails.controls.consigneeemailadd.value,
        Validators.email,
      ],

      consigneemobileno: [
        this.initialFormDetails.controls.consigneemobileno.value,
        Validators.pattern("[0-9 ]*"),
      ],
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
  }
  checkPincode() {
    if (this.generalForm.controls.consigneepincode.valid) {
      this.pincodeError = false;
    } else {
      this.pincodeError = true;
    }
  }
  checkNo() {
    if (this.generalForm.controls.consigneemobileno.valid) {
      this.noError = false;
    } else {
      this.noError = true;
    }
  }
  ngOnDestroy(): void {
    this.consigneeDetails.emit(this.generalForm.value);
  }
}
