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
  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }
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
      invoiceDate: [""],
      totalValue: [""],
      description: [""],
      quantity: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  invoiceArray = [];
  invoiceArrayForDisplay = [];

  selectInvoice(file: FileList) {
    this.fileInvoice = file["target"].files[0];
    this.invoiceSubscription = this.sharedService
      .uploadDocument(this.fileInvoice)
      .subscribe((invoice) => {
        this.generalForm.controls.invoice.setValue(invoice.result);

        const newData = {
          invoices: this.generalForm.controls.invoiceNo.value,
          invoiceDate: this.generalForm.controls.invoiceDate.value,
          totalValue: this.generalForm.controls.totalValue.value,
          description: this.generalForm.controls.description.value,
          quantity: this.generalForm.controls.quantity.value,
        };

        // for submit data
        const invoiceData = {
          invoiceUrl: this.generalForm.controls.invoice.value,
          invoiceNumber: this.generalForm.controls.invoiceNo.value,
          invoiceDate: new Date(this.generalForm.controls.invoiceDate.value).toISOString(),
          invoiceValue: this.generalForm.controls.totalValue.value,
          itemDescription: this.generalForm.controls.description.value,
          quantity: this.generalForm.controls.quantity.value,
        };
        this.invoiceArray.push(invoiceData);
        this.invoiceArrayForDisplay.push(newData);
      });
  }
  delete(item) {
    this.invoiceArray.splice(item, 1);
    this.invoiceArrayForDisplay.splice(item, 1);
  }
  ngOnDestroy() {
    this.Invoices.emit(this.invoiceArray);
  }
}
