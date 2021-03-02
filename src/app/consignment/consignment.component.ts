import { Component, OnInit } from '@angular/core';
import { ShareServices } from '../app.services';

@Component({
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
 

  }
}
