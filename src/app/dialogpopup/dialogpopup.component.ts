import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IEmployee } from "../app.model";
import { ShareServices } from "../app.services";

@Component({
  templateUrl: "./dialogpopup.component.html",
  styleUrls: ["./dialogpopup.component.css"],
})
export class DialogPopupComponent implements OnInit {
  lat: any;
  lng: any;
  constructor(
    public dialogRef: MatDialogRef<DialogPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: ShareServices
  ) {}
  ngOnInit(): void {
    if (navigator && navigator.geolocation) {
      const position = (pos) => {
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;
      };

      const error = (error) => {
        alert(JSON.stringify(error));
      };

      navigator.geolocation.watchPosition(position, error);
    }
    this.sharedService
      .getDocument("de3002749a744bb98498d8bc07494485.jpg")
      .subscribe((data) => {
        console.log(data.result);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
