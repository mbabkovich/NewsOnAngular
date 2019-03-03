import { Component, OnInit } from '@angular/core';
import { NewsArticlesCacheService } from '../services/news-articles-cache.service';
import { ActivatedRoute } from '@angular/router';
import { NewsArticle } from '../models/newsArticle';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-view-news-article',
  templateUrl: './view-news-article.component.html',
  styleUrls: ['./view-news-article.component.css']
})
export class ViewNewsArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private newsArticlesCacheService: NewsArticlesCacheService,
              private appServiceService: AppServiceService) { }

  newsArticle: NewsArticle;

  ngOnInit() {
    this.getNewsArticle();
  }

  private getNewsArticle() {
    const id = +this.route.snapshot.paramMap.get('n');
    this.newsArticle = this.newsArticlesCacheService.getNewsArticle(id);
    this.appServiceService.changePageName(this.newsArticle.title);
  }
}
