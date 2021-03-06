import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePickerService, DatePickerLabels } from '../../service/date-picker.service';
import { buildCalendarMatrix } from '../../util/generate-matrix/generate-matrix';

export interface ChangeMonthResponse {
  action: 'next' | 'prev';
  date: Date;
}

export abstract class CalendarComponent implements OnInit {
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Input() startViewportDate: Date;
  @Input() monthLabels: string[];
  @Input() dayLabels: string[];
  @Input() noControls: boolean;
  @Input() disableDatesBefore: Date;
  @Input() disableDatesAfter: Date;
  public matrix: number[][];
  public currentDate: Date;
  public labels: DatePickerLabels = {} as DatePickerLabels;

  constructor(public datePickerService: DatePickerService) {
    this.labels.months = this.datePickerService.labels.months;
    this.labels.days = this.datePickerService.labels.days;
  }

  public abstract chooseDay(dateNumber: number): void;

  ngOnInit() {
    // Initialize labels
    if (this.monthLabels && this.monthLabels instanceof Array && this.monthLabels.length === 12) {
      this.labels.months = this.monthLabels;
    }

    if (this.dayLabels && this.dayLabels instanceof Array && this.dayLabels.length === 7) {
      this.labels.days = this.dayLabels;
    }
  }

  // Main function that controls the render of the month
  public setCalendarViewport(date: Date): void {
    if (!(date instanceof Date)) {
      return console.error(new Error('setCalendarViewport executed with non-Date argument. ' +
        'Please provide a formatterToDate'));
    }
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDate = firstOfMonth;
    this.matrix = buildCalendarMatrix(firstOfMonth.getDay(), lastOfMonth.getDate());
  }

  public nextMonth(): void {
    const next = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.changeMonth.emit({
      action: 'next',
      date: next,
    });
    this.setCalendarViewport(next);
  }

  public prevMonth(): void {
    const prev = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.changeMonth.emit({
      action: 'prev',
      date: prev,
    });
    this.setCalendarViewport(prev);
  }

  public isDisabledBeforeAfter(dateNumber: number): boolean {
    const dateTime = new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth(), dateNumber).setHours(0, 0, 0, 0);
    if (this.disableDatesBefore && dateTime < this.disableDatesBefore.setHours(0, 0, 0, 0)) {
      return true;
    }
    if (this.disableDatesAfter && dateTime > this.disableDatesAfter.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }

  public getCurrentMonthLabel(): string {
    return this.labels.months[this.currentDate.getMonth()];
  }

}
