import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerSingleComponent } from '../../components/date-picker-single/date-picker-single.component';
import { DatePickerSingleOptions } from '../../components/date-picker-single/date-picker-single-options';

@Directive({
  // tslint:disable-next-line
  selector: '[datePickerSingle]',
})
export class DatePickerSingleDirective implements OnInit, OnDestroy {
  @Input() options = {} as DatePickerSingleOptions;
  private componentRef: ComponentRef<DatePickerSingleComponent>;
  private onChangeChosenDaySubscription: Subscription;
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

    this.onChangeChosenDaySubscription = component.changeChosenDay.subscribe(val => {
      // Explicit false
      if (this.options.closeOnChangeDay === false) {
        return;
      }
      component.hide();
    });
  }

  ngOnDestroy() {
    if (this.onChangeChosenDaySubscription) {
      this.onChangeChosenDaySubscription.unsubscribe();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
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
