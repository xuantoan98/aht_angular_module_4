import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { articlesGuard } from '../guards/articles.guard';

export const articlesRoutes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    canActivate: [articlesGuard],
  },
  { path: ':slug', component: ArticleDetailComponent },
];
