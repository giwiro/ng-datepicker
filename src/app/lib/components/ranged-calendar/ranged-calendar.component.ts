import { Component, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import { DatePickerService } from '../../service/date-picker.service';

// export type RangedDaySide = 'left' | 'right';
export enum RangedDaySide {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface ChangeChosenRangedDaysResponse {
  // If not left, then right
  side: RangedDaySide;
  date: Date;
}

@Component({
  selector: 'app-ranged-calendar',
  templateUrl: './ranged-calendar.component.html',
  styleUrls: ['../abstract-calendar/abstract-calendar.component.scss']
})
export class RangedCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
  @Input() side = RangedDaySide.LEFT;
  @Input() noChoose = false;
  @Input() bindLeftFormControl: FormControl = new FormControl();
  @Input() bindRightFormControl: FormControl = new FormControl();
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
    if (chosen.getTime() <= this.bindLeftFormControl.value) {
      this.side = this.side === RangedDaySide.LEFT ?
        RangedDaySide.RIGHT : RangedDaySide.LEFT;
    }
    this.chosenRightDay = undefined;
    this.bindRightFormControl.setValue(undefined);
    const response: ChangeChosenRangedDaysResponse = {
      side: this.side,
      date: chosen,
    };
    if (this.side === RangedDaySide.LEFT) {
      this.chosenLeftDay = chosen;
      this.bindLeftFormControl.setValue(chosen, { emitEvent: true });
      this.side = RangedDaySide.RIGHT;
    }else {
      this.chosenRightDay = chosen;
      this.bindRightFormControl.setValue(chosen, { emitEvent: true });
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
    return c > this.bindLeftFormControl.value.getTime() &&
      c < this.bindRightFormControl.value.getTime();
  }

}
