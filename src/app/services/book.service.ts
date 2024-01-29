import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiBooks = 'http://localhost:3000/books';

  constructor(private readonly http: HttpClient) { }

  public getBooks(): Observable<IBook[]> {
    try {
      return this.http.get<IBook[]>(this.apiBooks)
    } catch (error) {
      console.error("Error when fetch book data", error);
      return of();
    }
  }

  public getBook(id: string): Observable<IBook> {
    try {
      const url = `${this.apiBooks}/${id}`;
      return this.http.get<IBook>(url);
    } catch (error) {
      console.error("Error when fetch book data", error);
      return of();
    }
  }
}
