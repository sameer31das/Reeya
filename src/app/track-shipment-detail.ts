import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  selector: "app-track-shipment-detail",
  templateUrl: './track-shipment-detail.html',
  styleUrls: ['./track-shipment-detail.css']
})
export class TrackShipmentDetailComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
 

  }
}
