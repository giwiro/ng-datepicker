import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePickerService } from './lib/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  public disableDatesBefore = new Date();
  public disableDatesAfter = new Date();
  public firstForm: FormGroup;

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
    setTimeout(() =>
      this.firstForm.get('date').setValue(new Date(2017, 11, 30)));
  }
}
