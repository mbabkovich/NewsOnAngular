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
  private addArticle: boolean;
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
  imageSource: string;
  newsDate: Date;
  author: string;
  sourceUrl: string;

  ngOnInit() {
    this.getNewsArticle();
  }

  private getNewsArticle() {
    const id = +this.route.snapshot.paramMap.get('n');
    if (id) {
      this.newsArticle = this.newsArticlesCacheService.getNewsArticle(id);
      this.appServiceService.changePageName('Edit Article');
    } else {
      this.newsArticle = new NewsArticle();
      this.appServiceService.changePageName('Add Article');
    }
  }

  save() {
    if (this.newsArticle.id) {
      this.expressNewsService.updateNewsArticle(this.newsArticle).subscribe(newsArticle => {
        this.router.navigate(["news"]);
      });
    }
    else {
      this.expressNewsService.addNewsArticle(this.newsArticle).subscribe(newsArticle => {
        this.newsArticlesCacheService.addNewsArticles([ newsArticle ], true);
        this.router.navigate(["news"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
