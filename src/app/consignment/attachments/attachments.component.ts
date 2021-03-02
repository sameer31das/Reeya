import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  fileData3: any;
  fileData1: any;
  fileData2: any;
  label1 = 'No file chosen';
  label2 = 'No file chosen';
  label3 = 'No file chosen';

  constructor(private fb: FormBuilder) { }
  @Output() Details: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
}
// tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      invoice:  [''],
      photo:  [''],
      bill: [''],



    };
    this.generalForm = this.fb.group(group);
}
// tslint:disable-next-line:typedef
selectFile3(data) {
  this.fileData3 = data.target.files[0];
  this.label3 = this.fileData3.name;
}
// tslint:disable-next-line:typedef
selectFile2(data) {
  this.fileData2 = data.target.files[0];
  this.label2 = this.fileData2.name;
}
// tslint:disable-next-line:typedef
selectFile1(data) {
  this.fileData1 = data.target.files[0];
  this.label1 = this.fileData1.name;
}
// tslint:disable-next-line:typedef
ngOnDestroy() {
  this.Details.emit(this.generalForm.value);
}

}
