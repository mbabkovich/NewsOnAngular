import { Injectable } from '@angular/core';
import { NewsArticle } from '../models/newsArticle';
import { NewsSource } from '../models/newsSource';

@Injectable({
  providedIn: 'root'
})
export class NewsArticlesCacheService {
  private newsArticles: NewsArticle[];
  private newsCounter: number;
  constructor() {
    this.newsArticles = [];
    this.newsCounter = 0;
   }

  newsSources: NewsSource[];
  selectedSource: NewsSource;
  searchText: string;

  getNewsArticles(): NewsArticle[] {
    return this.newsArticles;
  }

  addNewsArticles(newsArticles: NewsArticle[], replace: boolean) {
    if (replace) {
      this.newsCounter = 0;
      this.newsArticles = newsArticles;
    } else {
      this.newsArticles = this.newsArticles.concat(newsArticles);
    }

    for (let i = this.newsCounter; i < this.newsCounter + newsArticles.length; i++) {
      this.newsArticles[i].id = i;
    }

    this.newsCounter += newsArticles.length;
  }

  getNewsArticle(id: number) {
    return this.newsArticles[id];
  }

  clear(): void {
    this.newsArticles = [];
  }
}
