import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ShareServices } from "../app.services";
import { IConsignmentListDetail } from "../app.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogPopupComponent } from "../dialogpopup/dialogpopup.component";
import { EditConsignmentComponent } from "../consignment/editconsignment/editconsignment.component";
import { Subscription } from "rxjs/internal/Subscription";
import { MsalService } from "@azure/msal-angular";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  consignmentList: IConsignmentListDetail[];
  subscription: Subscription;
  constructor(public dialog: MatDialog, private sharedService: ShareServices,   private authService: MsalService) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.getConsignmentList().subscribe((data) => {
      this.consignmentList = data.result;
    });
 
   
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: "50%",
      height: "70%",
      data: { id: item },
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditDialog(id: number, trackingID: string) {
    const dialogRef = this.dialog.open(EditConsignmentComponent, {
      width: "80%",
      data: { id: id, consignmentId: trackingID },
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      // load the consiment
      this.sharedService.getConsignmentList().subscribe((data) => {
        this.consignmentList = data.result;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
