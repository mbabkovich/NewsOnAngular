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
  createdByMe: boolean;

  getNewsArticles(): NewsArticle[] {
    return this.newsArticles;
  }

  addNewsArticles(newsArticles: NewsArticle[]) {
    this.newsArticles = this.newsArticles.concat(newsArticles);
    for (let i = this.newsCounter; i < this.newsCounter + newsArticles.length; i++) {
      this.newsArticles[i].counter = i;
    }

    this.newsCounter += newsArticles.length;
  }

  getNewsArticle(counter: number) {
    return this.newsArticles[counter];
  }

  deleteNewsArticle(counter: number) {
    this.newsArticles.splice(counter, 1);
    for (let i = counter; i < this.newsArticles.length; i++) {
      this.newsArticles[i].counter--;
    }
  }

  clearNewsArticles(): void {
    this.newsArticles = [];
    this.newsCounter = 0;
  }
}
