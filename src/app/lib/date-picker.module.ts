import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerService } from './service/date-picker.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PadDayNumberPipe } from './pipes/pad-day-number/pad-day-number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DatePickerService,
  ],
  declarations: [CalendarComponent, PadDayNumberPipe],
  exports: [CalendarComponent]
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
