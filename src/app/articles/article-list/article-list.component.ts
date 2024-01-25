import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit{
  articles$: Observable<IArticle[]>;

  constructor(private readonly articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.articles$;
  }
}
