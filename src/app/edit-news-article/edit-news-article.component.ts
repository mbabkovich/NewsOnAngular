import { Component, OnInit } from '@angular/core';
import { ExpressNewsService } from '../services/express-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle } from '../models/newsArticle';
import { NewsArticlesCacheService } from '../services/news-articles-cache.service';
import { AppServiceService } from '../services/app-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-news-article',
  templateUrl: './edit-news-article.component.html',
  styleUrls: ['./edit-news-article.component.css']
})
export class EditNewsArticleComponent implements OnInit {
  private newsArticle: NewsArticle;
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private expressNewsService: ExpressNewsService,
    private newsArticlesCacheService: NewsArticlesCacheService,
    private appServiceService: AppServiceService,
    private location: Location) { }

  title: string;
  description: string;
  content: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  url: string;

  ngOnInit() {
    this.getNewsArticle();
  }

  private getNewsArticle() {
    const newsArticleNumber = this.route.snapshot.paramMap.get('n');
    if (newsArticleNumber) {
      this.newsArticle = this.newsArticlesCacheService.getNewsArticle(+newsArticleNumber);
      this.appServiceService.changePageName('Edit Article');
    } else {
      this.newsArticle = new NewsArticle();
      this.appServiceService.changePageName('Add Article');
    }
  }

  save() {
    this.applyChanges();
    if (this.newsArticle.id) {
      this.expressNewsService.updateNewsArticle(this.newsArticle).subscribe(newsArticle => {
        this.router.navigate(["news"]);
      });
    }
    else {
      this.expressNewsService.addNewsArticle(this.newsArticle).subscribe(id => {
        this.newsArticle.id = id;
        this.newsArticlesCacheService.addNewsArticles([ this.newsArticle ], true);
        this.router.navigate(["news"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }

  private applyChanges() {
    this.newsArticle.title = this.title;
    this.newsArticle.description = this.description;
    this.newsArticle.content = this.content;
    this.newsArticle.urlToImage = this.urlToImage
    this.newsArticle.publishedAt = this.publishedAt;
    this.newsArticle.author = this.author;
    this.newsArticle.url = this.url;
  }
}
