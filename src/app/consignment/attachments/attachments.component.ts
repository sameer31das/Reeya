import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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

  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetails: any;
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
    //this.generalForm.controls.invoice.setValue(file);
    this.sharedService.uploadDocument(this.fileInvoice).subscribe((item) => {});
    this.generalForm.controls.invoice.setValue(this.lblInvoice);
  }

  selectPhoto(file: FileList) {
    this.filePhoto = file["target"].files[0];
    this.lblPhoto = this.filePhoto["name"];
    this.sharedService.uploadDocument(this.filePhoto).subscribe((item) => {});
    //this.generalForm.controls.invoice.setValue(this.lblPhoto);
  }
  selectEwayBill(file: FileList) {
    this.fileEway = file["target"].files[0];
    this.lblEway = this.fileEway["name"];
    this.sharedService.uploadDocument(this.fileEway).subscribe((item) => {});
    //this.generalForm.controls.invoice.setValue(this.lblEway);
  }

  ngOnDestroy() {
    this.Attachments.emit(this.generalForm.value);
  }
}
