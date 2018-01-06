import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DatePickerService,
  DatePickerSingleComponent,
  RangedCalendarComponent,
} from './lib/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  public disableDatesBefore = new Date();
  public disableDatesAfter = new Date();
  public firstForm: FormGroup;
  public secondForm: FormGroup;
  public rangedForm: FormGroup;
  @ViewChild('datePickerSingleChild') datePickerSingleChild: DatePickerSingleComponent;
  @ViewChild('rangedCalendarChild') rangedCalendarChild: RangedCalendarComponent;
  @ViewChild('rangedCalendarChild2') rangedCalendarChild2: RangedCalendarComponent;

  constructor(private datePickerService:      DatePickerService,
              private formBuilder:            FormBuilder) {
    this.datePickerService.setLabels({
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    });
    this.firstForm = this.formBuilder.group({
      date: [new Date()]
    });
    this.secondForm = this.formBuilder.group({
      date: ['03/01/2018'],
      date2: ['14/01/2018']
    });

    this.rangedForm = this.formBuilder.group({
      dateLeft: ['03/01/2018'],
      dateRight: ['09/01/2018'],
    });
    setTimeout(() =>
      this.firstForm.get('date').setValue(new Date(2017, 11, 30)));
  }

}
