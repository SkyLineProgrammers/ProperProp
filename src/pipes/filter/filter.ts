import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  
  transform(items: any[], filter: any): any {
    // 
    if (!items || !filter) {
      return items;
  }
  
  // if Category to be shown
  // let a = items.filter(item => item.CategoryName == filter);

  // if product to be shown
  let a = items.filter(item => item.Category == filter);
  return a;
  
  }
}
