import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareServices } from '../app.services';

@Component({
  selector: 'contact-us',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactUsComponent implements OnInit {

  generalForm: FormGroup;
  constructor(
    private fb: FormBuilder, private sharedService: ShareServices
  ) {
  }

  ngOnInit(): void {
    this.generateForms();
  }
  generateForms() {
    const group = {
      fullName: [''],
      contactNumber: [''],
      emailAddress: [''],
      inquiryType: 1,
      isWhatsAppEnabled: true
    };
    this.generalForm = this.fb.group(group);
  }

  onSubmit(): void {
    const submitData = {
      fullName: this.generalForm.controls.fullName.value,
      contactNumber: this.generalForm.controls.contactNumber.value,
      emailAddress: this.generalForm.controls.emailAddress.value,
      inquiryType: Number(this.generalForm.controls.inquiryType.value),
      isWhatsAppEnabled: true
    };
    this.sharedService.submitInquiry(submitData).subscribe(res => {
      console.log('Inquiry');

    });

  }


}
