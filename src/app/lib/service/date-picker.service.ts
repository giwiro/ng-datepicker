import { Injectable } from '@angular/core';

export interface DatePickerLabels {
  months: string[];
  days: string[];
}

const DEFAULT_MONTHS_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const DEFAULT_DAYS_LABEL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

@Injectable()
export class DatePickerService {
  private monthLabels: string[];
  private daysLabels: string[];

  constructor() {
    // Set defaults
    this.monthLabels = DEFAULT_MONTHS_LABEL;
    this.daysLabels = DEFAULT_DAYS_LABEL;
  }

  public setLabels(l: Partial<DatePickerLabels>): void {
    if (l.months) {
      if (!(l.months instanceof Array)) {
        return console.error(new Error('months must be an array'));
      }
      if (l.months.length !== 12) {
        return console.error(new Error('months array\'s length must be 12'));
      }
      this.monthLabels = [...l.months];
    }

    if (l.days) {
      if (!(l.days instanceof Array)) {
        return console.error(new Error('days must be an array'));
      }
      if (l.days.length !== 7) {
        return console.error(new Error('days array\'s length must be 7'));
      }
      this.daysLabels = [...l.days];
    }
  }

  get labels(): DatePickerLabels {
    return {
      months: this.monthLabels,
      days: this.daysLabels,
    };
  }
}
