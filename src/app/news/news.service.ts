import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Article } from './article';

interface NewsResponse {
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseURL = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apikey = 'fd351327c4f14685b4d0078ada2399df';
  private country = 'us';

  pagesIn: Subject<number>;
  pagesOut: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();
    // hot and multicast
    this.pagesIn = new Subject();
    // cold and unicast
    this.pagesOut = this.pagesIn.pipe(
      map((page) => {
        return new HttpParams()
          .set('page', page)
          .set('pageSize', this.pageSize)
          .set('country', this.country)
          .set('apiKey', this.apikey);
      }),
      switchMap((params) => {
        return this.http.get<NewsResponse>(this.baseURL, { params });
      }),
      tap(({ totalResults }) => {
        this.numberOfPages.next(Math.ceil(totalResults / this.pageSize));
      }),
      map((res) => res.articles)
    );
  }

  getPage(pageNum: number) {
    this.pagesIn.next(pageNum);
  }
}
