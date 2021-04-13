import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ShareServices } from "./app.services";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { LoginComponent } from "./login.component";
import { TrackShipmentComponent } from "./track-shipment";
import { TrackShipmentDetailComponent } from "./track-shipment-detail";
import { HeaderComponent } from "./header.component";
import { DashboardHeaderComponent } from "./dashboard.header.component";
import { HomeComponent } from "./home.component";
import { ConsignmentComponent } from "./consignment/consignment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DialogPopupComponent } from "./dialogpopup/dialogpopup.component";
import { ContactUsComponent } from "./contact-us/contactus.component";
import { ConsigneeComponent } from "./consignment/consignee/consignee.component";
import { ConsignerComponent } from "./consignment/consigner/consigner.component";
import { ConsignmentdetailComponent } from "./consignment/consignmentdetail/consignmentdetail.component";
import { AttachmentsComponent } from "./consignment/attachments/attachments.component";
import { ScheduleComponent } from "./consignment/schedule/schedule.component";
import { DetailsComponent } from "./consignment/details/details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/token.interceptors";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { EditConsignmentComponent } from "./consignment/editconsignment/editconsignment.component";
import { MsalInterceptor, MsalModule, MsalService } from "@azure/msal-angular";
import { MatDialogModule } from "@angular/material/dialog";
import { AgmCoreModule } from "@agm/core";
import { environment } from "../environments/environment";
import { RemarksComponent } from "./consignment/remarks/remarks.component";
import { InvoicesComponent } from "./consignment/invoices/invoices.component";
import { ItemsComponent } from "./consignment/items/items.component";
import { PaymentComponent } from "./consignment/payment/payment.component";
import { MatRadioModule } from "@angular/material/radio";
const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    DialogPopupComponent,
    TrackShipmentComponent,
    TrackShipmentDetailComponent,
    DashboardHeaderComponent,
    ContactUsComponent,
    RemarksComponent,
    InvoicesComponent,
    ItemsComponent,
    PaymentComponent,
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
    MatDialogModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBrTr4sfU_GFLF7Pivk1CBtWc7omncfbB4",
    }),
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.clientId,
          authority: environment.authority,
          redirectUri: environment.redirectUrl,
          validateAuthority: true,
          postLogoutRedirectUri: environment.postLogoutRedirectUri,
          navigateToLoginRequestUrl: true,
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
        framework: {
          unprotectedResources: ['https://www.microsoft.com/en-us/', 'https://cargo-xpert.com/track', 'https://cargo-xpert.com/home'],
        }
      },
      {
        popUp: false,
        consentScopes: ["user.read", "openid", "profile"],
        protectedResourceMap: [
          ["https://graph.microsoft.com", ['user.read', 'openid', 'profile', 'email', 'offline_access']],
          ["https://cargo-xpert.com/dashboard", ["api://e9d85866-3c3d-4ccd-a9f6-949f6342b959/User.Access"]],
          ["https://cargo-xpert.com/home/*", null],
          ["https://cargo-xpert.com/track/*", null]
        ],
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MsalService,
    ShareServices,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
