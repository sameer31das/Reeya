import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ShareServices } from "./app.services";
import { AuthService } from "./auth/auth.service";
import { LoginComponent } from "./login.component";
import { TrackShipmentComponent } from "./track-shipment";
import { TrackShipmentDetailComponent } from "./track-shipment-detail";
import { HeaderComponent } from "./header.component"
import {DashboardHeaderComponent} from "./dashboard.header.component"
import { HomeComponent } from "./home.component";
import { ConsignmentComponent } from "./consignment/consignment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DialogPopupComponent } from "./dialogpopup/dialogpopup.component";
import {ContactUsComponent} from "./contact-us/contactus.component"
import { ConsigneeComponent } from "./consignment/consignee/consignee.component";
import { ConsignerComponent } from "./consignment/consigner/consigner.component";
import { ConsignmentdetailComponent } from "./consignment/consignmentdetail/consignmentdetail.component";
import { AttachmentsComponent } from "./consignment/attachments/attachments.component";
import { ScheduleComponent } from "./consignment/schedule/schedule.component";
import { DetailsComponent } from "./consignment/details/details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS,HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/token.interceptors";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { EditConsignmentComponent } from "./consignment/editconsignment/editconsignment.component";
import {
  MatDialogModule,
} from "@angular/material/dialog";
import { AgmCoreModule } from "@agm/core";


import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'e9d85866-3c3d-4ccd-a9f6-949f6342b959',
      authority:'https://login.microsoftonline.com/daa699e4-3bf5-41ba-8a97-26108106911f' ,
      redirectUri: 'http://localhost:4200/dashboard'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

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
    ContactUsComponent
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
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBrTr4sfU_GFLF7Pivk1CBtWc7omncfbB4",
    }),
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    ShareServices
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
