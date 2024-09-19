import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})


export class CurrencyFormat implements PipeTransform {

  transform(value: number | null): string {

      if (value === null) {
        return ''; // Provide a fallback value or handle null case as needed
      }
      return '₹' + value.toString();
  }



}
