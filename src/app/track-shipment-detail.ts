import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ShareServices } from "./app.services";
import { DialogPopupComponent } from "./dialogpopup/dialogpopup.component";
import { ActivatedRoute } from "@angular/router";
import { ITracking, ITrackingDetail } from "./app.model";

@Component({
  selector: "app-track-shipment-detail",
  templateUrl: "./track-shipment-detail.html",
  styleUrls: ["./track-shipment-detail.css"],
})
export class TrackShipmentDetailComponent implements OnInit {
  constructor(
    private _sharedService: ShareServices,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }
  trackingLists: ITrackingDetail;
  trackingId: string;
  status: string;
  pickUp: string;
  delivery: string;
  stepCompleted = "step step-completed";
  stepActive = "step step-active";
  step = "step";
  pcikupcss: string;
  dispatchedcss: string;
  inTransit: string;
  outForDelivery: string;
  productDelivered: string;
  width: number;
  displayPickup = "none";
  displaydispatchedcss = "none";
  displayinTransit = "none";
  displayoutForDelivery = "none";
  displayproductDelivered = "none";

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trackingId = params.id;
    });

    this._sharedService.getTrackingList(this.trackingId).then(response => response.json())
    .then(data => {
      this.trackingLists = data["result"];
      this.pickUp = (this.trackingLists["actualPickup"]).replace(/T/, ' ').replace(/\..+/, '');
      this.delivery = (this.trackingLists["scheduledDelivery"]).replace(/T/, ' ').replace(/\..+/, '');

      switch (this.trackingLists.status["status"]) {
        case 1:
          this.width = 20;
          this.status = "Booked";
          this.pcikupcss = this.stepActive;
          this.dispatchedcss = this.step;
          this.inTransit = this.step;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          break;
        case 2:
          this.width = 20;
          this.status = "PickupRescheduled";
          this.pcikupcss = this.stepActive;
          this.dispatchedcss = this.step;
          this.inTransit = this.step;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          break;
        case 3:
          this.width = 20;
          this.status = "PickedUp";
          this.pcikupcss = this.stepActive;
          this.dispatchedcss = this.step;
          this.inTransit = this.step;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          break;
        case 4:
          this.width = 20;
          this.status = "Dispatched";
          this.pcikupcss = this.stepCompleted;
          this.dispatchedcss = this.stepActive;
          this.inTransit = this.step;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          this.displayPickup = "block";
          break;
        case 5:
          this.width = 40;
          this.pcikupcss = this.stepCompleted;
          this.dispatchedcss = this.stepCompleted;
          this.inTransit = this.stepActive;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          this.displayPickup = "block";
          this.displaydispatchedcss = "block";

          this.status = "InTransit";
          break;
        case 6:
          this.width = 60;
          this.status = "OutForDelivery";
          this.pcikupcss = this.stepCompleted;
          this.dispatchedcss = this.stepCompleted;
          this.inTransit = this.stepCompleted;
          this.outForDelivery = this.stepActive;
          this.productDelivered = this.step;
          this.displayPickup = "block";
          this.displaydispatchedcss = "block";
          break;
        case 7:
          this.width = 60;
          this.status = "DeliveryRescheduled";
          this.pcikupcss = this.stepCompleted;
          this.dispatchedcss = this.stepCompleted;
          this.inTransit = this.stepCompleted;
          this.outForDelivery = this.stepActive;
          this.productDelivered = this.step;
          this.displayPickup = "block";
          this.displaydispatchedcss = "block";
          this.displayinTransit = "block";
          break;
        case 8:
          this.width = 100;
          this.status = "Delivered";
          this.pcikupcss = this.stepCompleted;
          this.dispatchedcss = this.stepCompleted;
          this.inTransit = this.stepCompleted;
          this.outForDelivery = this.stepCompleted;
          this.productDelivered = this.stepCompleted;
          this.displayPickup = "block";
          this.displaydispatchedcss = "block";
          this.displayinTransit = "block";
          this.displayoutForDelivery = "block";
          this.displayproductDelivered = "block";
          break;
        case 100:
          this.width = 0;
          this.pcikupcss = this.step;
          this.dispatchedcss = this.step;
          this.inTransit = this.step;
          this.outForDelivery = this.step;
          this.productDelivered = this.step;
          this.status = "Invalid";
          break;
      }
    });
  }
  pickupcssDialog(id) {
    if (this.pcikupcss == this.stepActive) {
      this.openDialog(id);
    }
  }
  dispatchedcssDialog(id) {
    if (this.dispatchedcss == this.stepActive) {
      this.openDialog(id);
    }
  }
  inTransitDialog(id) {
    if (this.inTransit == this.stepActive) {
      this.openDialog(id);
    }
  }
  outForDeliveryDialog(id) {
    if (this.outForDelivery == this.stepActive) {
      this.openDialog(id);
    }
  }
  productDeliveredDialog(id) {
    if (this.productDelivered == this.stepActive) {
      this.openDialog(id);
    }
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: "50%",
      height: "70%",
      data: { id: id },
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
