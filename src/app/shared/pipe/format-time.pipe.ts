import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [value];
    if (value.length > 1) { // If value format correct
      value = value.slice(1);  // Remove full string match value
      value[5] = +value[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      value[0] = +value[0] % 12 || 12; // Adjust hours
      if(value[0].toString().length == 1){ // Adjust 0, if single digit
        value[0] = '0' + value[0];
      }
    }
    return value.join('');
  }

}
