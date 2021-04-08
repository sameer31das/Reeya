import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.css"],
})
export class InvoicesComponent implements OnInit {
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  fileInvoice: any;
  invoiceSubscription: Subscription;
  @Output() Invoices: EventEmitter<any> = new EventEmitter<any>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  generateForms() {
    const group = {
      invoice: [""],
      invoiceNo: [""],
      invoiceData: [""],
      totalValue: [""],
      description: [""],
      quantity: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  invoiceArray = [];

  selectInvoice(file: FileList) {
    this.fileInvoice = file["target"].files[0];
    // this.invoiceArray.push(this.fileInvoice);

    this.invoiceSubscription = this.sharedService
      .uploadDocument(this.fileInvoice)
      .subscribe((invoice) => {
        this.generalForm.controls.invoice.setValue(invoice.result);

        const newData = {
          invoices: this.generalForm.controls.invoiceNo.value,
          invoiceData: this.generalForm.controls.invoiceData.value,
          totalValue: this.generalForm.controls.totalValue.value,
          description: this.generalForm.controls.invoice.value,
          quantity: this.generalForm.controls.quantity.value,
        };
        this.invoiceArray.push(newData);
      });
  }
  delete(item) {
    this.invoiceArray.splice(item, 1);
  }
  ngOnDestroy() {
    this.Invoices.emit(this.invoiceArray);
  }
}
