import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})

export class SearchFilterPipe implements PipeTransform {
  transform<T extends object>(values: T[], filterString: string, key?: keyof T | string | null ): T[] {
    if (!values || !filterString || !key) {
      return values;
    }
    const lowerCaseString = filterString.toLowerCase();

    return values.filter(item => {
      let value = (item as any)[key];
      return value.toLowerCase().startsWith(lowerCaseString);
    });
  }
}
