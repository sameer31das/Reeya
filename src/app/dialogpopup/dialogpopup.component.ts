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
  imagebyte: any;
  constructor(
    public dialogRef: MatDialogRef<DialogPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: ShareServices
  ) {
    this.lat = data.lat;
    this.lng = data.lang;
  }
  ngOnInit(): void {
    if (this.data.id == 1) {
      if (navigator && navigator.geolocation) {
        const position = (pos) => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;
        };

        const error = (error) => {
         // alert(JSON.stringify(error));
        };

        navigator.geolocation.watchPosition(position, error);
      }

      
    }
    else {
      this.sharedService
      .getDocument(this.data.id)
      .subscribe((data) => {
        //console.log(data.result);
        this.imagebyte = "data:image/jpeg;base64," + data.result;
      });
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
