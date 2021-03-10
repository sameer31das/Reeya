import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) {}
  @Output() Details: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      totalprice: [""],
      declaredmaterial: [""],
      value: [""],
      declaredweight: [""],
      actualWeight: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Details.emit(this.generalForm.value);
  }
}
