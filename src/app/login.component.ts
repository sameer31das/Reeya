import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
 

  }
}
