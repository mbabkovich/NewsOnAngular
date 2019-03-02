import { Component, OnInit } from '@angular/core';
import { NewsArticle } from '../models/newsArticle';
import { NewsService } from '../services/news.service';
import { NewsSource } from '../models/newsSource';
import { NewsArticlesCacheService } from '../services/news-articles-cache.service';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private static pageSize = 10;
  private mCreatedByMe: boolean;
  private page: number;

  constructor(private newsService: NewsService,
              private newsArticlesCacheService: NewsArticlesCacheService,
              private appServiceService: AppServiceService) {
    this.page = 1;
   }

  get newsArticles(): NewsArticle[] {
    return this.newsArticlesCacheService.getNewsArticles();
  }

  get newsSources(): NewsSource[] {
    return this.newsArticlesCacheService.newsSources;
  }

  set newsSources(value: NewsSource[]) {
    this.newsArticlesCacheService.newsSources = value;
  }

  get selectedSource(): NewsSource {
    return this.newsArticlesCacheService.selectedSource;
  }

  set selectedSource(value: NewsSource) {
    if (!value) {
      return;
    }
    this.newsArticlesCacheService.selectedSource = value;
    this.appServiceService.changePageName(value.name);
    this.getNewsArticle();
  }

  get searchText(): string {
    return this.newsArticlesCacheService.searchText;
  }

  set searchText(value: string) {
    this.newsArticlesCacheService.searchText = value;
  }

  get createdByMe(): boolean {
    return this.mCreatedByMe;
  }

  set createdByMe(value: boolean) {
    this.mCreatedByMe = value;
    this.getNewsArticle();
  }

  ngOnInit() {
    if (!this.newsSources) {
      this.appServiceService.changePageName('Select Source');
      this.getNewsSources();
    }
  }

  getNewsArticle(): void {
    this.loadArticles(true);
  }

  getNewsSources(): void {
    this.newsService.getNewsSources()
      .subscribe(newsSources => this.newsSources = newsSources);
  }

  applyFilter(): void {
    this.getNewsArticle();
  }

  onClickLoadMore(): void {
    this.page++;
    this.loadArticles(false);
  }

  private loadArticles(clearExistingArticles: boolean): void {
    if (!this.newsArticlesCacheService.selectedSource) {
      return;
    }
    this.newsService.getNewsArticles(
      this.newsArticlesCacheService.selectedSource.id, NewsComponent.pageSize, this.page, this.newsArticlesCacheService.searchText)
      .subscribe(
        articles => {
          this.newsArticlesCacheService.addNewsArticles(articles, clearExistingArticles);
        });
  }
}
