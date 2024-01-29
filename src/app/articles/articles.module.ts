import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routes';
import { ArticleDetailEditComponent } from './article-detail-edit/article-detail-edit.component';

@NgModule({
  declarations: [
    ArticleDetailEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(articlesRoutes)
  ]
})
export class ArticlesModule { }
