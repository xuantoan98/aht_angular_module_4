import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, pluck, switchMap } from 'rxjs';
import { IBook } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})

export class BookDetailComponent implements OnInit {
  book$: Observable<IBook>;
  pageTitle$: string = 'Book Detail';
  
  constructor(private readonly bookService: BookService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.book$ = this.route.params.pipe(
      pluck('id'),
      switchMap((id: string) => this.bookService.getBook(id)),
      filter(book => !!book)
    );
  }
}
