import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from '../app.model';
import { ShareServices } from '../app.services';

@Component({
  templateUrl: './dialogpopup.component.html',
  styleUrls: ['./dialogpopup.component.css']
})
export class DialogPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private sharedService: ShareServices) {}
  ngOnInit(): void {
    this.sharedService.getDocument("de3002749a744bb98498d8bc07494485.jpg").subscribe(data => {
      console.log(data.result);
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

