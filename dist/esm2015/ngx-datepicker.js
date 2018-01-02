import { Component, ComponentFactoryResolver, Directive, EventEmitter, HostListener, Injectable, Input, NgModule, Output, Pipe, ViewContainerRef } from '@angular/core';
import * as momentImported from 'moment';
import { FormControl, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Hack for typescript for aot packaging
const moment = momentImported;
/**
 * @record
 */

const DEFAULT_MONTHS_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
const DEFAULT_DAYS_LABEL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
class DatePickerService {
    constructor() {
        // Set defaults
        this.monthLabels = DEFAULT_MONTHS_LABEL;
        this.daysLabels = DEFAULT_DAYS_LABEL;
    }
    /**
     * @param {?} f
     * @return {?}
     */
    setFormatterToDate(f) {
        this.formatterToDate = f;
    }
    /**
     * @param {?} f
     * @return {?}
     */
    setFormatterFromDate(f) {
        this.formatterFromDate = f;
    }
    /**
     * @param {?} input
     * @param {?=} auxFormatter
     * @return {?}
     */
    formatToDate(input, auxFormatter) {
        const /** @type {?} */ formatter = auxFormatter || this.formatterToDate;
        if (formatter instanceof Function) {
            return formatter(input);
        }
        else if (typeof formatter === 'string') {
            return moment(input, formatter).toDate();
        }
        else {
            return input;
        }
    }
    /**
     * @param {?} d
     * @param {?=} auxFormatter
     * @return {?}
     */
    formatFromDate(d, auxFormatter) {
        const /** @type {?} */ formatter = auxFormatter || this.formatterFromDate;
        if (formatter instanceof Function) {
            return formatter(d);
        }
        else if (typeof formatter === 'string') {
            return moment(d).format(formatter);
        }
        else {
            return d;
        }
    }
    /**
     * @param {?} l
     * @return {?}
     */
    setLabels(l) {
        if (l.months) {
            if (!(l.months instanceof Array)) {
                return console.error(new Error('months must be an array'));
            }
            if (l.months.length !== 12) {
                return console.error(new Error('months array\'s length must be 12'));
            }
            this.monthLabels = [...l.months];
        }
        if (l.days) {
            if (!(l.days instanceof Array)) {
                return console.error(new Error('days must be an array'));
            }
            if (l.days.length !== 7) {
                return console.error(new Error('days array\'s length must be 7'));
            }
            this.daysLabels = [...l.days];
        }
    }
    /**
     * @return {?}
     */
    get labels() {
        return {
            months: this.monthLabels,
            days: this.daysLabels,
        };
    }
}
DatePickerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DatePickerService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatePickerSingleComponent {
    constructor() {
        // weird error on typescript if i use DatePickerSingleOptions
        this.options = /** @type {?} */ ({});
        this.bindFormControl = new FormControl();
        this.changeMonth = new EventEmitter();
        this.changeChosenDay = new EventEmitter();
        this.open = false;
    }
    /**
     * @param {?} changeChosenDayResponse
     * @return {?}
     */
    onChangeChosenDay(changeChosenDayResponse) {
        this.changeChosenDay.emit(changeChosenDayResponse);
    }
    /**
     * @param {?} changeMonthResponse
     * @return {?}
     */
    onChangeMonth(changeMonthResponse) {
        this.changeMonth.emit(changeMonthResponse);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
    /**
     * @return {?}
     */
    show() {
        this.open = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.open = false;
    }
    /**
     * @return {?}
     */
    isOpen() {
        return this.open;
    }
}
DatePickerSingleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-date-picker-single',
                template: `<div
  class="date-picker-single-wrap"
  [class.hidden]="!isOpen()">
  <div class="date-picker-single-content">
    <app-single-calendar
      [bindFormControl]="bindFormControl"
      [noChoose]="options.noChoose"
      [startChosenToday]="options.startChosenToday"
      [startViewportAtChosen]="options.startViewportAtChosen"
      [startViewportDate]="options.startViewportDate"
      [monthLabels]="options.monthLabels"
      [dayLabels]="options.dayLabels"
      [disableDatesBefore]="options.disableDatesBefore"
      [disableDatesAfter]="options.disableDatesAfter"
      [formatterToDate]="formatterToDate"
      [formatterFromDate]="formatterFromDate"
      (changeChosenDay)="onChangeChosenDay($event)"
      (changeMonth)="onChangeMonth($event)">
    </app-single-calendar>
  </div>
</div>
`,
                styles: [`:host {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  z-index: 1; }

div.date-picker-single-wrap {
  display: inline-block;
  background-color: white;
  overflow: hidden;
  -webkit-transition: 200ms;
  transition: 200ms;
  max-height: 300px; }
  div.date-picker-single-wrap.hidden {
    max-height: 0; }
  div.date-picker-single-wrap div.date-picker-single-content {
    border: solid 1px grey;
    padding: 15px; }
`]
            },] },
];
/** @nocollapse */
DatePickerSingleComponent.ctorParameters = () => [];
DatePickerSingleComponent.propDecorators = {
    "options": [{ type: Input },],
    "bindFormControl": [{ type: Input },],
    "formatterToDate": [{ type: Input },],
    "formatterFromDate": [{ type: Input },],
    "changeMonth": [{ type: Output },],
    "changeChosenDay": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} doom
 * @param {?=} limit
 * @return {?}
 */
