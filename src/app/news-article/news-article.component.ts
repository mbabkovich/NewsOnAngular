import { Component, OnInit, Input } from '@angular/core';
import { NewsArticle } from '../models/newsArticle';
import { ExpressNewsService } from '../services/express-news.service';
import { NewsArticlesCacheService } from '../services/news-articles-cache.service';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {
  @Input() newsArticle: NewsArticle;
  constructor(
    private expressNewsService: ExpressNewsService,
    private newsArticlesCacheService: NewsArticlesCacheService) {
     }

  ngOnInit() {
  }

  onClickDelete() {
    this.expressNewsService.deleteNewsArticle(this.newsArticle).subscribe(
      () => this.newsArticlesCacheService.deleteNewsArticle(this.newsArticle.counter)
    );
  }
}
