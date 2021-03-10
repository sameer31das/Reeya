import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { ICityDetail, IStateDetail } from "../../app.model";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit, OnChanges, OnDestroy {
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
      consigneestate: [this.initialFormDetails.controls.consigneestate.value],
      consigneecity: [this.initialFormDetails.controls.consigneecity.value],
      consigneenameandadd: [
        this.initialFormDetails.controls.consigneenameandadd.value,
      ],
      consigneepincode: [
        this.initialFormDetails.controls.consigneepincode.value,
      ],
      consigneeemailadd: [
        this.initialFormDetails.controls.consigneeemailadd.value,
      ],
      consigneemobileno: [
        this.initialFormDetails.controls.consigneemobileno.value,
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
  ngOnDestroy(): void {
    this.consigneeDetails.emit(this.generalForm.value);
  }
}
