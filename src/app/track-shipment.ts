import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  selector: "app-track-shipment",
  templateUrl: './track-shipment.html',
  styleUrls: ['./track-shipment.css']
})
export class TrackShipmentComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
 

  }
}
