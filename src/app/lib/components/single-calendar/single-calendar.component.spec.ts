import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCalendarComponent } from './single-calendar.component';

describe('SingleCalendarComponent', () => {
  let component: SingleCalendarComponent;
  let fixture: ComponentFixture<SingleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
