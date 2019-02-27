import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { NewsArticle } from '../models/newsArticle';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NewsSource } from '../models/newsSource';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'cf033c57da2e4126b52df66a8cdd2f89';
  private apiKeyParam = `apiKey=${this.apiKey}`;
  private newsUrl = `${Constants.NewsUrl}/everything?${this.apiKeyParam}`;
  private newsSourcesUrl = `${Constants.NewsUrl}/sources?${this.apiKeyParam}`;

  constructor(private http: HttpClient) {
  }

  getNewsArticles(source, pageSize, page, searchText): Observable<NewsArticle[]> {
    let newsUrl = `${this.newsUrl}&sources=${source}&page=${page}&pageSize=${pageSize}`;
    if (searchText) {
      newsUrl += `&q=${searchText}`;
    }
    return this.http.get<any>(newsUrl)
      .pipe(
        map(data => data.articles),
        catchError(this.handleError('getNewsArticles', []))
      );
  }

  getNewsSources(): Observable<NewsSource[]> {
    return this.http.get<any>(this.newsSourcesUrl)
      .pipe(
        map(data => data.sources),
        catchError(this.handleError('getNewsSources', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
