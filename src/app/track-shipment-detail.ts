import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareServices } from './app.services';
import { DialogPopupComponent } from "./dialogpopup/dialogpopup.component";

@Component({
  selector: "app-track-shipment-detail",
  templateUrl: './track-shipment-detail.html',
  styleUrls: ['./track-shipment-detail.css']
})
export class TrackShipmentDetailComponent implements OnInit {
  
  constructor(private _sharedService: ShareServices,public dialog: MatDialog) { }
  ngOnInit() {
 

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
}
