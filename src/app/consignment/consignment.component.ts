import { formatDate } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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

  constructor(
    private fb: FormBuilder,
    private sharedService: ShareServices,
    private router: Router
  ) {}
  tab = 1;
  generalForm: FormGroup;
  invoiceList = [];
  itemsList = [];
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
      name: [""],
      add: [""],
      pincode: [""],
      emailadd: [""],
      mobileno: [""],
      consigneestate: [""],
      consigneecity: [""],
      consigneename: [""],
      consigneeadd: [""],
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
      billno: [""],
      actualWeight: [""],
      invoice: [""],
      photo: [""],
      bill: [""],
      remarks: [""],
      radioset1: [""],
      radioset2: [""],
      comments: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  // tslint:disable-next-line:typedef
  consignerDetails(data) {
    this.generalForm.controls.state.setValue(data.state);
    this.generalForm.controls.city.setValue(data.city);
    this.generalForm.controls.name.setValue(data.name);
    this.generalForm.controls.add.setValue(data.add);
    this.generalForm.controls.pincode.setValue(data.pincode);
    this.generalForm.controls.emailadd.setValue(data.emailadd);
    this.generalForm.controls.mobileno.setValue(data.mobileno);
  }
  Payments(data) {
    this.generalForm.controls.radioset1.setValue(data.radioset1);
    this.generalForm.controls.radioset2.setValue(data.radioset2);
    this.generalForm.controls.comments.setValue(data.comments);
    this.submitData();
  }
  // tslint:disable-next-line:typedef
  consigneeDetails(data) {
    this.generalForm.controls.consigneestate.setValue(data.consigneestate);
    this.generalForm.controls.consigneecity.setValue(data.consigneecity);
    this.generalForm.controls.consigneename.setValue(data.consigneename);
    this.generalForm.controls.consigneeadd.setValue(data.consigneeadd);
    this.generalForm.controls.consigneepincode.setValue(data.consigneepincode);
    this.generalForm.controls.consigneeemailadd.setValue(
      data.consigneeemailadd
    );
    this.generalForm.controls.consigneemobileno.setValue(
      data.consigneemobileno
    );
  }
  Detail(data) {
    this.generalForm.controls.totalprice.setValue(data.totalprice);
    this.generalForm.controls.declaredmaterial.setValue(data.declaredmaterial);
    this.generalForm.controls.value.setValue(data.value);
    this.generalForm.controls.declaredweight.setValue(data.declaredweight);
    this.generalForm.controls.actualWeight.setValue(data.actualWeight);
    this.generalForm.controls.photo.setValue(data.photo);
  }
  attachments(data) {
    this.generalForm.controls.bill.setValue(data.bill);
    this.generalForm.controls.invoice.setValue(data.invoice);
    this.generalForm.controls.photo.setValue(data.photo);
  }
  Schedules(data) {
    this.generalForm.controls.pickup.setValue(data.pickup);
    this.generalForm.controls.delivery.setValue(data.delivery);
    this.generalForm.controls.mode.setValue(data.mode);
    this.generalForm.controls.vehicle.setValue(data.vehicle);
    this.generalForm.controls.billno.setValue(data.billno);
    this.generalForm.controls.bill.setValue(data.bill);
  }
  remarks(data) {
    this.generalForm.controls.remarks.setValue(data.remarks);
  }
  invoices(data) {
    this.invoiceList = data;
    this.generalForm.controls.remarks.setValue(data.remarks);
  }
  items(data) {
    this.itemsList = data;
    this.generalForm.controls.remarks.setValue(data.remarks);
  }
  next() {
    if (this.tab < 4) {
      this.tab = this.tab + 1;
    } else {
      this.tab = 1;
    }
  }

  submitData(){
    
    this.newConsignment = {
      id: 0,
      createdOn: new Date(this.date).toISOString(),
      modifiedOn: new Date(this.date).toISOString(),
      createdBy: "chandresh.makwana@cargo-xpert.in",
      modifiedBy: "chandresh.makwana@cargo-xpert.in",
      customerName: this.generalForm.controls.customername.value,
      trackingId: "",
      consigner: {
        name: this.generalForm.controls.name.value,
        address: this.generalForm.controls.add.value,
        pincode: this.generalForm.controls.pincode.value,
        city: this.generalForm.controls.city.value,
        email: this.generalForm.controls.emailadd.value,
        phone: this.generalForm.controls.mobileno.value,
      },
      consignee: {
        name: this.generalForm.controls.consigneename.value,
        address: this.generalForm.controls.consigneeadd.value,
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
        pickupDate: new Date(
          this.generalForm.controls.pickup.value
        ).toISOString(),
        deliveryDate: new Date(
          this.generalForm.controls.delivery.value
        ).toISOString(),
        pickupOn: new Date(
          this.generalForm.controls.pickup.value
        ).toISOString(),
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
      invoices: this.invoiceList,
      items: this.itemsList,
      payment:{
        paymentMode:Number(this.generalForm.controls.radioset1.value),
        billingParty:this.generalForm.controls.comments.value
      },
      remarks:this.generalForm.controls.remarks.value
    };

    console.log(this.newConsignment);
    this.sharedService
      .submitData(this.newConsignment)
      .subscribe((submitData) => {
        console.log("submitData" + submitData);
        this.submitResponse = submitData;
        this.router.navigateByUrl("/dashboard");
      });

  }
}
