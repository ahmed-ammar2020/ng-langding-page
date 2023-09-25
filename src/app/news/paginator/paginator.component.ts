import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() numberOfPages: number;
  @Output() pageChanged = new EventEmitter();
  currentPage = 1;
  PageOptions: number[];

  constructor(private newsService: NewsService) {}

  ngOnChanges() {
    this.PageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter((num) => num >= 1 && num <= this.numberOfPages);
  }

  ChangePage(pageNum: number) {
    this.currentPage = pageNum;
    this.PageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter((num) => num >= 1 && num <= this.numberOfPages);
    this.pageChanged.emit(pageNum);
  }
}
