import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  @Output() Payment: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() tab = 1;

  showSeconRadioset: boolean;
  showRemark: boolean;
  commentError: boolean;
  disableNext: boolean;
  constructor(private fb: FormBuilder) {}
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }

  generateForms() {
    const group = {
      radioset1: [""],
      radioset2: [""],

      comments: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$"),
        Validators.maxLength(68),
      ]),
    };
    this.generalForm = this.fb.group(group);
  }
  onChange(event) {
    this.generalForm.controls.radioset1.setValue(event.value);
    if (event.value === "3") {
      this.showSeconRadioset = true;
    } else {
      this.showSeconRadioset = false;
    }
  }
  onChangeSet2(event) {
    this.generalForm.controls.radioset2.setValue(event.value);
    if (event.value === "Third Party") {
      this.showRemark = true;
    } else {
      this.showRemark = false;
    }
  }
  checkComment() {
    if (this.generalForm.controls.comments.valid) {
      this.commentError = false;
    } else {
      this.commentError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext = false;
    } else {
      this.disableNext = true;
    }
  }

  submit() {
    this.Payment.emit(this.generalForm.value);
  }
}
