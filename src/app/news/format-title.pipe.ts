import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle',
})
export class FormatTitlePipe implements PipeTransform {
  transform(title: string, source: string): unknown {
    return title.replace(` - ${source}`, '');
  }
}
