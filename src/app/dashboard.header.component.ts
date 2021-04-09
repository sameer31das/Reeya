import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: "app-dashboard-header",
  templateUrl: './dashboard.header.component.html',
  styleUrls: ['./dashboard.header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  
  constructor( private authService: MsalService) { }
  ngOnInit() {
 

  }
  logout() {
    this.authService.logout();
  }
}
