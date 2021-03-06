import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareServices } from '../../app.services';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private sharedService: ShareServices) { }
  @Output() Schedule: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  Mode = [];
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();

    this.sharedService.getConsignmentMode().subscribe(data => {
      this.Mode = data.result;
   });
}
// tslint:disable-next-line:typedef
  generateForms() {
    const group = {
      pickup:  [''],
      delivery:  [''],
      mode: [''],
      vehicle:  ['']


    };
    this.generalForm = this.fb.group(group);
}
// tslint:disable-next-line:typedef
ngOnDestroy() {
  this.Schedule.emit(this.generalForm.value);
}

}


