import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSingleComponent } from './date-picker-single.component';

describe('DatePickerSingleComponent', () => {
  let component: DatePickerSingleComponent;
  let fixture: ComponentFixture<DatePickerSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
