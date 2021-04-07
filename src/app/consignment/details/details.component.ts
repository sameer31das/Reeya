import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ShareServices } from "../../app.services";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  valueError: boolean;
  declaredWeightError: boolean;
  filePhoto: any;
  photoSubscription: Subscription;
  lblPhoto = "No file chosen";
  actualWeightError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetail: any;
  @Output() Details: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      totalprice: [this.initialFormDetail.controls.totalprice.value],
      declaredmaterial: [
        this.initialFormDetail.controls.declaredmaterial.value,
      ],
      value: [
        this.initialFormDetail.controls.value.value,
        Validators.pattern("[0-9 ]*"),
      ],
      declaredweight: [
        this.initialFormDetail.controls.declaredweight.value,
        Validators.pattern("[0-9 ]*"),
      ],
      actualWeight: [
        this.initialFormDetail.controls.actualWeight.value,
        Validators.pattern("[0-9 ]*"),
      ],
      photo: [""],
    };
    this.generalForm = this.fb.group(group);
  }

  checkValue() {
    if (this.generalForm.controls.value.valid) {
      this.valueError = false;
    } else {
      this.valueError = true;
    }
  }
  checkDeclared() {
    if (this.generalForm.controls.declaredweight.valid) {
      this.declaredWeightError = false;
    } else {
      this.declaredWeightError = true;
    }
  }
  selectPhoto(file: FileList) {
    this.filePhoto = file["target"].files[0];
    this.lblPhoto = this.filePhoto["name"];
    this.photoSubscription = this.sharedService
      .uploadDocument(this.filePhoto)
      .subscribe((photoRes) => {
        this.generalForm.controls.photo.setValue(photoRes.result);
      });
  }
  checkActual() {
    if (this.generalForm.controls.actualWeight.valid) {
      this.actualWeightError = false;
    } else {
      this.actualWeightError = true;
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Details.emit(this.generalForm.value);
  }
}
