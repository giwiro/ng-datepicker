(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('moment'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'moment', '@angular/forms', '@angular/common'], factory) :
	(factory((global['ngx-datepicker'] = {}),global.ng.core,global.momentImported,global.ng.forms,global.ng.common));
}(this, (function (exports,core,momentImported,forms,common) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Hack for typescript for aot packaging
var moment = momentImported;
/**
 * @record
 */
var DEFAULT_MONTHS_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
var DEFAULT_DAYS_LABEL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var DatePickerService = (function () {
    function DatePickerService() {
        // Set defaults
        this.monthLabels = DEFAULT_MONTHS_LABEL;
        this.daysLabels = DEFAULT_DAYS_LABEL;
    }
    /**
     * @param {?} f
     * @return {?}
     */
    DatePickerService.prototype.setFormatterToDate = function (f) {
        this.formatterToDate = f;
    };
    /**
     * @param {?} f
     * @return {?}
     */
    DatePickerService.prototype.setFormatterFromDate = function (f) {
        this.formatterFromDate = f;
    };
    /**
     * @param {?} input
     * @param {?=} auxFormatter
     * @return {?}
     */
    DatePickerService.prototype.formatToDate = function (input, auxFormatter) {
        var /** @type {?} */ formatter = auxFormatter || this.formatterToDate;
        if (formatter instanceof Function) {
            return formatter(input);
        }
        else if (typeof formatter === 'string') {
            return moment(input, formatter).toDate();
        }
        else {
            return input;
        }
    };
    /**
     * @param {?} d
     * @param {?=} auxFormatter
     * @return {?}
     */
    DatePickerService.prototype.formatFromDate = function (d, auxFormatter) {
        var /** @type {?} */ formatter = auxFormatter || this.formatterFromDate;
        if (formatter instanceof Function) {
            return formatter(d);
        }
        else if (typeof formatter === 'string') {
            return moment(d).format(formatter);
        }
        else {
            return d;
        }
    };
    /**
     * @param {?} l
     * @return {?}
     */
    DatePickerService.prototype.setLabels = function (l) {
        if (l.months) {
            if (!(l.months instanceof Array)) {
                return console.error(new Error('months must be an array'));
            }
            if (l.months.length !== 12) {
                return console.error(new Error('months array\'s length must be 12'));
            }
            this.monthLabels = l.months.slice();
        }
        if (l.days) {
            if (!(l.days instanceof Array)) {
                return console.error(new Error('days must be an array'));
            }
            if (l.days.length !== 7) {
                return console.error(new Error('days array\'s length must be 7'));
            }
            this.daysLabels = l.days.slice();
        }
    };
    Object.defineProperty(DatePickerService.prototype, "labels", {
        /**
         * @return {?}
         */
        get: function () {
            return {
                months: this.monthLabels,
                days: this.daysLabels,
            };
        },
        enumerable: true,
        configurable: true
    });
    return DatePickerService;
}());
DatePickerService.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
DatePickerService.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DatePickerSingleComponent = (function () {
    function DatePickerSingleComponent() {
        // weird error on typescript if i use DatePickerSingleOptions
        this.options = ({});
        this.bindFormControl = new forms.FormControl();
        this.changeMonth = new core.EventEmitter();
        this.changeChosenDay = new core.EventEmitter();
        this.open = false;
    }
    /**
     * @param {?} changeChosenDayResponse
     * @return {?}
     */
    DatePickerSingleComponent.prototype.onChangeChosenDay = function (changeChosenDayResponse) {
        this.changeChosenDay.emit(changeChosenDayResponse);
    };
    /**
     * @param {?} changeMonthResponse
     * @return {?}
     */
    DatePickerSingleComponent.prototype.onChangeMonth = function (changeMonthResponse) {
        this.changeMonth.emit(changeMonthResponse);
    };
    /**
     * @return {?}
     */
    DatePickerSingleComponent.prototype.toggle = function () {
        this.open = !this.open;
    };
    /**
     * @return {?}
     */
    DatePickerSingleComponent.prototype.show = function () {
        this.open = true;
    };
    /**
     * @return {?}
     */
    DatePickerSingleComponent.prototype.hide = function () {
        this.open = false;
    };
    /**
     * @return {?}
     */
    DatePickerSingleComponent.prototype.isOpen = function () {
        return this.open;
    };
    return DatePickerSingleComponent;
}());
DatePickerSingleComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-date-picker-single',
                template: "<div\n  class=\"date-picker-single-wrap\"\n  [class.hidden]=\"!isOpen()\">\n  <div class=\"date-picker-single-content\">\n    <app-single-calendar\n      [bindFormControl]=\"bindFormControl\"\n      [noChoose]=\"options.noChoose\"\n      [startChosenToday]=\"options.startChosenToday\"\n      [startViewportAtChosen]=\"options.startViewportAtChosen\"\n      [startViewportDate]=\"options.startViewportDate\"\n      [monthLabels]=\"options.monthLabels\"\n      [dayLabels]=\"options.dayLabels\"\n      [disableDatesBefore]=\"options.disableDatesBefore\"\n      [disableDatesAfter]=\"options.disableDatesAfter\"\n      [formatterToDate]=\"formatterToDate\"\n      [formatterFromDate]=\"formatterFromDate\"\n      (changeChosenDay)=\"onChangeChosenDay($event)\"\n      (changeMonth)=\"onChangeMonth($event)\">\n    </app-single-calendar>\n  </div>\n</div>\n",
                styles: [":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  z-index: 1; }\n\ndiv.date-picker-single-wrap {\n  display: inline-block;\n  background-color: white;\n  overflow: hidden;\n  -webkit-transition: 200ms;\n  transition: 200ms;\n  max-height: 300px; }\n  div.date-picker-single-wrap.hidden {\n    max-height: 0; }\n  div.date-picker-single-wrap div.date-picker-single-content {\n    border: solid 1px grey;\n    padding: 15px; }\n"]
            },] },
];
/** @nocollapse */
DatePickerSingleComponent.ctorParameters = function () { return []; };
DatePickerSingleComponent.propDecorators = {
    "options": [{ type: core.Input },],
    "bindFormControl": [{ type: core.Input },],
    "formatterToDate": [{ type: core.Input },],
    "formatterFromDate": [{ type: core.Input },],
    "changeMonth": [{ type: core.Output },],
    "changeChosenDay": [{ type: core.Output },],
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
function buildCalendarMatrix(doom, limit) {
    if (limit === void 0) { limit = 31; }
    var /** @type {?} */ r = [];
    var /** @type {?} */ i = doom;
    var /** @type {?} */ n = 1;
    var /** @type {?} */ row = 0;
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
var CalendarComponent = (function () {
    /**
     * @param {?} datePickerService
     */
    function CalendarComponent(datePickerService) {
        this.datePickerService = datePickerService;
        this.changeMonth = new core.EventEmitter();
        this.labels = ({});
        this.labels.months = this.datePickerService.labels.months;
        this.labels.days = this.datePickerService.labels.days;
    }
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = function () {
        // Initialize labels
        if (this.monthLabels && this.monthLabels instanceof Array && this.monthLabels.length === 12) {
            this.labels.months = this.monthLabels;
        }
        if (this.dayLabels && this.dayLabels instanceof Array && this.dayLabels.length === 7) {
            this.labels.days = this.dayLabels;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.setCalendarViewport = function (date) {
        var /** @type {?} */ firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var /** @type {?} */ lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.currentDate = firstOfMonth;
        this.matrix = buildCalendarMatrix(firstOfMonth.getDay(), lastOfMonth.getDate());
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.nextMonth = function () {
        var /** @type {?} */ next = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.changeMonth.emit({
            action: 'next',
            date: next,
        });
        this.setCalendarViewport(next);
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.prevMonth = function () {
        var /** @type {?} */ prev = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.changeMonth.emit({
            action: 'prev',
            date: prev,
        });
        this.setCalendarViewport(prev);
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    CalendarComponent.prototype.isDisabledBeforeAfter = function (dateNumber) {
        var /** @type {?} */ dateTime = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber).setHours(0, 0, 0, 0);
        if (this.disableDatesBefore && dateTime < this.disableDatesBefore.setHours(0, 0, 0, 0)) {
            return true;
        }
        if (this.disableDatesAfter && dateTime > this.disableDatesAfter.setHours(0, 0, 0, 0)) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.getCurrentMonthLabel = function () {
        return this.labels.months[this.currentDate.getMonth()];
    };
    return CalendarComponent;
}());
CalendarComponent.propDecorators = {
    "startViewportDate": [{ type: core.Input },],
    "monthLabels": [{ type: core.Input },],
    "dayLabels": [{ type: core.Input },],
    "noControls": [{ type: core.Input },],
    "disableDatesBefore": [{ type: core.Input },],
    "disableDatesAfter": [{ type: core.Input },],
    "changeMonth": [{ type: core.Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var SingleCalendarComponent = (function (_super) {
    __extends(SingleCalendarComponent, _super);
    /**
     * @param {?} datePickerService
     */
    function SingleCalendarComponent(datePickerService) {
        var _this = _super.call(this, datePickerService) || this;
        _this.datePickerService = datePickerService;
        _this.noChoose = false;
        _this.startChosenToday = false;
        _this.startViewportAtChosen = true;
        _this.bindFormControl = new forms.FormControl();
        _this.changeChosenDay = new core.EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    SingleCalendarComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
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
        this.valueChangesSubscription = this.bindFormControl.valueChanges.subscribe(function (v) {
            var /** @type {?} */ c = _this.datePickerService.formatToDate(v, _this.formatterToDate);
            if (!(c instanceof Date)) {
                return console.error(new Error('value is not instance of Date'));
            }
            _this.chosenDate = new Date(c.setHours(0, 0, 0, 0));
        });
        this.setCalendarViewport(this.currentDate);
    };
    /**
     * @return {?}
     */
    SingleCalendarComponent.prototype.ngOnDestroy = function () {
        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    SingleCalendarComponent.prototype.chooseDay = function (dateNumber) {
        if (this.noChoose) {
            return;
        }
        if (this.isDisabledBeforeAfter(dateNumber)) {
            return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
        }
        this.chosenDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
        var /** @type {?} */ formattedDate = this.datePickerService.formatFromDate(this.chosenDate, this.formatterFromDate);
        this.bindFormControl.setValue(formattedDate, { emitEvent: true });
        this.changeChosenDay.emit({
            date: new Date(this.chosenDate.getTime()),
            formatted: formattedDate,
        });
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    SingleCalendarComponent.prototype.isChosenDay = function (dateNumber) {
        if (!this.chosenDate) {
            return false;
        }
        return this.chosenDate.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenDate.getMonth() === this.currentDate.getMonth() &&
            this.chosenDate.getDate() === dateNumber;
    };
    Object.defineProperty(SingleCalendarComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ d = this.chosenDate ? new Date(this.chosenDate.getTime()) : undefined;
            return d ? this.datePickerService.formatFromDate(d) : d;
        },
        enumerable: true,
        configurable: true
    });
    return SingleCalendarComponent;
}(CalendarComponent));
SingleCalendarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-single-calendar',
                template: "<div *ngIf=\"currentDate && labels\" class=\"calendar-wrap\">\n  <div class=\"controls-wrap\" *ngIf=\"!noControls\">\n    <span class=\"prev-month\" (click)=\"prevMonth()\"><i class=\"arrow left\"></i></span>\n    <span class=\"next-month\" (click)=\"nextMonth()\" ><i class=\"arrow right\"></i></span>\n  </div>\n  <h5>{{getCurrentMonthLabel()}} {{currentDate.getFullYear()}}</h5>\n  <table>\n    <thead>\n    <tr>\n      <th scope=\"col\" *ngFor=\"let day of labels.days;\">\n        <span>{{day}}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr *ngFor=\"let row of matrix; let i = index;\">\n      <td *ngFor=\"let d of row; let j = index\">\n        <div\n          class=\"overlay\"\n          *ngIf=\"d\"\n          [class.disabled]=\"isDisabledBeforeAfter(d)\"\n          [class.choosable]=\"!noChoose\"\n          [class.chosen]=\"isChosenDay(d)\"\n          (click)=\"chooseDay(d)\">\n          <span>{{d | padDayNumber}}</span>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                styles: [":host {\n  display: inline-block; }\n\ndiv.calendar-wrap {\n  display: inline-block;\n  background-color: transparent;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n  div.calendar-wrap div.controls-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin-bottom: -28px;\n    margin-top: 10px;\n    padding: 0 5px; }\n    div.calendar-wrap div.controls-wrap span {\n      cursor: pointer;\n      background: none;\n      border: none;\n      outline: none; }\n      div.calendar-wrap div.controls-wrap span i.arrow {\n        border: solid black;\n        border-width: 0 2px 2px 0;\n        display: inline-block;\n        padding: 5px; }\n        div.calendar-wrap div.controls-wrap span i.arrow.left {\n          transform: rotate(135deg);\n          -webkit-transform: rotate(135deg); }\n        div.calendar-wrap div.controls-wrap span i.arrow.right {\n          transform: rotate(-45deg);\n          -webkit-transform: rotate(-45deg); }\n  div.calendar-wrap h5 {\n    margin: 10px 0;\n    text-align: center; }\n  div.calendar-wrap table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    div.calendar-wrap table thead tr > th {\n      width: 33px;\n      height: 24px; }\n      div.calendar-wrap table thead tr > th span {\n        font-weight: 400;\n        font-size: 15px; }\n    div.calendar-wrap table tbody tr td {\n      width: 33px;\n      height: 24px;\n      text-align: center; }\n      div.calendar-wrap table tbody tr td:last-child > div.overlay.ranged {\n        border-top-right-radius: 45%;\n        border-bottom-right-radius: 45%; }\n      div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged {\n        border-top-left-radius: 45%;\n        border-bottom-left-radius: 45%; }\n        div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged:before {\n          content: normal; }\n      div.calendar-wrap table tbody tr td:first-child > div.overlay.chosen-right:before {\n        content: normal; }\n      div.calendar-wrap table tbody tr td div.overlay {\n        width: 26px;\n        height: 25px;\n        border-radius: 50%;\n        position: relative;\n        margin: auto;\n        box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        -webkit-box-sizing: border-box; }\n        div.calendar-wrap table tbody tr td div.overlay.disabled {\n          pointer-events: none;\n          cursor: not-allowed; }\n          div.calendar-wrap table tbody tr td div.overlay.disabled span {\n            color: #e0e0e0; }\n        div.calendar-wrap table tbody tr td div.overlay.choosable {\n          cursor: pointer; }\n          div.calendar-wrap table tbody tr td div.overlay.choosable:hover {\n            background-color: #11AEFA; }\n            div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged {\n              border: solid 1px red; }\n              div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged:before {\n                top: -1px; }\n            div.calendar-wrap table tbody tr td div.overlay.choosable:hover span {\n              color: white;\n              font-size: 15px;\n              font-weight: 300; }\n        div.calendar-wrap table tbody tr td div.overlay.ranged {\n          width: 33px;\n          background-color: #e0e0e0;\n          border-radius: 0; }\n          div.calendar-wrap table tbody tr td div.overlay.ranged:before {\n            content: '';\n            position: absolute;\n            width: 16.5px;\n            height: 25px;\n            left: -16.5px;\n            background: #e0e0e0;\n            z-index: -1; }\n          div.calendar-wrap table tbody tr td div.overlay.ranged.first-day {\n            border-top-left-radius: 45%;\n            border-bottom-left-radius: 45%; }\n            div.calendar-wrap table tbody tr td div.overlay.ranged.first-day:before {\n              content: normal; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen-left {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-left span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen-right {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right:before {\n            content: '';\n            position: absolute;\n            width: 33px;\n            height: 25px;\n            left: -23px;\n            background: #e0e0e0;\n            z-index: -1; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right.first-day:before {\n            content: normal; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay span {\n          line-height: 25px;\n          color: black;\n          font-size: 15px;\n          font-weight: 100;\n          vertical-align: middle; }\n"]
            },] },
];
/** @nocollapse */
SingleCalendarComponent.ctorParameters = function () { return [
    { type: DatePickerService, },
]; };
SingleCalendarComponent.propDecorators = {
    "noChoose": [{ type: core.Input },],
    "startChosenToday": [{ type: core.Input },],
    "startViewportAtChosen": [{ type: core.Input },],
    "formatterToDate": [{ type: core.Input },],
    "formatterFromDate": [{ type: core.Input },],
    "bindFormControl": [{ type: core.Input },],
    "changeChosenDay": [{ type: core.Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RangedDaySideValues = Object.freeze({
    LEFT: /** @type {?} */ ('left'),
    RIGHT: /** @type {?} */ ('right'),
});
/**
 * @record
 */
var RangedCalendarComponent = (function (_super) {
    __extends(RangedCalendarComponent, _super);
    /**
     * @param {?} datePickerService
     */
    function RangedCalendarComponent(datePickerService) {
        var _this = _super.call(this, datePickerService) || this;
        _this.datePickerService = datePickerService;
        _this.side = RangedDaySideValues.LEFT;
        _this.noChoose = false;
        _this.startChosenLeftToday = false;
        _this.bindLeftFormControl = new forms.FormControl();
        _this.bindRightFormControl = new forms.FormControl();
        _this.changeChosenDay = new core.EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    RangedCalendarComponent.prototype.ngOnDestroy = function () {
    };
    /**
     * @return {?}
     */
    RangedCalendarComponent.prototype.ngAfterContentInit = function () {
        this.currentDate = new Date();
        if (this.startChosenLeftToday) {
            this.chosenLeftDay = new Date(this.currentDate.setHours(0, 0, 0, 0));
            this.side = RangedDaySideValues.RIGHT;
        }
        var /** @type {?} */ l = this.datePickerService.formatToDate(this.bindLeftFormControl.value, this.formatterToDate);
        var /** @type {?} */ r = this.datePickerService.formatToDate(this.bindRightFormControl.value, this.formatterToDate);
        if (l && r) {
            if (r.getTime() < l.getTime()) {
                console.error(new Error('right value must be more than left'));
                this.chosenLeftDay = l;
                this.bindRightFormControl.setValue(null);
                this.side = RangedDaySideValues.RIGHT;
            }
            else {
                this.chosenLeftDay = l;
                this.chosenRightDay = r;
                this.side = RangedDaySideValues.RIGHT;
            }
        }
        else {
            if (l) {
                this.chosenLeftDay = l;
                this.side = RangedDaySideValues.RIGHT;
            }
            else if (r) {
                this.chosenRightDay = r;
                this.side = RangedDaySideValues.LEFT;
            }
        }
        this.setCalendarViewport(this.currentDate);
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    RangedCalendarComponent.prototype.chooseDay = function (dateNumber) {
        if (this.noChoose) {
            return;
        }
        if (this.isDisabledBeforeAfter(dateNumber)) {
            return console.error(new Error('Coudn\'t set chosen day because date is disabled'));
        }
        var /** @type {?} */ chosen = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber);
        if ((this.side === RangedDaySideValues.RIGHT &&
            this.bindLeftFormControl.value &&
            chosen.getTime() <= this.chosenLeftDay.getTime()) ||
            (this.side === RangedDaySideValues.LEFT &&
                this.bindRightFormControl.value &&
                chosen.getTime() >= this.chosenRightDay.getTime())) {
            this.side = RangedDaySideValues.LEFT;
            this.chosenRightDay = undefined;
            this.bindRightFormControl.setValue(null);
        }
        var /** @type {?} */ formattedDate = this.datePickerService.formatFromDate(chosen, this.formatterFromDate);
        var /** @type {?} */ response = {
            side: this.side,
            date: chosen,
            formatted: formattedDate,
        };
        if (this.side === RangedDaySideValues.LEFT) {
            this.chosenLeftDay = chosen;
            this.bindLeftFormControl.setValue(formattedDate, { emitEvent: true });
            this.side = RangedDaySideValues.RIGHT;
        }
        else {
            this.chosenRightDay = chosen;
            this.bindRightFormControl.setValue(formattedDate, { emitEvent: true });
            // Side is not changing after set the right one
        }
        this.changeChosenDay.emit(response);
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    RangedCalendarComponent.prototype.isChosenLeftDay = function (dateNumber) {
        if (!this.chosenLeftDay) {
            return false;
        }
        return this.chosenLeftDay.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenLeftDay.getMonth() === this.currentDate.getMonth() &&
            this.chosenLeftDay.getDate() === dateNumber;
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    RangedCalendarComponent.prototype.isChosenRightDay = function (dateNumber) {
        if (!this.chosenRightDay) {
            return false;
        }
        return this.chosenRightDay.getFullYear() === this.currentDate.getFullYear() &&
            this.chosenRightDay.getMonth() === this.currentDate.getMonth() &&
            this.chosenRightDay.getDate() === dateNumber;
    };
    /**
     * @param {?} dateNumber
     * @return {?}
     */
    RangedCalendarComponent.prototype.isWithinRange = function (dateNumber) {
        if (!this.chosenLeftDay || !this.chosenRightDay) {
            return false;
        }
        var /** @type {?} */ c = (new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dateNumber))
            .setHours(0, 0, 0, 0);
        return c > this.chosenLeftDay.getTime() &&
            c < this.chosenRightDay.getTime();
    };
    Object.defineProperty(RangedCalendarComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ dl = this.chosenLeftDay ? new Date(this.chosenLeftDay.getTime()) : undefined;
            var /** @type {?} */ rl = this.chosenRightDay ? new Date(this.chosenRightDay.getTime()) : undefined;
            return [dl, rl];
        },
        enumerable: true,
        configurable: true
    });
    return RangedCalendarComponent;
}(CalendarComponent));
RangedCalendarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-ranged-calendar',
                template: "<div *ngIf=\"currentDate && labels\" class=\"calendar-wrap\">\n  <div class=\"controls-wrap\" *ngIf=\"!noControls\">\n    <span class=\"prev-month\" (click)=\"prevMonth()\"><i class=\"arrow left\"></i></span>\n    <span class=\"next-month\" (click)=\"nextMonth()\" ><i class=\"arrow right\"></i></span>\n  </div>\n  <h5>{{getCurrentMonthLabel()}} {{currentDate.getFullYear()}}</h5>\n  <table>\n    <thead>\n    <tr>\n      <th scope=\"col\" *ngFor=\"let day of labels.days;\">\n        <span>{{day}}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr *ngFor=\"let row of matrix; let i = index;\">\n      <td *ngFor=\"let d of row; let j = index\">\n        <div\n          class=\"overlay\"\n          *ngIf=\"d\"\n          [class.first-day]=\"d === 1\"\n          [class.disabled]=\"isDisabledBeforeAfter(d)\"\n          [class.choosable]=\"!noChoose\"\n          [class.chosen-left]=\"isChosenLeftDay(d)\"\n          [class.chosen-right]=\"isChosenRightDay(d)\"\n          [class.ranged]=\"isWithinRange(d)\"\n          (click)=\"chooseDay(d)\">\n          <span>{{d | padDayNumber}}</span>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                styles: [":host {\n  display: inline-block; }\n\ndiv.calendar-wrap {\n  display: inline-block;\n  background-color: transparent;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n  div.calendar-wrap div.controls-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin-bottom: -28px;\n    margin-top: 10px;\n    padding: 0 5px; }\n    div.calendar-wrap div.controls-wrap span {\n      cursor: pointer;\n      background: none;\n      border: none;\n      outline: none; }\n      div.calendar-wrap div.controls-wrap span i.arrow {\n        border: solid black;\n        border-width: 0 2px 2px 0;\n        display: inline-block;\n        padding: 5px; }\n        div.calendar-wrap div.controls-wrap span i.arrow.left {\n          transform: rotate(135deg);\n          -webkit-transform: rotate(135deg); }\n        div.calendar-wrap div.controls-wrap span i.arrow.right {\n          transform: rotate(-45deg);\n          -webkit-transform: rotate(-45deg); }\n  div.calendar-wrap h5 {\n    margin: 10px 0;\n    text-align: center; }\n  div.calendar-wrap table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    div.calendar-wrap table thead tr > th {\n      width: 33px;\n      height: 24px; }\n      div.calendar-wrap table thead tr > th span {\n        font-weight: 400;\n        font-size: 15px; }\n    div.calendar-wrap table tbody tr td {\n      width: 33px;\n      height: 24px;\n      text-align: center; }\n      div.calendar-wrap table tbody tr td:last-child > div.overlay.ranged {\n        border-top-right-radius: 45%;\n        border-bottom-right-radius: 45%; }\n      div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged {\n        border-top-left-radius: 45%;\n        border-bottom-left-radius: 45%; }\n        div.calendar-wrap table tbody tr td:first-child > div.overlay.ranged:before {\n          content: normal; }\n      div.calendar-wrap table tbody tr td:first-child > div.overlay.chosen-right:before {\n        content: normal; }\n      div.calendar-wrap table tbody tr td div.overlay {\n        width: 26px;\n        height: 25px;\n        border-radius: 50%;\n        position: relative;\n        margin: auto;\n        box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        -webkit-box-sizing: border-box; }\n        div.calendar-wrap table tbody tr td div.overlay.disabled {\n          pointer-events: none;\n          cursor: not-allowed; }\n          div.calendar-wrap table tbody tr td div.overlay.disabled span {\n            color: #e0e0e0; }\n        div.calendar-wrap table tbody tr td div.overlay.choosable {\n          cursor: pointer; }\n          div.calendar-wrap table tbody tr td div.overlay.choosable:hover {\n            background-color: #11AEFA; }\n            div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged {\n              border: solid 1px red; }\n              div.calendar-wrap table tbody tr td div.overlay.choosable:hover.ranged:before {\n                top: -1px; }\n            div.calendar-wrap table tbody tr td div.overlay.choosable:hover span {\n              color: white;\n              font-size: 15px;\n              font-weight: 300; }\n        div.calendar-wrap table tbody tr td div.overlay.ranged {\n          width: 33px;\n          background-color: #e0e0e0;\n          border-radius: 0; }\n          div.calendar-wrap table tbody tr td div.overlay.ranged:before {\n            content: '';\n            position: absolute;\n            width: 16.5px;\n            height: 25px;\n            left: -16.5px;\n            background: #e0e0e0;\n            z-index: -1; }\n          div.calendar-wrap table tbody tr td div.overlay.ranged.first-day {\n            border-top-left-radius: 45%;\n            border-bottom-left-radius: 45%; }\n            div.calendar-wrap table tbody tr td div.overlay.ranged.first-day:before {\n              content: normal; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen-left {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-left span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay.chosen-right {\n          background-color: #11AEFA !important; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right:before {\n            content: '';\n            position: absolute;\n            width: 33px;\n            height: 25px;\n            left: -23px;\n            background: #e0e0e0;\n            z-index: -1; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right.first-day:before {\n            content: normal; }\n          div.calendar-wrap table tbody tr td div.overlay.chosen-right span {\n            color: white !important;\n            font-size: 15px !important;\n            font-weight: 300 !important; }\n        div.calendar-wrap table tbody tr td div.overlay span {\n          line-height: 25px;\n          color: black;\n          font-size: 15px;\n          font-weight: 100;\n          vertical-align: middle; }\n"]
            },] },
];
/** @nocollapse */
RangedCalendarComponent.ctorParameters = function () { return [
    { type: DatePickerService, },
]; };
RangedCalendarComponent.propDecorators = {
    "side": [{ type: core.Input },],
    "noChoose": [{ type: core.Input },],
    "startChosenLeftToday": [{ type: core.Input },],
    "bindLeftFormControl": [{ type: core.Input },],
    "bindRightFormControl": [{ type: core.Input },],
    "formatterToDate": [{ type: core.Input },],
    "formatterFromDate": [{ type: core.Input },],
    "changeChosenDay": [{ type: core.Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PadDayNumberPipe = (function () {
    function PadDayNumberPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    PadDayNumberPipe.prototype.transform = function (value) {
        var /** @type {?} */ s = "" + value;
        return s.length === 1 ? "0" + s : s;
    };
    return PadDayNumberPipe;
}());
PadDayNumberPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'padDayNumber'
            },] },
];
/** @nocollapse */
PadDayNumberPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DatePickerSingleDirective = (function () {
    /**
     * @param {?} control
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    function DatePickerSingleDirective(control, viewContainerRef, resolver) {
        this.control = control;
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.options = ({});
        this.changeMonth = new core.EventEmitter();
        this.changeChosenDay = new core.EventEmitter();
        this.el = (this.viewContainerRef.element.nativeElement);
    }
    /**
     * @return {?}
     */
    DatePickerSingleDirective.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ factory = this.resolver.resolveComponentFactory(DatePickerSingleComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        var /** @type {?} */ component = this.componentRef.instance;
        component.bindFormControl = (this.control.control);
        component.formatterFromDate = this.formatterFromDate;
        component.formatterToDate = this.formatterToDate;
        this.onChangeChosenDaySubscription = component.changeChosenDay.subscribe(function (val) {
            _this.onChangeChosenDay(val);
            // Explicit false
            if (_this.options.closeOnChangeDay === false) {
                return;
            }
            component.hide();
        });
        this.onChangeMonthSubscription = component.changeMonth.subscribe(function (val) { return _this.onChangeMonth(val); });
    };
    /**
     * @return {?}
     */
    DatePickerSingleDirective.prototype.ngOnDestroy = function () {
        if (this.onChangeChosenDaySubscription) {
            this.onChangeChosenDaySubscription.unsubscribe();
        }
        if (this.onChangeMonthSubscription) {
            this.onChangeMonthSubscription.unsubscribe();
        }
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    };
    /**
     * @param {?} changeChosenDayResponse
     * @return {?}
     */
    DatePickerSingleDirective.prototype.onChangeChosenDay = function (changeChosenDayResponse) {
        this.changeChosenDay.emit(changeChosenDayResponse);
    };
    /**
     * @param {?} changeMonthResponse
     * @return {?}
     */
    DatePickerSingleDirective.prototype.onChangeMonth = function (changeMonthResponse) {
        this.changeMonth.emit(changeMonthResponse);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerSingleDirective.prototype.onFocus = function (value) {
        if (!this.isDisabled()) {
            var /** @type {?} */ component = this.componentRef.instance;
            component.show();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DatePickerSingleDirective.prototype.onClickOutside = function ($event) {
        var /** @type {?} */ target = $event.target;
        var /** @type {?} */ component = this.componentRef.instance;
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
    };
    /**
     * @return {?}
     */
    DatePickerSingleDirective.prototype.isDisabled = function () {
        return this.control.control.disabled;
    };
    return DatePickerSingleDirective;
}());
DatePickerSingleDirective.decorators = [
    { type: core.Directive, args: [{
                // tslint:disable-next-line
                selector: '[datePickerSingle]',
            },] },
];
/** @nocollapse */
DatePickerSingleDirective.ctorParameters = function () { return [
    { type: forms.NgControl, },
    { type: core.ViewContainerRef, },
    { type: core.ComponentFactoryResolver, },
]; };
DatePickerSingleDirective.propDecorators = {
    "options": [{ type: core.Input },],
    "changeMonth": [{ type: core.Output },],
    "changeChosenDay": [{ type: core.Output },],
    "formatterToDate": [{ type: core.Input },],
    "formatterFromDate": [{ type: core.Input },],
    "onFocus": [{ type: core.HostListener, args: ['focus', ['$event.target.value'],] },],
    "onClickOutside": [{ type: core.HostListener, args: ['window:click', ['$event'],] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    /**
     * @return {?}
     */
    DatePickerModule.forRoot = function () {
        return {
            ngModule: DatePickerModule,
            providers: [
                DatePickerService
            ]
        };
    };
    return DatePickerModule;
}());
DatePickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
DatePickerModule.ctorParameters = function () { return []; };

exports.DatePickerService = DatePickerService;
exports.DatePickerSingleComponent = DatePickerSingleComponent;
exports.SingleCalendarComponent = SingleCalendarComponent;
exports.RangedDaySideValues = RangedDaySideValues;
exports.RangedCalendarComponent = RangedCalendarComponent;
exports.DatePickerModule = DatePickerModule;
exports.ɵa = CalendarComponent;
exports.ɵc = DatePickerSingleDirective;
exports.ɵb = PadDayNumberPipe;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-datepicker.umd.js.map
