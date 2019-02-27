import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { EditNewsArticleComponent } from './edit-news-article/edit-news-article.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ViewNewsArticleComponent } from './view-news-article/view-news-article.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsArticleComponent,
    EditNewsArticleComponent,
    ViewNewsArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
