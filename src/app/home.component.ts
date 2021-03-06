import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
  }
}
