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
    private location: Location) {
     }

  editNewsArticle: NewsArticle

  ngOnInit() {
    this.initializeArticle();
  }

  private initializeArticle() {
    const newsArticleNumber = this.route.snapshot.paramMap.get('counter');
    this.editNewsArticle = new NewsArticle();
    if (newsArticleNumber) {
      this.newsArticle = this.newsArticlesCacheService.getNewsArticle(+newsArticleNumber);
      Object.assign(this.editNewsArticle, this.newsArticle);
      this.appServiceService.changePageName('Edit Article');
    } else {
      this.newsArticle = new NewsArticle();
      this.appServiceService.changePageName('Add Article');
    }
  }

  save() {
    Object.assign(this.newsArticle, this.editNewsArticle);
    if (this.newsArticle.id) {
      this.expressNewsService.updateNewsArticle(this.newsArticle).subscribe(newsArticle => {
        this.router.navigate(["news"]);
      });
    }
    else {
      this.expressNewsService.addNewsArticle(this.newsArticle).subscribe(id => {
        this.newsArticle.id = id;
        this.newsArticlesCacheService.clearNewsArticles();
        this.newsArticlesCacheService.addNewsArticles([ this.newsArticle ]);
        this.router.navigate(["news"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
