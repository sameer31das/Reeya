import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICityDetail, IStateDetail } from "../app.model";
import { ShareServices } from "../app.services";

@Component({
  templateUrl: "./consignment.component.html",
  styleUrls: ["./consignment.component.css"],
})
export class ConsignmentComponent implements OnInit {
  stateLists: IStateDetail[];
  submitResponse: any;
  newConsignment: any;
  latitude: any;
  longitude: any;
  date: Date = new Date();

  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  tab = 1;
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
    this.sharedService.getState().subscribe((data) => {
      this.stateLists = data.result;
    });
    this.sharedService.getPosition().then((pos) => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;

      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      customername: [""],
      state: [""],
      city: [""],
      nameandadd: [""],
      pincode: [""],
      emailadd: [""],
      mobileno: [""],
      consigneestate: [""],
      consigneecity: [""],
      consigneenameandadd: [""],
      consigneepincode: [""],
      consigneeemailadd: [""],
      consigneemobileno: [""],
      totalprice: [""],
      declaredmaterial: [""],
      value: [""],
      declaredweight: [""],
      pickup: [""],
      delivery: [""],
      mode: [""],
      vehicle: [""],
      actualWeight: [""],
      invoice: [""],
      photo: [""],
      bill: [""],
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
    this.generalForm.controls.consigneenameandadd.setValue(
      data.consigneenameandadd
    );
    this.generalForm.controls.consigneepincode.setValue(data.consigneepincode);
    this.generalForm.controls.consigneeemailadd.setValue(
      data.consigneeemailadd
    );
    this.generalForm.controls.consigneemobileno.setValue(
      data.consigneemobileno
    );
    this.generalForm.controls.actualWeight.setValue(data.actualWeight);

    this.newConsignment = {
      id: 0,
      createdOn: this.date,
      modifiedOn: "2021-03-06T17:53:12.949Z",
      createdBy: "chandresh.makwana@cargo-xpert.in",
      modifiedBy: "chandresh.makwana@cargo-xpert.in",
      customerName: this.generalForm.controls.customername.value,
      trackingId: "",
      consigner: {
        name: "TKM Bidadi",
        address: this.generalForm.controls.nameandadd.value,
        pincode: this.generalForm.controls.pincode.value,
        city: this.generalForm.controls.city.value,
        email: this.generalForm.controls.emailadd.value,
        phone: this.generalForm.controls.mobileno.value,
      },
      consignee: {
        name: "TKM Pune",
        address: this.generalForm.controls.consigneenameandadd.value,
        pincode: this.generalForm.controls.consigneepincode.value,
        city: this.generalForm.controls.consigneecity.value,
        email: this.generalForm.controls.consigneeemailadd.value,
        phone: this.generalForm.controls.consigneemobileno.value,
      },
      status: {
        latitude: this.latitude,
        longitude: this.longitude,
        status: 3,
        reason: "",
        ewayBillUrl: this.generalForm.controls.bill.value,
        carrier: this.generalForm.controls.vehicle.value,
      },
      schedule: {
        pickupDate: this.generalForm.controls.pickup.value,
        deliveryDate: this.generalForm.controls.delivery.value,
        pickupOn: null,
        deliveredOn: null,
        mode: 4,
      },
      billAmount: 0,
      content: {
        photoUrl: this.generalForm.controls.photo.value,
        invoiceUrl: this.generalForm.controls.invoice.value,
        value: this.generalForm.controls.value.value,
        itemsCount: 3,
        declaredWeight: this.generalForm.controls.declaredweight.value,
        actualWeight: this.generalForm.controls.actualWeight.value,
        declaredMaterial: this.generalForm.controls.declaredmaterial.value,
      },
    };

    this.sharedService
      .submitData(this.newConsignment)
      .subscribe((submitData) => {
        this.submitResponse = submitData;
      });
  }
  // tslint:disable-next-line:typedef
  Detail(data) {
    this.generalForm.controls.totalprice.setValue(data.totalprice);
    this.generalForm.controls.declaredmaterial.setValue(data.declaredmaterial);
    this.generalForm.controls.value.setValue(data.value);
    this.generalForm.controls.declaredweight.setValue(data.declaredweight);
  }
  attachments(data) {
    this.generalForm.controls.bill.setValue(data.bill);
    this.generalForm.controls.invoice.setValue(data.invoice);
    this.generalForm.controls.photo.setValue(data.photo);
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
