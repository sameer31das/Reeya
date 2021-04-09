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
      invoice: [""],
      length: [""],
      width: [""],
      height: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  invoiceArray = [];

  selectInvoice(file: FileList) {
    this.fileInvoice = file["target"].files[0];

    this.invoiceSubscription = this.sharedService
      .uploadDocument(this.fileInvoice)
      .subscribe((invoice) => {
        this.generalForm.controls.invoice.setValue(invoice.result);

        const newData = {
          length: this.generalForm.controls.length.value,
          width: this.generalForm.controls.width.value,
          height: this.generalForm.controls.height.value,
          description: this.generalForm.controls.invoice.value,
        };
        this.invoiceArray.push(newData);
      });
  }
  delete(item) {
    this.invoiceArray.splice(item, 1);
  }
  ngOnDestroy() {
    this.Items.emit(this.invoiceArray);
  }
}
