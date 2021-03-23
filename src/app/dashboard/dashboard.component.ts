import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ShareServices } from "../app.services";
import { IConsignmentListDetail } from "../app.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogPopupComponent } from "../dialogpopup/dialogpopup.component";
import { EditConsignmentComponent } from "../consignment/editconsignment/editconsignment.component";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  consignmentList: IConsignmentListDetail[];
  constructor(public dialog: MatDialog, private sharedService: ShareServices) {}
  ngOnInit(): void {
    this.sharedService.getConsignmentList().subscribe((data) => {
      this.consignmentList = data.result;
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: "50%",
      height: "70%",
      data: { id: id },
      disableClose:true,
      hasBackdrop:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditConsignmentComponent, {
      width: "80%",
      data: { id: id },
      disableClose:true,
      hasBackdrop:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
