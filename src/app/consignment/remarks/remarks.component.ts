import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-remarks",
  templateUrl: "./remarks.component.html",
  styleUrls: ["./remarks.component.css"],
})
export class RemarksComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Output() Remarks: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      remarks: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  ngOnDestroy() {
    this.Remarks.emit(this.generalForm.value);
  }
}
