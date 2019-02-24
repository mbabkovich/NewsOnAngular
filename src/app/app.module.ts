import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { EditNewsArticleComponent } from './edit-news-article/edit-news-article.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsArticleComponent,
    EditNewsArticleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
