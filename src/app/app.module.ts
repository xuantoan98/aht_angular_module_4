import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticlesModule } from './articles/articles.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleListComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    ArticlesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
