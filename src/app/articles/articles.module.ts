import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(articlesRoutes)
  ]
})
export class ArticlesModule { }
