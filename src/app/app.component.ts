import { Component } from '@angular/core';
import { DatePickerService } from './lib/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private datePickerService: DatePickerService) {
    this.datePickerService.setLabels({
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    });
  }
}
