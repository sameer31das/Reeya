import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ShareServices } from "../../app.services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  fileInvoice: any;
  invoiceSubscription: Subscription;
  @Output() Items: EventEmitter<any> = new EventEmitter<any>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  generateForms() {
    const group = {
      lengthInch: [""],
      widthInch: [""],
      heightInch: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  invoiceArray = [];

  selectInvoice(file: FileList) {

    const newData = {
      lengthInch: this.generalForm.controls.lengthInch.value,
      widthInch: this.generalForm.controls.widthInch.value,
      heightInch: this.generalForm.controls.heightInch.value,
    };
    this.invoiceArray.push(newData);
  }
  delete(item) {
    this.invoiceArray.splice(item, 1);
  }
  ngOnDestroy() {
    this.Items.emit(this.invoiceArray);
  }
}
