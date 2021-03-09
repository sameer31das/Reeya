import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ICityDetail, IStateDetail } from '../../app.model';
import { ShareServices } from '../../app.services';

@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.scss']
})
export class ConsigneeComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }

  @Output() consigneeDetails: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() stateLists: EventEmitter<IStateDetail> = new EventEmitter<IStateDetail>();
  @Input() tab = 1;
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
    this.stateId = this.generalForm.controls.consigneestate.value;
    this.cities = this.cityAll.filter(d => d.state["id"] === Number(this.stateId))
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      consigneestate: [''],
      consigneecity: [''],
      consigneenameandadd: [''],
      consigneepincode: [''],
      consigneeemailadd: [''],
      consigneemobileno: ['']

    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  submit() {
    this.consigneeDetails.emit(this.generalForm.value);
  }



}
