import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { ConsignmentComponent } from './consignment/consignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackShipmentComponent } from './track-shipment';
import { TrackShipmentDetailComponent } from './track-shipment-detail';
import { MsalGuard } from '@azure/msal-angular';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'consignment', component: ConsignmentComponent},
  { path: 'track', component: TrackShipmentComponent },
  { path: 'track/:id', component: TrackShipmentDetailComponent }
];
const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
