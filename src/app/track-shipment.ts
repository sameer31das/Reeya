import { Component, OnInit, OnChanges } from "@angular/core";
import { ShareServices } from "./app.services";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-track-shipment",
  templateUrl: "./track-shipment.html",
  styleUrls: ["./track-shipment.css"],
})
export class TrackShipmentComponent implements OnInit, OnChanges {
  constructor(private _sharedService: ShareServices) {}
  trackingLists: any;
  trackingId = new FormControl("");
  urlId = 0;
  ngOnInit() {}
  onTrackingidChange() {
    this.urlId = this.trackingId.value;
  }
  ngOnChanges() {
    this.urlId = this.trackingId.value;
  }
}
