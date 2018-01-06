import { Component, HostBinding, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import {
  DatePickerService,
  FormatterToDateFunction,
  FormatterFromDateFunction,
} from '../../service/date-picker.service';

export interface ChangeChosenDayResponse {
  date: Date;
  formatted?: any;
}

@Component({
  selector: 'app-single-calendar',
  templateUrl: './single-calendar.component.html',
  styleUrls: ['../abstract-calendar/abstract-calendar.component.scss']
})
export class SingleCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  @Input() noChoose = false;
  @Input() hostClassName: string | string[];
  @Input() startChosenToday = false;
  @Input() startViewportAtChosen = true;
  @Input() formatterToDate: string | FormatterToDateFunction;
  @Input() formatterFromDate: string | FormatterFromDateFunction;
  @Input() bindFormControl: FormControl = new FormControl();
  @HostBinding('class') hostClass = '';
  public chosenDate: Date;
  private valueChangesSubscription: Subscription;

  constructor(public datePickerService: DatePickerService) {
    super(datePickerService);
  }

  ngAfterContentInit() {
    this.currentDate = new Date();
    if (this.startChosenToday) {
      this.chosenDate = this.datePickerService.formatToDate(new Date(), this.formatterToDate);
      this.bindFormControl.setValue(new Date(this.chosenDate.setHours(0, 0, 0, 0)));
    }
    if (this.bindFormControl.value) {
      this.chosenDate = this.datePickerService.formatToDate(this.bindFormControl.value, this.formatterToDate);
      if (this.startViewportAtChosen) {
        this.currentDate = this.chosenDate;
      }
    }
    this.valueChangesSubscription = this.bindFormControl.valueChanges.subscribe(v => {
      const c = this.datePickerService.formatToDate(v, this.formatterToDate);
      if (!(c instanceof Date)) {
        return console.error(new Error('value is not instance of Date'));
      }
      this.chosenDate = new Date(c.setHours(0, 0, 0, 0));
    });
    this.setCalendarViewport(this.currentDate);

    if (this.hostClassName instanceof Array && this.hostClassName.length) {
      this.hostClass = this.hostClassName.join(' ');
    }else if (typeof this.hostClassName === 'string') {
      this.hostClass = this.hostClassName;
    }
  }

  ngOnDestroy() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  public chooseDay(dateNumber: number): void {
    if (this.noChoose) {
      return;
    }
    if (this.isDisabledBeforeAfter(dateNumber)) {
      return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
    }
    this.chosenDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
    const formattedDate = this.datePickerService.formatFromDate(this.chosenDate, this.formatterFromDate);
    this.bindFormControl.setValue(formattedDate, { emitEvent: true });
    this.changeChosenDay.emit({
      date: new Date(this.chosenDate.getTime()),
      formatted: formattedDate,
    });
  }

  /* public setChosenDay(date: Date): void {
    if (this.isDisabledBeforeAfter(date.getDate())) {
      return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
    }
    this.chosenDate = new Date(date.setHours(0, 0, 0, 0));
    this.bindFormControl.setValue(this.chosenDate, { emitEvent: true });
  }*/

  public isChosenDay(dateNumber: number): boolean {
    if (!this.chosenDate) {
      return false;
    }
    return this.chosenDate.getFullYear() === this.currentDate.getFullYear() &&
      this.chosenDate.getMonth() === this.currentDate.getMonth() &&
      this.chosenDate.getDate() === dateNumber;
  }

  get value(): Date {
    const d = this.chosenDate ? new Date(this.chosenDate.getTime()) : undefined;
    return d ? this.datePickerService.formatFromDate(d) : d;
  }
}
