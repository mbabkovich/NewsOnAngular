import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/newsArticle';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpressNewsService {
  private newsUrl = `${Constants.ExpressNewsUrl}/news`;

  constructor(private http: HttpClient) { }

  getNewsArticles(page, pageSize): Observable<NewsArticle[]> {
    let newsUrl = `${this.newsUrl}/${page}/${pageSize}`;
    return this.http.get<any>(newsUrl)
      .pipe(
        catchError(this.handleError('getNewsArticles', []))
      );
  }

  getNewsArticle(newsArticle: NewsArticle): Observable<NewsArticle> {
    const newsUrl = `${this.newsUrl}/${newsArticle.id}`;
    return this.http.post<NewsArticle>(newsUrl, newsArticle)
      .pipe(
        catchError(this.handleError('addNewsArticle', newsArticle))
      );;
  }

  addNewsArticle(newsArticle: NewsArticle): Observable<NewsArticle> {
    return this.http.post<NewsArticle>(this.newsUrl, newsArticle)
      .pipe(
        catchError(this.handleError('addNewsArticle', newsArticle))
      );;
  }

  updateNewsArticle(newsArticle: NewsArticle): Observable<NewsArticle> {
    const newsUrl = `${this.newsUrl}/${newsArticle.id}`;
    return this.http.put<NewsArticle>(newsUrl, newsArticle)
      .pipe(
        catchError(this.handleError('addNewsArticle', newsArticle))
      );;
  }

  deleteNewsArticle(newsArticle: NewsArticle): Observable<NewsArticle> {
    const newsUrl = `${this.newsUrl}/${newsArticle.id}`;
    return this.http.delete<NewsArticle>(newsUrl)
      .pipe(
        catchError(this.handleError('addNewsArticle', newsArticle))
      );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
