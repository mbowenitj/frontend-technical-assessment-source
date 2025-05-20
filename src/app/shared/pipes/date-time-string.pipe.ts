import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateTimeString',
  standalone: true
})
export class DateTimeStringPipe implements PipeTransform {
  transform(value: string | number): string {
    const timestamp = typeof value === 'string' ? parseInt(value, 10) : value;
    const date = new Date(timestamp * 1000);

    return format(date, 'dd.MM.yyyy HH:mm');
  }
}
