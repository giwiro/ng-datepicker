import { EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarComponent } from '../abstract-calendar/abstract-calendar.component';
import { DatePickerService, FormatterToDateFunction, FormatterFromDateFunction } from '../../service/date-picker.service';
export interface ChangeChosenDayResponse {
    date: Date;
    formatted?: any;
}
export declare class SingleCalendarComponent extends CalendarComponent implements AfterContentInit, OnDestroy {
    datePickerService: DatePickerService;
    chosenDate: Date;
    private valueChangesSubscription;
    noChoose: boolean;
    startChosenToday: boolean;
    startViewportAtChosen: boolean;
    formatterToDate: string | FormatterToDateFunction;
    formatterFromDate: string | FormatterFromDateFunction;
    bindFormControl: FormControl;
    changeChosenDay: EventEmitter<ChangeChosenDayResponse>;
    constructor(datePickerService: DatePickerService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    chooseDay(dateNumber: number): void;
    isChosenDay(dateNumber: number): boolean;
    readonly value: Date;
}
