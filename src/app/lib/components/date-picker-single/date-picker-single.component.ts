import {Component, Input, Output, EventEmitter } from '@angular/core';
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
export class DatePickerSingleComponent {
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  @Input() bindFormControl = new FormControl();
  @Input() noChoose = false;
  @Input() className: string;
  @Input() singleCalendarClassName: string;
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
  private open = false;

  constructor() { }

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
