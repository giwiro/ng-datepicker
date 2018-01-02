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
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerSingleComponent } from '../../components/date-picker-single/date-picker-single.component';
import { DatePickerSingleDirectiveOptions } from './date-picker-single-options';
import { ChangeMonthResponse } from '../../components/abstract-calendar/abstract-calendar.component';
import { ChangeChosenDayResponse } from '../../components/single-calendar/single-calendar.component';
import { FormatterFromDateFunction, FormatterToDateFunction } from '../../service/date-picker.service';

@Directive({
  // tslint:disable-next-line
  selector: '[datePickerSingle]',
})
export class DatePickerSingleDirective implements OnInit, OnDestroy {
  @Input() options = {} as DatePickerSingleDirectiveOptions;
  @Output() changeMonth = new EventEmitter<ChangeMonthResponse>();
  @Output() changeChosenDay = new EventEmitter<ChangeChosenDayResponse>();
  @Input() formatterToDate: string | FormatterToDateFunction;
  @Input() formatterFromDate: string | FormatterFromDateFunction;
  private componentRef: ComponentRef<DatePickerSingleComponent>;
  private onChangeChosenDaySubscription: Subscription;
  private onChangeMonthSubscription: Subscription;
  private el: HTMLInputElement;

  constructor(private control:              NgControl,
              public  viewContainerRef:     ViewContainerRef,
              private resolver:             ComponentFactoryResolver) {
    this.el = this.viewContainerRef.element.nativeElement as HTMLInputElement;
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(DatePickerSingleComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    const component = this.componentRef.instance;
    component.bindFormControl = this.control.control as FormControl;
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

  private isDisabled(): boolean {
    return this.control.control.disabled;
  }

}
