import { Component, EventEmitter, OnInit, Output, Input, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IAssignEmployeeParams, IEmployees } from "src/app/app.model";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-editconsignment",
  templateUrl: "./editconsignment.component.html",
  styleUrls: ["./editconsignment.component.css"],
})
export class EditConsignmentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private sharedService: ShareServices,
    public dialogRef: MatDialogRef<EditConsignmentComponent>) { }
  section = 0;
  drpEmployee: any;
  generalForm: FormGroup;
  ngOnInit() {
    this.generateForms();
    this.sharedService.getEmployee().subscribe(data => {
      this.drpEmployee = data.result;
    });
  }
  generateForms() {
    const group = {
      employeeList: [""],
      photo: [""],
      bill: [""],
    };
    this.generalForm = this.fb.group(group);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  assignEmployee(): void {
    const empParam: IAssignEmployeeParams = {
      id: 1,
      assignedTo: ""
    }
    // this.sharedService.assignEmployee(empParam).subscribe(data => {
    //   console.log("employee assign");
    // });
  }


}
