import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zero'
})
export class ZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==0)
      return "N/A";
    else
      return value;
  }

}
