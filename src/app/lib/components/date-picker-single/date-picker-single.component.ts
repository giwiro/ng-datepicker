import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePickerSingleOptions } from './date-picker-single-options';
import { ChangeChosenDayResponse } from '../single-calendar/single-calendar.component';
import { ChangeMonthResponse } from '../abstract-calendar/abstract-calendar.component';

@Component({
  selector: 'app-date-picker-single',
  templateUrl: './date-picker-single.component.html',
  styleUrls: ['./date-picker-single.component.scss']
})
export class DatePickerSingleComponent implements OnInit {
  @Input() options: DatePickerSingleOptions;
  @Input() bindFormControl = new FormControl();
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  private open = false;

  constructor() { }

  ngOnInit() {
  }

  public onChangeChosenDay(changeChosenDayResponse: ChangeChosenDayResponse): void {
    this.changeChosenDay.emit(changeChosenDayResponse);
  }

  public onChangeMonth(changeMonthResponse: ChangeMonthResponse): void {
    this.changeMonth.emit(changeMonthResponse);
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
