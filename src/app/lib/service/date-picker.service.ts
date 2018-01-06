import { Injectable } from '@angular/core';
// Hack for typescript aot packaging
import * as momentImported from 'moment'; const moment = momentImported;

export interface DatePickerLabels {
  months: string[];
  days: string[];
}

export type FormatterToDateFunction = (input: any) => Date;
export type FormatterFromDateFunction = (d: Date) => any;

const DEFAULT_MONTHS_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const DEFAULT_DAYS_LABEL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

@Injectable()
export class DatePickerService {
  private monthLabels: string[];
  private daysLabels: string[];
  private formatterToDate: string | FormatterToDateFunction;
  private formatterFromDate: string | FormatterFromDateFunction;

  constructor() {
    // Set defaults
    this.monthLabels = DEFAULT_MONTHS_LABEL;
    this.daysLabels = DEFAULT_DAYS_LABEL;
  }

  public setFormatterToDate(f: string | FormatterToDateFunction): void {
    this.formatterToDate = f;
  }

  public setFormatterFromDate(f: string | FormatterFromDateFunction): void {
    this.formatterFromDate = f;
  }

  public formatToDate(input: any, auxFormatter?: string | FormatterToDateFunction): Date {
    const formatter = auxFormatter || this.formatterToDate;
    if (formatter instanceof Function) {
      return formatter(input);
    }else if (typeof formatter === 'string') {
      return moment(input, formatter).toDate();
    }else {
      if (!(input instanceof Date)) {
        console.error(new Error('formatToDate executed with non-Date argument. ' +
          'Please provide a formatterToDate. Returning default new Date()'));
        return new Date();
      }
      return input;
    }
  }

  public formatFromDate(d: Date, auxFormatter?: string | FormatterFromDateFunction): any {
    const formatter = auxFormatter || this.formatterFromDate;
    if (formatter instanceof Function) {
      return formatter(d);
    }else if (typeof formatter === 'string') {
      return moment(d).format(formatter);
    }else {
      return d;
    }
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