function buildCalendarMatrix(doom, limit = 31) {
    const /** @type {?} */ r = [];
    let /** @type {?} */ i = doom;
    let /** @type {?} */ n = 1;
    let /** @type {?} */ row = 0;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @abstract
 */
class CalendarComponent {
    /**
     * @param {?} datePickerService
     */
    constructor(datePickerService) {
        this.datePickerService = datePickerService;
        this.changeMonth = new EventEmitter();
        this.labels = /** @type {?} */ ({});
        this.labels.months = this.datePickerService.labels.months;
        this.labels.days = this.datePickerService.labels.days;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Initialize labels
        if (this.monthLabels && this.monthLabels instanceof Array && this.monthLabels.length === 12) {
            this.labels.months = this.monthLabels;
        }
        if (this.dayLabels && this.dayLabels instanceof Array && this.dayLabels.length === 7) {
            this.labels.days = this.dayLabels;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setCalendarViewport(date) {
        const /** @type {?} */ firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const /** @type {?} */ lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.currentDate = firstOfMonth;
        this.matrix = buildCalendarMatrix(firstOfMonth.getDay(), lastOfMonth.getDate());
    }
    /**
     * @return {?}
     */
    nextMonth() {
        const /** @type {?} */ next = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.changeMonth.emit({
            action: 'next',
            date: next,
        });
        this.setCalendarViewport(next);
    }
    /**
     * @return {?}
     */
    prevMonth() {
        const /** @type {?} */ prev = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.changeMonth.emit({
            action: 'prev',
            date: prev,
        });
        this.setCalendarViewport(prev);
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    isDisabledBeforeAfter(dateNumber) {
        const /** @type {?} */ dateTime = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber).setHours(0, 0, 0, 0);
        if (this.disableDatesBefore && dateTime < this.disableDatesBefore.setHours(0, 0, 0, 0)) {
            return true;
        }
        if (this.disableDatesAfter && dateTime > this.disableDatesAfter.setHours(0, 0, 0, 0)) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    getCurrentMonthLabel() {
        return this.labels.months[this.currentDate.getMonth()];
    }
}
CalendarComponent.propDecorators = {
    "startViewportDate": [{ type: Input },],
    "monthLabels": [{ type: Input },],
    "dayLabels": [{ type: Input },],
    "noControls": [{ type: Input },],
    "disableDatesBefore": [{ type: Input },],
    "disableDatesAfter": [{ type: Input },],
    "changeMonth": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class SingleCalendarComponent extends CalendarComponent {
    /**
     * @param {?} datePickerService
     */
    constructor(datePickerService) {
        super(datePickerService);
        this.datePickerService = datePickerService;
        this.noChoose = false;
        this.startChosenToday = false;
        this.startViewportAtChosen = true;
        this.bindFormControl = new FormControl();
        this.changeChosenDay = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.currentDate = new Date();
        if (this.startChosenToday) {
            this.bindFormControl.setValue(new Date((new Date()).setHours(0, 0, 0, 0)));
        }
        if (this.bindFormControl.value) {
            this.chosenDate = this.datePickerService.formatToDate(this.bindFormControl.value, this.formatterToDate);
            if (this.startViewportAtChosen) {
                this.currentDate = this.chosenDate;
            }
        }
        this.valueChangesSubscription = this.bindFormControl.valueChanges.subscribe(v => {
            const /** @type {?} */ c = this.datePickerService.formatToDate(v, this.formatterToDate);
            if (!(c instanceof Date)) {
                return console.error(new Error('value is not instance of Date'));
            }
            this.chosenDate = new Date(c.setHours(0, 0, 0, 0));
        });
        this.setCalendarViewport(this.currentDate);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    chooseDay(dateNumber) {
        if (this.noChoose) {
            return;
        }
        if (this.isDisabledBeforeAfter(dateNumber)) {
            return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
        }
        this.chosenDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
        const /** @type {?} */ formattedDate = this.datePickerService.formatFromDate(this.chosenDate, this.formatterFromDate);
        this.bindFormControl.setValue(formattedDate, { emitEvent: true });
        this.changeChosenDay.emit({
            date: new Date(this.chosenDate.getTime()),
            formatted: formattedDate,
        });
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    isChosenDay(dateNumber) {
        if (!this.chosenDate) {
            return false;
        }
        return this.chosenDate.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenDate.getMonth() === this.currentDate.getMonth() &&
            this.chosenDate.getDate() === dateNumber;
    }
    /**
     * @return {?}
     */
    get value() {
        const /** @type {?} */ d = this.chosenDate ? new Date(this.chosenDate.getTime()) : undefined;
        return d ? this.datePickerService.formatFromDate(d) : d;
    }
}
SingleCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-single-calendar',
                template: `<div *ngIf="currentDate && labels" class="calendar-wrap">
  <div class="controls-wrap" *ngIf="!noControls">
    <span class="prev-month" (click)="prevMonth()"><i class="arrow left"></i></span>
    <span class="next-month" (click)="nextMonth()" ><i class="arrow right"></i></span>
  </div>
  <h5>{{getCurrentMonthLabel()}} {{currentDate.getFullYear()}}</h5>
  <table>
    <thead>
    <tr>
      <th scope="col" *ngFor="let day of labels.days;">
        <span>{{day}}</span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let row of matrix; let i = index;">
      <td *ngFor="let d of row; let j = index">
        <div
          class="overlay"
          *ngIf="d"
          [class.disabled]="isDisabledBeforeAfter(d)"
          [class.choosable]="!noChoose"
          [class.chosen]="isChosenDay(d)"
          (click)="chooseDay(d)">
          <span>{{d | padDayNumber}}</span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`,
                styles: [`:host {
  display: inline-block; }

div.calendar-wrap {
  display: inline-block;
  background-color: transparent;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
  div.calendar-wrap div.controls-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-bottom: -28px;
    margin-top: 10px;
    padding: 0 5px; }
    div.calendar-wrap div.controls-wrap span {
      cursor: pointer;
      background: none;
      border: none;
      outline: none; }
      div.calendar-wrap div.controls-wrap span i.arrow {
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 5px; }
        div.calendar-wrap div.controls-wrap span i.arrow.left {
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg); }
        div.calendar-wrap div.controls-wrap span i.arrow.right {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg); }
  div.calendar-wrap h5 {
    margin: 10px 0;
    text-align: center; }
  div.calendar-wrap table {
    border-spacing: 0;
    border-collapse: collapse; }
    div.calendar-wrap table thead tr > th {
      width: 33px;
      height: 24px; }
      div.calendar-wrap table thead tr > th span {
        font-weight: 400;
        font-size: 15px; }
    div.calendar-wrap table tbody tr td {
      width: 33px;
      height: 24px;
      text-align: center; }
      div.calendar-wrap table tbody tr td:last-child > div.overlay.ranged {
        border-top-right-radius: 45%;
        border-bottom-right-radius: 45%; }
      div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged {
        border-top-left-radius: 45%;
        border-bottom-left-radius: 45%; }
        div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged:before {
          content: normal; }
      div.calendar-wrap table tbody tr td:first-child > div.overlay.chosen-right:before {
        content: normal; }
      div.calendar-wrap table tbody tr td div.overlay {
        width: 26px;
        height: 25px;
        border-radius: 50%;
        position: relative;
        margin: auto;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box; }
        div.calendar-wrap table tbody tr td div.overlay.disabled {
          pointer-events: none;
          cursor: not-allowed; }
          div.calendar-wrap table tbody tr td div.overlay.disabled span {
            color: #e0e0e0; }
        div.calendar-wrap table tbody tr td div.overlay.choosable {
          cursor: pointer; }
          div.calendar-wrap table tbody tr td div.overlay.choosable:hover {
            background-color: #11AEFA; }
            div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged {
              border: solid 1px red; }
              div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged:before {
                top: -1px; }
            div.calendar-wrap table tbody tr td div.overlay.choosable:hover span {
              color: white;
              font-size: 15px;
              font-weight: 300; }
        div.calendar-wrap table tbody tr td div.overlay.ranged {
          width: 33px;
          background-color: #e0e0e0;
          border-radius: 0; }
          div.calendar-wrap table tbody tr td div.overlay.ranged:before {
            content: '';
            position: absolute;
            width: 16.5px;
            height: 25px;
            left: -16.5px;
            background: #e0e0e0;
            z-index: -1; }
          div.calendar-wrap table tbody tr td div.overlay.ranged.first-day {
            border-top-left-radius: 45%;
            border-bottom-left-radius: 45%; }
            div.calendar-wrap table tbody tr td div.overlay.ranged.first-day:before {
              content: normal; }
        div.calendar-wrap table tbody tr td div.overlay.chosen {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay.chosen-left {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-left span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay.chosen-right {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right:before {
            content: '';
            position: absolute;
            width: 33px;
            height: 25px;
            left: -23px;
            background: #e0e0e0;
            z-index: -1; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right.first-day:before {
            content: normal; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay span {
          line-height: 25px;
          color: black;
          font-size: 15px;
          font-weight: 100;
          vertical-align: middle; }
`]
            },] },
];
/** @nocollapse */
SingleCalendarComponent.ctorParameters = () => [
    { type: DatePickerService, },
];
SingleCalendarComponent.propDecorators = {
    "noChoose": [{ type: Input },],
    "startChosenToday": [{ type: Input },],
    "startViewportAtChosen": [{ type: Input },],
    "formatterToDate": [{ type: Input },],
    "formatterFromDate": [{ type: Input },],
    "bindFormControl": [{ type: Input },],
    "changeChosenDay": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const RangedDaySide = {
    LEFT: 'left',
    RIGHT: 'right',
};
/**
 * @record
 */

class RangedCalendarComponent extends CalendarComponent {
    /**
     * @param {?} datePickerService
     */
    constructor(datePickerService) {
        super(datePickerService);
        this.datePickerService = datePickerService;
        this.side = RangedDaySide.LEFT;
        this.noChoose = false;
        this.startChosenLeftToday = false;
        this.bindLeftFormControl = new FormControl();
        this.bindRightFormControl = new FormControl();
        this.changeChosenDay = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.currentDate = new Date();
        if (this.startChosenLeftToday) {
            this.chosenLeftDay = new Date(this.currentDate.setHours(0, 0, 0, 0));
            this.side = RangedDaySide.RIGHT;
        }
        const /** @type {?} */ l = this.datePickerService.formatToDate(this.bindLeftFormControl.value, this.formatterToDate);
        const /** @type {?} */ r = this.datePickerService.formatToDate(this.bindRightFormControl.value, this.formatterToDate);
        if (l && r) {
            if (r.getTime() < l.getTime()) {
                console.error(new Error('right value must be more than left'));
                this.chosenLeftDay = l;
                this.bindRightFormControl.setValue(null);
                this.side = RangedDaySide.RIGHT;
            }
            else {
                this.chosenLeftDay = l;
                this.chosenRightDay = r;
                this.side = RangedDaySide.RIGHT;
            }
        }
        else {
            if (l) {
                this.chosenLeftDay = l;
                this.side = RangedDaySide.RIGHT;
            }
            else if (r) {
                this.chosenRightDay = r;
                this.side = RangedDaySide.LEFT;
            }
        }
        this.setCalendarViewport(this.currentDate);
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    chooseDay(dateNumber) {
        if (this.noChoose) {
            return;
        }
        if (this.isDisabledBeforeAfter(dateNumber)) {
            return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
        }
        const /** @type {?} */ chosen = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
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
        const /** @type {?} */ formattedDate = this.datePickerService.formatFromDate(chosen, this.formatterFromDate);
        const /** @type {?} */ response = {
            side: this.side,
            date: chosen,
            formatted: formattedDate,
        };
        if (this.side === RangedDaySide.LEFT) {
            this.chosenLeftDay = chosen;
            this.bindLeftFormControl.setValue(formattedDate, { emitEvent: true });
            this.side = RangedDaySide.RIGHT;
        }
        else {
            this.chosenRightDay = chosen;
            this.bindRightFormControl.setValue(formattedDate, { emitEvent: true });
            // Side is not changing after set the right one
        }
        this.changeChosenDay.emit(response);
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    isChosenLeftDay(dateNumber) {
        if (!this.chosenLeftDay) {
            return false;
        }
        return this.chosenLeftDay.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenLeftDay.getMonth() === this.currentDate.getMonth() &&
            this.chosenLeftDay.getDate() === dateNumber;
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    isChosenRightDay(dateNumber) {
        if (!this.chosenRightDay) {
            return false;
        }
        return this.chosenRightDay.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenRightDay.getMonth() === this.currentDate.getMonth() &&
            this.chosenRightDay.getDate() === dateNumber;
    }
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    isWithinRange(dateNumber) {
        if (!this.chosenLeftDay || !this.chosenRightDay) {
            return false;
        }
        const /** @type {?} */ c = (new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber))
            .setHours(0, 0, 0, 0);
        return c > this.chosenLeftDay.getTime() &&
            c < this.chosenRightDay.getTime();
    }
    /**
     * @return {?}
     */
    get value() {
        const /** @type {?} */ dl = this.chosenLeftDay ? new Date(this.chosenLeftDay.getTime()) : undefined;
        const /** @type {?} */ rl = this.chosenRightDay ? new Date(this.chosenRightDay.getTime()) : undefined;
        return [dl, rl];
    }
}
RangedCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ranged-calendar',
                template: `<div *ngIf="currentDate && labels" class="calendar-wrap">
  <div class="controls-wrap" *ngIf="!noControls">
    <span class="prev-month" (click)="prevMonth()"><i class="arrow left"></i></span>
    <span class="next-month" (click)="nextMonth()" ><i class="arrow right"></i></span>
  </div>
  <h5>{{getCurrentMonthLabel()}} {{currentDate.getFullYear()}}</h5>
  <table>
    <thead>
    <tr>
      <th scope="col" *ngFor="let day of labels.days;">
        <span>{{day}}</span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let row of matrix; let i = index;">
      <td *ngFor="let d of row; let j = index">
        <div
          class="overlay"
          *ngIf="d"
          [class.first-day]="d === 1"
          [class.disabled]="isDisabledBeforeAfter(d)"
          [class.choosable]="!noChoose"
          [class.chosen-left]="isChosenLeftDay(d)"
          [class.chosen-right]="isChosenRightDay(d)"
          [class.ranged]="isWithinRange(d)"
          (click)="chooseDay(d)">
          <span>{{d | padDayNumber}}</span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`,
                styles: [`:host {
  display: inline-block; }

div.calendar-wrap {
  display: inline-block;
  background-color: transparent;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
  div.calendar-wrap div.controls-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-bottom: -28px;
    margin-top: 10px;
    padding: 0 5px; }
    div.calendar-wrap div.controls-wrap span {
      cursor: pointer;
      background: none;
      border: none;
      outline: none; }
      div.calendar-wrap div.controls-wrap span i.arrow {
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 5px; }
        div.calendar-wrap div.controls-wrap span i.arrow.left {
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg); }
        div.calendar-wrap div.controls-wrap span i.arrow.right {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg); }
  div.calendar-wrap h5 {
    margin: 10px 0;
    text-align: center; }
  div.calendar-wrap table {
    border-spacing: 0;
    border-collapse: collapse; }
    div.calendar-wrap table thead tr > th {
      width: 33px;
      height: 24px; }
      div.calendar-wrap table thead tr > th span {
        font-weight: 400;
        font-size: 15px; }
    div.calendar-wrap table tbody tr td {
      width: 33px;
      height: 24px;
      text-align: center; }
      div.calendar-wrap table tbody tr td:last-child > div.overlay.ranged {
        border-top-right-radius: 45%;
        border-bottom-right-radius: 45%; }
      div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged {
        border-top-left-radius: 45%;
        border-bottom-left-radius: 45%; }
        div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged:before {
          content: normal; }
      div.calendar-wrap table tbody tr td:first-child > div.overlay.chosen-right:before {
        content: normal; }
      div.calendar-wrap table tbody tr td div.overlay {
        width: 26px;
        height: 25px;
        border-radius: 50%;
        position: relative;
        margin: auto;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box; }
        div.calendar-wrap table tbody tr td div.overlay.disabled {
          pointer-events: none;
          cursor: not-allowed; }
          div.calendar-wrap table tbody tr td div.overlay.disabled span {
            color: #e0e0e0; }
        div.calendar-wrap table tbody tr td div.overlay.choosable {
          cursor: pointer; }
          div.calendar-wrap table tbody tr td div.overlay.choosable:hover {
            background-color: #11AEFA; }
            div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged {
              border: solid 1px red; }
              div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged:before {
                top: -1px; }
            div.calendar-wrap table tbody tr td div.overlay.choosable:hover span {
              color: white;
              font-size: 15px;
              font-weight: 300; }
        div.calendar-wrap table tbody tr td div.overlay.ranged {
          width: 33px;
          background-color: #e0e0e0;
          border-radius: 0; }
          div.calendar-wrap table tbody tr td div.overlay.ranged:before {
            content: '';
            position: absolute;
            width: 16.5px;
            height: 25px;
            left: -16.5px;
            background: #e0e0e0;
            z-index: -1; }
          div.calendar-wrap table tbody tr td div.overlay.ranged.first-day {
            border-top-left-radius: 45%;
            border-bottom-left-radius: 45%; }
            div.calendar-wrap table tbody tr td div.overlay.ranged.first-day:before {
              content: normal; }
        div.calendar-wrap table tbody tr td div.overlay.chosen {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay.chosen-left {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-left span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay.chosen-right {
          background-color: #11AEFA !important; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right:before {
            content: '';
            position: absolute;
            width: 33px;
            height: 25px;
            left: -23px;
            background: #e0e0e0;
            z-index: -1; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right.first-day:before {
            content: normal; }
          div.calendar-wrap table tbody tr td div.overlay.chosen-right span {
            color: white !important;
            font-size: 15px !important;
            font-weight: 300 !important; }
        div.calendar-wrap table tbody tr td div.overlay span {
          line-height: 25px;
          color: black;
          font-size: 15px;
          font-weight: 100;
          vertical-align: middle; }
`]
            },] },
];
/** @nocollapse */
RangedCalendarComponent.ctorParameters = () => [
    { type: DatePickerService, },
];
RangedCalendarComponent.propDecorators = {
    "side": [{ type: Input },],
    "noChoose": [{ type: Input },],
    "startChosenLeftToday": [{ type: Input },],
    "bindLeftFormControl": [{ type: Input },],
    "bindRightFormControl": [{ type: Input },],
    "formatterToDate": [{ type: Input },],
    "formatterFromDate": [{ type: Input },],
    "changeChosenDay": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PadDayNumberPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        const /** @type {?} */ s = `${value}`;
        return s.length === 1 ? `0${s}` : s;
    }
}
PadDayNumberPipe.decorators = [
    { type: Pipe, args: [{
                name: 'padDayNumber'
            },] },
];
/** @nocollapse */
PadDayNumberPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatePickerSingleDirective {
    /**
     * @param {?} control
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    constructor(control, viewContainerRef, resolver) {
        this.control = control;
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.options = /** @type {?} */ ({});
        this.changeMonth = new EventEmitter();
        this.changeChosenDay = new EventEmitter();
        this.el = /** @type {?} */ (this.viewContainerRef.element.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ factory = this.resolver.resolveComponentFactory(DatePickerSingleComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        const /** @type {?} */ component = this.componentRef.instance;
        component.bindFormControl = /** @type {?} */ (this.control.control);
        component.formatterFromDate = this.formatterFromDate;
        component.formatterToDate = this.formatterToDate;
        this.onChangeChosenDaySubscription = component.changeChosenDay.subscribe(val => {
            this.onChangeChosenDay(val);
            // Explicit false
            if (this.options.closeOnChangeDay === false) {
                return;
            }
            component.hide();
        });
        this.onChangeMonthSubscription = component.changeMonth.subscribe(val => this.onChangeMonth(val));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.onChangeChosenDaySubscription) {
            this.onChangeChosenDaySubscription.unsubscribe();
        }
        if (this.onChangeMonthSubscription) {
            this.onChangeMonthSubscription.unsubscribe();
        }
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
    /**
     * @param {?} changeChosenDayResponse
     * @return {?}
     */
    onChangeChosenDay(changeChosenDayResponse) {
        this.changeChosenDay.emit(changeChosenDayResponse);
    }
    /**
     * @param {?} changeMonthResponse
     * @return {?}
     */
    onChangeMonth(changeMonthResponse) {
        this.changeMonth.emit(changeMonthResponse);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onFocus(value) {
        if (!this.isDisabled()) {
            const /** @type {?} */ component = this.componentRef.instance;
            component.show();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClickOutside($event) {
        const /** @type {?} */ target = $event.target;
        const /** @type {?} */ component = this.componentRef.instance;
        // If it's the same element turn it on
        if (target === this.el) {
            return component.show();
        }
        // Explicit false
        if (this.options.closeOnClickOutside === false) {
            return;
        }
        if (!component.isOpen() || !target) {
            return;
        }
        if (!target.closest('.date-picker-single-wrap')) {
            component.hide();
        }
    }
    /**
     * @return {?}
     */
    isDisabled() {
        return this.control.control.disabled;
    }
}
DatePickerSingleDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line
                selector: '[datePickerSingle]',
            },] },
];
/** @nocollapse */
DatePickerSingleDirective.ctorParameters = () => [
    { type: NgControl, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
DatePickerSingleDirective.propDecorators = {
    "options": [{ type: Input },],
    "changeMonth": [{ type: Output },],
    "changeChosenDay": [{ type: Output },],
    "formatterToDate": [{ type: Input },],
    "formatterFromDate": [{ type: Input },],
    "onFocus": [{ type: HostListener, args: ['focus', ['$event.target.value'],] },],
    "onClickOutside": [{ type: HostListener, args: ['window:click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatePickerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: DatePickerModule,
            providers: [
                DatePickerService
            ]
        };
    }
}
DatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    DatePickerService,
                ],
                declarations: [
                    PadDayNumberPipe,
                    SingleCalendarComponent,
                    DatePickerSingleDirective,
                    DatePickerSingleComponent,
                    RangedCalendarComponent
                ],
                entryComponents: [DatePickerSingleComponent],
                exports: [
                    SingleCalendarComponent,
                    DatePickerSingleDirective,
                    DatePickerSingleComponent,
                    RangedCalendarComponent,
                ],
            },] },
];
/** @nocollapse */
DatePickerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { DatePickerService, DatePickerSingleComponent, SingleCalendarComponent, RangedDaySide, RangedCalendarComponent, DatePickerModule, CalendarComponent as ɵa, DatePickerSingleDirective as ɵc, PadDayNumberPipe as ɵb };
//# sourceMappingURL=ngx-datepicker.js.map
