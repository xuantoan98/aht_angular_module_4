import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { canActiveArticle, canActivateChildArticle, canMatchArticle } from '../guards/articles.guard';
import { ArticleDetailEditComponent } from './article-detail-edit/article-detail-edit.component';

export const articlesRoutes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    // canActivate: [canActiveArticle],
    canMatch: [canMatchArticle]
  },
  { 
    path: ':slug',
    canActivateChild: [canActivateChildArticle],
    children: [
      { path: '', component: ArticleDetailComponent },
      { path: 'edit', component: ArticleDetailEditComponent }
    ]
  },
];
