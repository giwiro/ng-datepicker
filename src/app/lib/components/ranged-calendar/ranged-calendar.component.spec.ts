import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedCalendarComponent } from './ranged-calendar.component';

describe('RangedCalendarComponent', () => {
  let component: RangedCalendarComponent;
  let fixture: ComponentFixture<RangedCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangedCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangedCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
