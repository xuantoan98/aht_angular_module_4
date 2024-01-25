import { Component, OnInit } from '@angular/core';
import { Observable, filter, pluck, switchMap } from 'rxjs';
import { IArticle } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<IArticle>;

  constructor(private readonly route: ActivatedRoute, private readonly articleService: ArticleService) {}

  ngOnInit(): void {
    this.article$ = this.route.params.pipe(
      pluck('slug'),
      switchMap(slug => this.articleService.getArticle(slug)),
      filter(article => !! article)
    );
  }
  
}
