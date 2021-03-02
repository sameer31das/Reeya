import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ShareServices } from 'src/app/app.services';
import { IEmployee, IStateDetail, ICity, ICityDetail } from '../../app.model';

@Component({
  selector: 'app-consigner',
  templateUrl: './consigner.component.html',
  styleUrls: ['./consigner.component.scss']
})
export class ConsignerComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }

  @Output() consignerDetails: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() state: EventEmitter<IStateDetail> = new EventEmitter<IStateDetail>();
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
  this.stateId = this.generalForm.controls.state.value;
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
      state:  [''],
      city:  [''],
      nameandadd: [''],
      pincode:  [''],
      emailadd:  [''],
      mobileno:  ['']

    };
    this.generalForm = this.fb.group(group);
}
// tslint:disable-next-line:typedef
ngOnDestroy() {
  this.consignerDetails.emit(this.generalForm.value);
}

}
