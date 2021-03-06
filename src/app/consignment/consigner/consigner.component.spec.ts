import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignerComponent } from './consigner.component';

describe('ConsignerComponent', () => {
  let component: ConsignerComponent;
  let fixture: ComponentFixture<ConsignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
