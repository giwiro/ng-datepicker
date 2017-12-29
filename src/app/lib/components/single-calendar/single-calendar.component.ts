import { Component, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import { DatePickerService } from '../../service/date-picker.service';

@Component({
  selector: 'app-single-calendar',
  templateUrl: './single-calendar.component.html',
  styleUrls: ['../abstract-calendar/abstract-calendar.component.scss']
})
export class SingleCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
  public chosenDate: Date;
  private valueChangesSubscription: Subscription;
  @Input() startViewportAtChosen = true;
  @Input() bindFormControl: FormControl = new FormControl();

  constructor(public datePickerService: DatePickerService) {
    super(datePickerService);
  }

  ngAfterContentInit() {
    this.currentDate = new Date();
    if (this.bindFormControl.value) {
      this.chosenDate = new Date(this.bindFormControl.value.getTime());
      if (this.startViewportAtChosen) {
        this.currentDate = this.chosenDate;
      }
    }
    this.valueChangesSubscription = this.bindFormControl.valueChanges.subscribe(v => {
      if (!(v instanceof Date)) {
        return console.error(new Error('value is not instance of Date'));
      }
      this.chosenDate = new Date(v.setHours(0, 0, 0, 0));
    });
    this.setCalendarViewport(this.currentDate);
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
    this.bindFormControl.setValue(this.chosenDate, { emitEvent: true });
  }

  public setChosenDay(date: Date): void {
    if (this.isDisabledBeforeAfter(date.getDate())) {
      return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
    }
    this.chosenDate = new Date(date.setHours(0, 0, 0, 0));
    this.bindFormControl.setValue(this.chosenDate, { emitEvent: true });
  }

  public isChosenDay(dateNumber: number): boolean {
    if (!this.chosenDate) {
      return false;
    }
    return this.chosenDate.getFullYear() === this.currentDate.getFullYear() &&
      this.chosenDate.getMonth() === this.currentDate.getMonth() &&
      this.chosenDate.getDate() === dateNumber;
  }
}
