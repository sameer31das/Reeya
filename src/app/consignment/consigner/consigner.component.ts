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
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<IStateDetail>();
  cityAll: ICityDetail[];
  stateId: any;
  cities: any;

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
    this.sharedService.getCity().subscribe(item => {
      this.cityAll = item.result;
    });

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  // tslint:disable-next-line:typedef
  onStateChange(data) {
    this.stateId = this.generalForm.controls.state.value;
    this.cities = this.cityAll.filter(d => d.state["id"] === Number(this.stateId))
  }
  generateForms() {
    const group = {
      state: [''],
      city: [''],
      nameandadd: [''],
      pincode: [''],
      emailadd: [''],
      mobileno: ['']

    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.consignerDetails.emit(this.generalForm.value);
  }

}
