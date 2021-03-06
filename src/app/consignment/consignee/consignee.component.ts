import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { IStateDetail } from 'src/app/app.model';
import { ShareServices } from 'src/app/app.services';

@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.scss']
})
export class ConsigneeComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }

  @Output() consigneeDetails: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() state: EventEmitter<IStateDetail> = new EventEmitter<IStateDetail>();
  @Input() tab = 1;
  Cities = [];

  city: any;
  stateId: any;

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
}
ngOnChanges(changes: SimpleChanges): void {
  this.sharedService.getCity().subscribe(item => {

    this.city = item.result;

 });
  }
  // tslint:disable-next-line:typedef
stateChange(data){
this.Cities = [];
this.stateId = this.generalForm.controls.consigneestate.value;
if (this.city){
  this.city.forEach(element => {
    if (element.state.id === Number(this.stateId)) {
    this.Cities.push(element.name);
  }
  });
}
}
// tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      consigneestate:  [''],
      consigneecity:  [''],
      consigneenameandadd: [''],
      consigneepincode:  [''],
      consigneeemailadd:  [''],
      consigneemobileno:  ['']

    };
    this.generalForm = this.fb.group(group);
}
// tslint:disable-next-line:typedef
submit() {
  this.consigneeDetails.emit(this.generalForm.value);
}



}
