import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-attachments",
  templateUrl: "./attachments.component.html",
  styleUrls: ["./attachments.component.scss"],
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  fileEway: any;
  fileInvoice: any;
  filePhoto: any;
  lblPhoto = "No file chosen";
  lblInvoice = "No file chosen";
  lblEway = "No file chosen";

  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }
  @Input() initialFormDetails: any;
  photoSubscription:Subscription;
  eWaySubscription:Subscription;
  invoiceSubscription:Subscription;
  @Output() Attachments: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  generateForms() {
    const group = {
      invoice: [""],
      photo: [""],
      bill: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  selectInvoice(file: FileList) {
    this.fileInvoice = file["target"].files[0];
    this.lblInvoice = this.fileInvoice["name"];
   this.invoiceSubscription= this.sharedService.uploadDocument(this.fileInvoice).subscribe((invoice) => {
      this.generalForm.controls.invoice.setValue(invoice.result);
    });
  }

  selectPhoto(file: FileList) {
    this.filePhoto = file["target"].files[0];
    this.lblPhoto = this.filePhoto["name"];
    this.photoSubscription=this.sharedService.uploadDocument(this.filePhoto).subscribe((photoRes) => {
      this.generalForm.controls.photo.setValue(photoRes.result);
    });

  }
  selectEwayBill(file: FileList) {
    this.fileEway = file["target"].files[0];
    this.lblEway = this.fileEway["name"];
    this.eWaySubscription=this.sharedService.uploadDocument(this.fileEway).subscribe((eway) => {
      this.generalForm.controls.bill.setValue(eway.result);
    });
  }
  ngOnDestroy() {
    this.Attachments.emit(this.generalForm.value);
    if(this.invoiceSubscription){
      this.invoiceSubscription.unsubscribe();
    }
    if(this.photoSubscription){
      this.photoSubscription.unsubscribe();
    }
    if(this.eWaySubscription){
      this.eWaySubscription.unsubscribe();
    }
  }
}
