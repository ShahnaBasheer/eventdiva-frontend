import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceChar',
  standalone: true
})


export class ReplaceCharacterPipe implements PipeTransform {
  transform(value: string, char: string): string {
    const regex = new RegExp(char, 'g');
    return value.replace(regex, ' ');
  }
}
