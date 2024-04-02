import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDateFormatPipe',
  standalone: true
})
export class CustomDateFormatPipePipe implements PipeTransform {


  transform(dateString: string): string {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[monthIndex];
    return `${monthName} ${year}`;
  }

}
