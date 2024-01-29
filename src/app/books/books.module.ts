import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { booksRoutes } from './books.routes';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(booksRoutes)
  ]
})
export class BooksModule { }
