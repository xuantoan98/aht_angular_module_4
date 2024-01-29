import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Observable, Subject, filter, of, pluck, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-article-detail-edit',
  templateUrl: './article-detail-edit.component.html',
  styleUrl: './article-detail-edit.component.css'
})
export class ArticleDetailEditComponent implements OnInit {
  form$: Observable<FormGroup>;
  private initialFormValue: unknown;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form$ = this.route.params.pipe(
      pluck('slug'),
      switchMap(slug => this.articleService.getArticle(slug)),
      filter(article => !!article),
      switchMap(article => of(this.initForm(article)))
    );

  }

  private initForm(article: IArticle): FormGroup {
    const form = this.fb.group({
      title: [article.title],
      body: [article.body]
    });
    this.initialFormValue = form.getRawValue();
    return form;
  }
}
