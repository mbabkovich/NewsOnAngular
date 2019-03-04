import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { ViewNewsArticleComponent } from './view-news-article/view-news-article.component';
import { EditNewsArticleComponent } from './edit-news-article/edit-news-article.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  { path: 'news', component: NewsComponent },
  { path: 'news/:counter', component: ViewNewsArticleComponent },
  { path: 'add-news-article', component: EditNewsArticleComponent, data: {addArticle: true} },
  { path: 'news/:counter/edit', component: EditNewsArticleComponent, data: {addArticle: false} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
