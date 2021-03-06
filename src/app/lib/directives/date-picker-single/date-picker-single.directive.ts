import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  HostListener,
  Output,
  EventEmitter,
  Optional,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerSingleComponent } from '../../components/date-picker-single/date-picker-single.component';
import { ChangeMonthResponse } from '../../components/abstract-calendar/abstract-calendar.component';
import { ChangeChosenDayResponse } from '../../components/single-calendar/single-calendar.component';
import { FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';

@Directive({
  // tslint:disable-next-line
  selector: '[datePickerSingle]',
})
export class DatePickerSingleDirective implements OnInit, OnDestroy {
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  @Input() hostClassName: string | string[];
  @Input() datePickerSingleClassName: string | string[];
  @Input() singleCalendarHostClassName: string | string[];

  @Input() startChosenToday = false;
  @Input() startViewportAtChosen = true;

  @Input() startViewportDate: Date;
  @Input() monthLabels: string[];
  @Input() dayLabels: string[];
  @Input() noControls: boolean;
  @Input() disableDatesBefore: Date;
  @Input() disableDatesAfter: Date;

  @Input() closeOnChangeDay = true;
  @Input() closeOnClickOutside = true;
  @Input() formatterToDate: string | FormatterToDateFunction;
  @Input() formatterFromDate: string | FormatterFromDateFunction;
  @Input() bindFormControl: FormControl;
  private componentRef: ComponentRef<DatePickerSingleComponent>;
  private onChangeChosenDaySubscription: Subscription;
  private onChangeMonthSubscription: Subscription;
  private el: HTMLInputElement;

  constructor(@Optional() private control:              NgControl,
              public  viewContainerRef:                 ViewContainerRef,
              private resolver:                         ComponentFactoryResolver) {
    this.el = this.viewContainerRef.element.nativeElement as HTMLInputElement;
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(DatePickerSingleComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    const component = this.componentRef.instance;
    if (this.control) {
      component.bindFormControl = this.control.control as FormControl;
    }else if (this.bindFormControl) {
      component.bindFormControl = this.bindFormControl;
    }
    component.singleCalendarHostClassName = this.singleCalendarHostClassName;
    component.startChosenToday = this.startChosenToday;
    component.startViewportAtChosen = this.startViewportAtChosen;

    component.startViewportDate = this.startViewportDate;
    component.monthLabels = this.monthLabels;
    component.dayLabels = this.dayLabels;
    component.noControls = this.noControls;
    component.disableDatesBefore = this.disableDatesBefore;
    component.disableDatesAfter = this.disableDatesAfter;

    component.formatterFromDate = this.formatterFromDate;
    component.formatterToDate = this.formatterToDate;
    component.hostClassName = this.hostClassName;
    component.datePickerSingleClassName = this.datePickerSingleClassName;

    this.onChangeChosenDaySubscription = component.changeChosenDay.subscribe(val => {
      this.onChangeChosenDay(val);
      // Explicit false
      if (this.closeOnChangeDay === false) {
        return;
      }
      component.hide();
    });
    this.onChangeMonthSubscription = component.changeMonth.subscribe(val => this.onChangeMonth(val));
  }

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

  public onChangeChosenDay(changeChosenDayResponse: ChangeChosenDayResponse): void {
    this.changeChosenDay.emit(changeChosenDayResponse);
  }

  public onChangeMonth(changeMonthResponse: ChangeMonthResponse): void {
    this.changeMonth.emit(changeMonthResponse);
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    if (!this.isDisabled()) {
      const component = this.componentRef.instance;
      component.show();
    }
  }

  @HostListener('window:click', ['$event'])
  onClickOutside($event) {
    const target = $event.target;
    const component = this.componentRef.instance;
    // If it's the same element turn it on
    if (target === this.el) {
      return component.show();
    }

    // Explicit false
    if (this.closeOnClickOutside === false) {
      return;
    }

    if (!component.isOpen() || !target) {
      return;
    }
    if (!target.closest('.date-picker-single-wrap')) {
      component.hide();
    }
  }

  private isDisabled(): boolean {
    return this.control.control.disabled;
  }

}
