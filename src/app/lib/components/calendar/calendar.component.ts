import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePickerService, DatePickerLabels } from '../../service/date-picker.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() bindFormControl = new FormControl();
  @Input() startDate: Date;
  @Input() monthLabels: string[];
  @Input() dayLabels: string[];
  @Input() noChoose = false;
  @Input() disableDatesBefore: Date;
  @Input() disableDatesAfter: Date;
  @Output() choose = new EventEmitter<Date>();
  public matrix: number[][];
  private currentDate: Date;
  public chosenDate: Date;
  public labels: DatePickerLabels = {} as DatePickerLabels;

  constructor(public datePickerService: DatePickerService) { }

  ngOnInit() {
    if (this.startDate) {
      this.currentDate = this.startDate;
    }else {
      this.currentDate = new Date();
    }

    if (this.monthLabels && this.monthLabels instanceof Array && this.monthLabels.length === 12) {
      this.labels.months = this.monthLabels;
    }else {
      this.labels.months = this.datePickerService.labels.months;
    }

    if (this.dayLabels && this.dayLabels instanceof Array && this.dayLabels.length === 7) {
      this.labels.days = this.dayLabels;
    }else {
      this.labels.days = this.datePickerService.labels.days;
    }

    this.setCalendarViewport(this.currentDate);
  }

  // Limit: max date of month (28, 30 or 31)
  private buildCalendarMatrix(doom: number, limit: number = 31): number[][] {
    const r = [];
    let i = doom;
    let n = 1;
    let row = 0;
    while (n <= limit) {
      if (!r[row]) {
        r[row] = [];
      }
      r[row][i] = n;
      n++;
      i++;
      if (i > 6) {
        row++;
        i = 0;
      }
    }
    return r;
  }

  // Main function that controls the render of the month
  public setCalendarViewport(date: Date): void {
    this.currentDate = date;
    const firstOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.matrix = this.buildCalendarMatrix(firstOfMonth.getDay(), lastOfMonth.getDate());
  }

  public nextMonth(): void {
    const next = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.setCalendarViewport(next);
  }

  public prevMonth(): void {
    const next = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.setCalendarViewport(next);
  }

  public isChosenDay(dateNumber: number): boolean {
    if (!this.chosenDate) {
      return false;
    }
    return this.chosenDate.getFullYear() === this.currentDate.getFullYear() &&
      this.chosenDate.getMonth() === this.currentDate.getMonth() &&
      this.chosenDate.getDate() === dateNumber;
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

  public chooseDay(dateNumber: number): void {
    if (this.noChoose) {
      return;
    }
    this.chosenDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
    this.bindFormControl.setValue(this.chosenDate);
    this.choose.emit(this.chosenDate);
  }

  public setChosenDay(date: Date): void {
    this.chosenDate = date;
  }

  public getCurrentMonthLabel(): string {
    return this.labels.months[this.currentDate.getMonth()];
  }

}
