import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareServices } from '../app.services';

@Component({
  selector: 'contact-us',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactUsComponent implements OnInit {

  generalForm: FormGroup;
  successMsg: string;
  submitted = false;
  constructor(
    private fb: FormBuilder, private sharedService: ShareServices
  ) {
  }

  ngOnInit(): void {
    this.generateForms();
  }
  generateForms() {
    const group = {
      fullName: ['',],
      contactNumber: ['', Validators.pattern("[0-9 ]*")],
      emailAddress: ['', [Validators.required, Validators.email]],
      inquiryType: 1,
      isWhatsAppEnabled: false
    };
    this.generalForm = this.fb.group(group);
  }
  get f() { return this.generalForm.controls; }
  onSubmit(): void {
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
  }
    const submitData = {
      fullName: this.generalForm.controls.fullName.value,
      contactNumber: this.generalForm.controls.contactNumber.value,
      emailAddress: this.generalForm.controls.emailAddress.value,
      inquiryType: Number(this.generalForm.controls.inquiryType.value),
      isWhatsAppEnabled: Boolean(this.generalForm.controls.isWhatsAppEnabled.value),
      origin: {
        latitude: 22.40,
        longitude: 17.71
      },
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
      createdBy: this.generalForm.controls.fullName.value,
      modifiedBy: this.generalForm.controls.fullName.value,

    };
    this.sharedService.submitInquiry(submitData)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.successMsg = data["message"];
        this.generateForms();
      }).catch((error) => {
        console.error('Error in contact:', error);
      });
  }


}
