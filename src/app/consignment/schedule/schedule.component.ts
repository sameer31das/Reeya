import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder) { }
  @Output() Schedule: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  Mode = ['ab', 'cd'];
  generalForm: FormGroup;
  ngOnInit(): void {
    this.generateForms();
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


