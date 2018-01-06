import { Component, HostBinding, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { DatePickerSingleOptions } from './date-picker-single-options';
import { ChangeChosenDayResponse } from '../single-calendar/single-calendar.component';
import { ChangeMonthResponse } from '../abstract-calendar/abstract-calendar.component';
import { FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';

@Component({
  selector: 'app-date-picker-single',
  templateUrl: './date-picker-single.component.html',
  styleUrls: ['./date-picker-single.component.scss']
})
export class DatePickerSingleComponent implements AfterContentInit {
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  @Input() bindFormControl = new FormControl();
  @Input() noChoose = false;
  @Input() hostClassName: string | string[];
  @Input() datePickerSingleClassName: string | string[];
  @Input() singleCalendarHostClassName: string | string[];
  @Input() startChosenToday = false;
  @Input() startViewportAtChosen = true;
  @Input() startViewportDate: Date;
  @Input() monthLabels: string[];
  @Input() dayLabels: string[];
  @Input() disableDatesBefore: Date;
  @Input() disableDatesAfter: Date;
  @Input() formatterToDate: string | FormatterToDateFunction;
  @Input() formatterFromDate: string | FormatterFromDateFunction;
  @Input() noControls: boolean;
  @HostBinding('class') hostClass = '';
  private open = false;

  constructor() { }

  ngAfterContentInit() {
    if (this.hostClassName instanceof Array && this.hostClassName.length) {
      this.hostClass = this.hostClassName.join(' ');
    }else if (typeof this.hostClassName === 'string') {
      this.hostClass = this.hostClassName;
    }
  }

  public onChangeChosenDay(changeChosenDayResponse: ChangeChosenDayResponse): void {
    this.changeChosenDay.emit(changeChosenDayResponse);
  }

  public onChangeMonth(changeMonthResponse: ChangeMonthResponse): void {
    this.changeMonth.emit(changeMonthResponse);
  }

  public toggle() {
    this.open = !this.open;
  }

  public show() {
    this.open = true;
  }

  public hide() {
    this.open = false;
  }

  public isOpen(): boolean {
    return this.open;
  }
}
