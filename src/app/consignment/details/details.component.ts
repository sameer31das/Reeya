import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
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
  consignmentnoteError: boolean;
  categoryError: boolean;
  constructor(private fb: FormBuilder, private sharedService: ShareServices) {}
  @Input() initialFormDetail: any;
  @Output() Details: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() disableNext: EventEmitter<any> = new EventEmitter<any>();

  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
  }
  // tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      totalprice: [this.initialFormDetail.controls.totalprice.value],
      category: [
        this.initialFormDetail.controls.category.value,
        Validators.maxLength(32),
      ],

      consignmentnote: new FormControl(
        this.initialFormDetail.controls.consignmentnote.value,
        [Validators.pattern(" ^[0-9]*$"), Validators.maxLength(16)]
      ),

      declaredweight: [
        this.initialFormDetail.controls.declaredweight.value,
        [Validators.pattern("[0-9 ]*"), Validators.required],
      ],
      actualWeight: [
        this.initialFormDetail.controls.actualWeight.value,
        Validators.pattern("[0-9 ]*"),
      ],
      photo: [""],
    };
    this.generalForm = this.fb.group(group);
  }

  checkDeclared() {
    if (this.generalForm.controls.declaredweight.valid) {
      this.declaredWeightError = false;
    } else {
      this.declaredWeightError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
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
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkActual() {
    if (this.generalForm.controls.actualWeight.valid) {
      this.actualWeightError = false;
    } else {
      this.actualWeightError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkConsignmentnote() {
    if (this.generalForm.controls.consignmentnote.valid) {
      this.consignmentnoteError = false;
    } else {
      this.consignmentnoteError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  checkCategory() {
    if (this.generalForm.controls.category.valid) {
      this.categoryError = false;
    } else {
      this.categoryError = true;
    }
    if (this.generalForm.valid) {
      this.disableNext.emit(false);
    } else {
      this.disableNext.emit(true);
    }
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.Details.emit(this.generalForm.value);
  }
}
