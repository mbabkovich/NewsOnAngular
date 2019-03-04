import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/newsArticle';
import { map, catchError } from 'rxjs/operators';
import { NewsResponse } from '../models/newsResponse';

@Injectable({
  providedIn: 'root'
})
export class ExpressNewsService {
  private newsUrl = `${Constants.ExpressNewsUrl}/news`;

  constructor(private http: HttpClient) { }

  getNewsArticles(page, pageSize): Observable<NewsArticle[]> {
    let newsUrl = `${this.newsUrl}/${page}/${pageSize}`;
    return this.http.get<NewsResponse<NewsArticle[]>>(newsUrl)
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getNewsArticles', []))
      );
  }

  getNewsArticle(id: string): Observable<NewsArticle> {
    const newsUrl = `${this.newsUrl}/${id}`;
    return this.http.get<NewsResponse<NewsArticle>>(newsUrl)
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getNewsArticle', null))
      );
  }

  addNewsArticle(newsArticle: NewsArticle): Observable<string> {
    return this.http.post<NewsResponse<string>>(this.newsUrl, newsArticle).pipe(
      map(response => response.data),
      catchError(this.handleError('addNewsArticle', null))
    );
  }

  updateNewsArticle(newsArticle: NewsArticle): Observable<void> {
    const newsUrl = `${this.newsUrl}/${newsArticle.id}`;
    return this.http.put<NewsResponse<void>>(newsUrl, newsArticle).pipe(
      map(response => response.data),
      catchError(this.handleError('updateNewsArticle', null))
    );
  }

  deleteNewsArticle(newsArticle: NewsArticle): Observable<void> {
    const newsUrl = `${this.newsUrl}/${newsArticle.id}`;
    return this.http.delete<NewsResponse<void>>(newsUrl).pipe(
      map(response => response.data),
      catchError(this.handleError('deleteNewsArticle', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
