import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  selector: "app-header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
 

  }
}
