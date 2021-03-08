import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ShareServices } from './app.services';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { ConsignmentComponent } from './consignment/consignment.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ConsigneeComponent } from './consignment/consignee/consignee.component';
import { ConsignerComponent } from './consignment/consigner/consigner.component';
import { ConsignmentdetailComponent } from './consignment/consignmentdetail/consignmentdetail.component';
import { AttachmentsComponent } from './consignment/attachments/attachments.component';
import { ScheduleComponent } from './consignment/schedule/schedule.component';
import { DetailsComponent } from './consignment/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConsignmentComponent,
    ConsigneeComponent,
    ConsignerComponent,
    ConsignmentdetailComponent,
    AttachmentsComponent,
    ScheduleComponent,
    DetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ShareServices, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
