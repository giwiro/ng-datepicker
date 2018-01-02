import { OnInit, EventEmitter } from '@angular/core';
import { DatePickerService, DatePickerLabels } from '../../service/date-picker.service';
export interface ChangeMonthResponse {
    action: 'next' | 'prev';
    date: Date;
}
export declare abstract class CalendarComponent implements OnInit {
    datePickerService: DatePickerService;
    startViewportDate: Date;
    monthLabels: string[];
    dayLabels: string[];
    noControls: boolean;
    disableDatesBefore: Date;
    disableDatesAfter: Date;
    changeMonth: EventEmitter<ChangeMonthResponse>;
    matrix: number[][];
    currentDate: Date;
    labels: DatePickerLabels;
    constructor(datePickerService: DatePickerService);
    abstract chooseDay(dateNumber: number): void;
    ngOnInit(): void;
    setCalendarViewport(date: Date): void;
    nextMonth(): void;
    prevMonth(): void;
    isDisabledBeforeAfter(dateNumber: number): boolean;
    getCurrentMonthLabel(): string;
}
