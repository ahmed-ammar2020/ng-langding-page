import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticlesComponent } from './news-articles/news-articles.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormatTitlePipe } from './format-title.pipe';

@NgModule({
  declarations: [NewsArticlesComponent, PaginatorComponent, FormatTitlePipe],
  imports: [CommonModule],
  exports: [NewsArticlesComponent],
})
export class NewsModule {}
