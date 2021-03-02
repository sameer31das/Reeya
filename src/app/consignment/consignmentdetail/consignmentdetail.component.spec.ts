import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentdetailComponent } from './consignmentdetail.component';

describe('ConsignmentdetailComponent', () => {
  let component: ConsignmentdetailComponent;
  let fixture: ComponentFixture<ConsignmentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignmentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
