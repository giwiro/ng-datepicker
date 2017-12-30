import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerService } from './service/date-picker.service';
import { PadDayNumberPipe } from './pipes/pad-day-number/pad-day-number.pipe';
import { SingleCalendarComponent } from './components/single-calendar/single-calendar.component';
import { DatePickerSingleDirective } from './directives/date-picker-single/date-picker-single.directive';
import { DatePickerSingleComponent } from './components/date-picker-single/date-picker-single.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DatePickerService,
  ],
  declarations: [PadDayNumberPipe, SingleCalendarComponent, DatePickerSingleDirective, DatePickerSingleComponent],
  entryComponents: [DatePickerSingleComponent],
  exports: [SingleCalendarComponent, DatePickerSingleDirective, DatePickerSingleComponent]
})
export class DatePickerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DatePickerModule,
      providers: [
        DatePickerService
      ]
    };
  }
}
