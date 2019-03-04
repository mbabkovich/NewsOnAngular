import { Component, OnInit } from '@angular/core';
import { NewsArticlesCacheService } from '../services/news-articles-cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle } from '../models/newsArticle';
import { AppServiceService } from '../services/app-service.service';
import { ExpressNewsService } from '../services/express-news.service';

@Component({
  selector: 'app-view-news-article',
  templateUrl: './view-news-article.component.html',
  styleUrls: ['./view-news-article.component.css']
})
export class ViewNewsArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expressNewsService: ExpressNewsService,
    private newsArticlesCacheService: NewsArticlesCacheService,
    private appServiceService: AppServiceService) { }

  newsArticle: NewsArticle;

  ngOnInit() {
    this.getNewsArticle();
  }

  onClickDelete() {
    this.expressNewsService.deleteNewsArticle(this.newsArticle).subscribe(
      () => {
        this.newsArticlesCacheService.deleteNewsArticle(this.newsArticle.counter);
        this.router.navigate(["news"]);
      }
    );
  }

  private getNewsArticle() {
    const id = +this.route.snapshot.paramMap.get('counter');
    this.newsArticle = this.newsArticlesCacheService.getNewsArticle(id);
    this.appServiceService.changePageName(this.newsArticle.title);
  }
}
