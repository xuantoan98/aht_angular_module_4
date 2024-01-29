import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books$: Observable<IBook[]>;
  notFound: boolean = false;
  pageTitle$: string = 'List Book';

  constructor(private readonly bookService: BookService, private readonly route: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.books$ = this.bookService.getBooks();
  }
}
