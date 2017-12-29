import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerService } from './service/date-picker.service';
import { PadDayNumberPipe } from './pipes/pad-day-number/pad-day-number.pipe';
import { SingleCalendarComponent } from './components/single-calendar/single-calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DatePickerService,
  ],
  declarations: [PadDayNumberPipe, SingleCalendarComponent],
  exports: [SingleCalendarComponent]
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
