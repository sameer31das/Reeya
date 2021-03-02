import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareServices } from '../app.services';

@Component({
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {
  state: any;


  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }
  tab = 1;
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
    this.sharedService.getState().subscribe(data => {

       this.state = data.result;

    });

  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      customername: [''],
      state: [''],
      city: [''],
      nameandadd: [''],
      pincode: [''],
      emailadd: [''],
      mobileno: [''],
      consigneestate: [''],
      consigneecity: [''],
      consigneenameandadd: [''],
      consigneepincode: [''],
      consigneeemailadd: [''],
      consigneemobileno: [''],
      totalprice: [''],
      declaredmaterial: [''],
      value: [''],
      declaredweight: [''],
      pickup: [''],
      delivery: [''],
      mode: [''],
      vehicle: ['']

    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  consignerDetails(data) {
    this.generalForm.controls.state.setValue(data.state);
    this.generalForm.controls.city.setValue(data.city);
    this.generalForm.controls.nameandadd.setValue(data.nameandadd);
    this.generalForm.controls.pincode.setValue(data.pincode);
    this.generalForm.controls.emailadd.setValue(data.emailadd);
    this.generalForm.controls.mobileno.setValue(data.mobileno);

  }
  // tslint:disable-next-line:typedef
  consigneeDetails(data) {
    this.generalForm.controls.consigneestate.setValue(data.consigneestate);
    this.generalForm.controls.consigneecity.setValue(data.consigneecity);
    this.generalForm.controls.consigneenameandadd.setValue(data.consigneenameandadd);
    this.generalForm.controls.consigneepincode.setValue(data.consigneepincode);
    this.generalForm.controls.consigneeemailadd.setValue(data.consigneeemailadd);
    this.generalForm.controls.consigneemobileno.setValue(data.consigneemobileno);

  }
  // tslint:disable-next-line:typedef
  Detail(data) {
    this.generalForm.controls.totalprice.setValue(data.totalprice);
    this.generalForm.controls.declaredmaterial.setValue(data.declaredmaterial);
    this.generalForm.controls.value.setValue(data.value);
    this.generalForm.controls.declaredweight.setValue(data.declaredweight);
  }
  // tslint:disable-next-line:typedef
  Schedules(data) {
    this.generalForm.controls.pickup.setValue(data.pickup);
    this.generalForm.controls.delivery.setValue(data.delivery);
    this.generalForm.controls.mode.setValue(data.mode);
    this.generalForm.controls.vehicle.setValue(data.vehicle);
  }
  // tslint:disable-next-line:typedef
  next() {
    if (this.tab < 3) {
      this.tab = this.tab + 1;
    } else {
      this.tab = 1;
    }
  }

}

