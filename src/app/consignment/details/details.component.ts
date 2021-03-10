import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) {}
  @Input() initialFormDetail: any;
  @Output() Details: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      totalprice: [this.initialFormDetail.controls.totalprice.value],
      declaredmaterial: [
        this.initialFormDetail.controls.declaredmaterial.value,
      ],
      value: [this.initialFormDetail.controls.value.value],
      declaredweight: [this.initialFormDetail.controls.declaredweight.value],
      actualWeight: [this.initialFormDetail.controls.actualWeight.value],
    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Details.emit(this.generalForm.value);
  }
}
