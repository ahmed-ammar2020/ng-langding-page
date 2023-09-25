import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { Article } from '../article';

@Component({
  selector: 'app-news-articles',
  templateUrl: './news-articles.component.html',
  styleUrls: ['./news-articles.component.css'],
})
export class NewsArticlesComponent {
  page = 1;
  articles: Article[];
  numberOfPages: number;
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.pagesOut.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsService.numberOfPages.subscribe((numberOfPages) => {
      this.numberOfPages = numberOfPages;
    });

    this.newsService.getPage(1);
  }

  changePage(pageNum: number) {
    this.newsService.getPage(pageNum);
  }
}
