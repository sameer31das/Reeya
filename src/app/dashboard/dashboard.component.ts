import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareServices } from '../app.services';
import {IConsignmentListDetail} from '../app.model';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  consignmentList: IConsignmentListDetail[];
  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }
  ngOnInit(): void {


this.sharedService.getConsignmentList().subscribe(data => {

  this.consignmentList = data.result;

});
  }


}
