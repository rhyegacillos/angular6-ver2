import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, property: string): any {
    return value.sort((a, b) => a[property].localeCompare(b[property]));
  }

}
