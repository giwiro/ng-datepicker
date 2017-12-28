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
      months: [],
    });
  }
}
