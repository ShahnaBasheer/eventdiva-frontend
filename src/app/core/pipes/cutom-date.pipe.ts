import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})


export class CustomDatePipe  implements PipeTransform {

  private daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  transform(value: string | Date, property: string): string {
    if (!value) return '';

    const date = new Date(value);

    switch (property) {
      case 'date':
        return date.getDate().toString();
      case 'day':
        return this.daysOfWeek[date.getDay()];
      case 'month':
        return this.monthsOfYear[date.getMonth()];
      case 'year':
        return date.getFullYear().toString();
      default:
        return '';
    }

    return '';
  }
}
