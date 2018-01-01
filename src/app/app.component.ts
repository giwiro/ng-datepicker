import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePickerService, DatePickerSingleComponent } from './lib/public_api';

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
  @ViewChild('datePickerSingleChild') datePickerSingleChild: DatePickerSingleComponent;

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
      date: [new Date()],
      date2: [new Date()]
    });
    setTimeout(() =>
      this.firstForm.get('date').setValue(new Date(2017, 11, 30)));
  }

}
