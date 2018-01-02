import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SingleCalendarOptions } from '../single-calendar/single-calendar-options';
import { ChangeChosenDayResponse } from '../single-calendar/single-calendar.component';
import { ChangeMonthResponse } from '../abstract-calendar/abstract-calendar.component';
import { FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';
export declare class DatePickerSingleComponent {
    options: SingleCalendarOptions;
    bindFormControl: FormControl;
    formatterToDate: string | FormatterToDateFunction;
    formatterFromDate: string | FormatterFromDateFunction;
    changeMonth: EventEmitter<ChangeMonthResponse>;
    changeChosenDay: EventEmitter<ChangeChosenDayResponse>;
    private open;
    constructor();
    onChangeChosenDay(changeChosenDayResponse: ChangeChosenDayResponse): void;
    onChangeMonth(changeMonthResponse: ChangeMonthResponse): void;
    toggle(): void;
    show(): void;
    hide(): void;
    isOpen(): boolean;
}
