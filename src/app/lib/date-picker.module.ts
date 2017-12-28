import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerService } from './service/date-picker.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
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
