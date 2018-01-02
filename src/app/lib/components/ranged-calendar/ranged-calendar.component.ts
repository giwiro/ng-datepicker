import { Component, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import {
  DatePickerService,
  FormatterFromDateFunction,
  FormatterToDateFunction,
} from '../../service/date-picker.service';

// export type RangedDaySide = 'left' | 'right';
export const enum RangedDaySide {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface ChangeChosenRangedDaysResponse {
  // If not left, then right
  side: RangedDaySide;
  date: Date;
  formatted?: any;
}

@Component({
  selector: 'app-ranged-calendar',
  templateUrl: './ranged-calendar.component.html',
  styleUrls: ['../abstract-calendar/abstract-calendar.component.scss']
})
export class RangedCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
  @Input() side = RangedDaySide.LEFT;
  @Input() noChoose = false;
  @Input() startChosenLeftToday = false;
  @Input() bindLeftFormControl: FormControl = new FormControl();
  @Input() bindRightFormControl: FormControl = new FormControl();
  @Input() formatterToDate: string | FormatterToDateFunction;
  @Input() formatterFromDate: string | FormatterFromDateFunction;
  @Output() changeChosenDay = new EventEmitter<ChangeChosenRangedDaysResponse>();
  public chosenLeftDay: Date;
  public chosenRightDay: Date;

  constructor(public datePickerService: DatePickerService) {
    super(datePickerService);
  }

  ngOnDestroy() {

  }

  ngAfterContentInit() {
    this.currentDate = new Date();
    if (this.startChosenLeftToday) {
      this.chosenLeftDay = new Date(this.currentDate.setHours(0, 0, 0, 0));
      this.side = RangedDaySide.RIGHT;
    }
    const l: Date = this.datePickerService.formatToDate(this.bindLeftFormControl.value, this.formatterToDate);
    const r: Date = this.datePickerService.formatToDate(this.bindRightFormControl.value, this.formatterToDate);
    if (l && r) {
      if (r.getTime() < l.getTime()) {
        console.error(new Error('right value must be more than left'));
        this.chosenLeftDay = l;
        this.bindRightFormControl.setValue(null);
        this.side = RangedDaySide.RIGHT;
      }else {
        this.chosenLeftDay = l;
        this.chosenRightDay = r;
        this.side = RangedDaySide.RIGHT;
      }
    }else {
      if (l) {
        this.chosenLeftDay = l;
        this.side = RangedDaySide.RIGHT;
      }else if (r) {
        this.chosenRightDay = r;
        this.side = RangedDaySide.LEFT;
      }
    }
    this.setCalendarViewport(this.currentDate);
  }

  public chooseDay(dateNumber: number): void {
    if (this.noChoose) {
      return;
    }
    if (this.isDisabledBeforeAfter(dateNumber)) {
      return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
    }
    const chosen = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
    if ((this.side === RangedDaySide.RIGHT &&
          this.bindLeftFormControl.value &&
          chosen.getTime() <= this.chosenLeftDay.getTime()) ||
        (this.side === RangedDaySide.LEFT &&
          this.bindRightFormControl.value &&
          chosen.getTime() >= this.chosenRightDay.getTime())) {
      this.side = RangedDaySide.LEFT;
      this.chosenRightDay = undefined;
      this.bindRightFormControl.setValue(null);
    }
    const formattedDate = this.datePickerService.formatFromDate(chosen, this.formatterFromDate);
    const response: ChangeChosenRangedDaysResponse = {
      side: this.side,
      date: chosen,
      formatted: formattedDate,
    };
    if (this.side === RangedDaySide.LEFT) {
      this.chosenLeftDay = chosen;
      this.bindLeftFormControl.setValue(formattedDate, { emitEvent: true });
      this.side = RangedDaySide.RIGHT;
    }else {
      this.chosenRightDay = chosen;
      this.bindRightFormControl.setValue(formattedDate, { emitEvent: true });
      // Side is not changing after set the right one
    }
    this.changeChosenDay.emit(response);
  }

  public isChosenLeftDay(dateNumber: number): boolean {
    if (!this.chosenLeftDay) {
      return false;
    }
    return this.chosenLeftDay.getFullYear() === this.currentDate.getFullYear() &&
      this.chosenLeftDay.getMonth() === this.currentDate.getMonth() &&
      this.chosenLeftDay.getDate() === dateNumber;
  }

  public isChosenRightDay(dateNumber: number): boolean {
    if (!this.chosenRightDay) {
      return false;
    }
    return this.chosenRightDay.getFullYear() === this.currentDate.getFullYear() &&
      this.chosenRightDay.getMonth() === this.currentDate.getMonth() &&
      this.chosenRightDay.getDate() === dateNumber;
  }

  public isWithinRange(dateNumber: number): boolean {
    if (!this.chosenLeftDay || !this.chosenRightDay) {
      return false;
    }
    const c = (new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber))
      .setHours(0, 0, 0, 0);
    return c > this.chosenLeftDay.getTime() &&
      c < this.chosenRightDay.getTime();
  }

  get value(): [Date, Date] {
    const dl = this.chosenLeftDay ? new Date(this.chosenLeftDay.getTime()) : undefined;
    const rl = this.chosenRightDay ? new Date(this.chosenRightDay.getTime()) : undefined;
    return [dl, rl];
  }

}
