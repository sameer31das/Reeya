import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ShareServices } from "./app.services";
import { AuthService } from "./auth/auth.service";
import { LoginComponent } from "./login.component";
import { HomeComponent } from "./home.component";
import { ConsignmentComponent } from "./consignment/consignment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DialogPopupComponent } from "./dialogpopup/dialogpopup.component";
import { ConsigneeComponent } from "./consignment/consignee/consignee.component";
import { ConsignerComponent } from "./consignment/consigner/consigner.component";
import { ConsignmentdetailComponent } from "./consignment/consignmentdetail/consignmentdetail.component";
import { AttachmentsComponent } from "./consignment/attachments/attachments.component";
import { ScheduleComponent } from "./consignment/schedule/schedule.component";
import { DetailsComponent } from "./consignment/details/details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./auth/token.interceptors";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import {EditConsignmentComponent} from "./consignment/editconsignment/editconsignment.component"
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConsignmentComponent,
    ConsigneeComponent,
    EditConsignmentComponent,
    ConsignerComponent,
    ConsignmentdetailComponent,
    AttachmentsComponent,
    ScheduleComponent,
    DetailsComponent,
    DashboardComponent,
    DialogPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule
  ],
  providers: [
    ShareServices,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
