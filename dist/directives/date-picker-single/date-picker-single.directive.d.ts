import { OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatePickerSingleDirectiveOptions } from './date-picker-single-options';
import { ChangeMonthResponse } from '../../components/abstract-calendar/abstract-calendar.component';
import { ChangeChosenDayResponse } from '../../components/single-calendar/single-calendar.component';
import { FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';
export declare class DatePickerSingleDirective implements OnInit, OnDestroy {
    private control;
    viewContainerRef: ViewContainerRef;
    private resolver;
    options: DatePickerSingleDirectiveOptions;
    changeMonth: EventEmitter<ChangeMonthResponse>;
    changeChosenDay: EventEmitter<ChangeChosenDayResponse>;
    formatterToDate: string | FormatterToDateFunction;
    formatterFromDate: string | FormatterFromDateFunction;
    private componentRef;
    private onChangeChosenDaySubscription;
    private onChangeMonthSubscription;
    private el;
    constructor(control: NgControl, viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onChangeChosenDay(changeChosenDayResponse: ChangeChosenDayResponse): void;
    onChangeMonth(changeMonthResponse: ChangeMonthResponse): void;
    onFocus(value: any): void;
    onClickOutside($event: any): void;
    private isDisabled();
}
