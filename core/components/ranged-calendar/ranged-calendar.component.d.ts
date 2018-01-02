import { EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import { DatePickerService, FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';
export declare type RangedDaySide = 'left' | 'right';
export declare const RangedDaySideValues: Readonly<{
    LEFT: RangedDaySide;
    RIGHT: RangedDaySide;
}>;
export interface ChangeChosenRangedDaysResponse {
    side: RangedDaySide;
    date: Date;
    formatted?: any;
}
export declare class RangedCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
    datePickerService: DatePickerService;
    side: RangedDaySide;
    noChoose: boolean;
    startChosenLeftToday: boolean;
    bindLeftFormControl: FormControl;
    bindRightFormControl: FormControl;
    formatterToDate: string | FormatterToDateFunction;
    formatterFromDate: string | FormatterFromDateFunction;
    changeChosenDay: EventEmitter<ChangeChosenRangedDaysResponse>;
    chosenLeftDay: Date;
    chosenRightDay: Date;
    constructor(datePickerService: DatePickerService);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    chooseDay(dateNumber: number): void;
    isChosenLeftDay(dateNumber: number): boolean;
    isChosenRightDay(dateNumber: number): boolean;
    isWithinRange(dateNumber: number): boolean;
    readonly value: [Date, Date];
}
