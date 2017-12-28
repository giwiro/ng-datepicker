import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padDayNumber'
})
export class PadDayNumberPipe implements PipeTransform {

  transform(value: number): any {
    const s = `${value}`;
    return s.length === 1 ? `0${s}` : s;
  }

}
