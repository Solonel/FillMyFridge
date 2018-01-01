import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from '../classes/book'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class BookService {

  private booksUrl = 'api/books';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
      tap(books => this.log(`fetched Books`)),
      catchError(this.handleError('getBooks', []))
      );
  }

  /** GET Book by id. Return `undefined` when id not found */
  getBookNo404<Data>(id: number): Observable<Book> {
    const url = `${this.booksUrl}/?id=${id}`;
    return this.http.get<Book[]>(url)
      .pipe(
      map(books => books[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Book id=${id}`);
      }),
      catchError(this.handleError<Book>(`getBook id=${id}`))
      );
  }

  /** GET Book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched Book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Book to the server */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      tap((book: Book) => this.log(`added Book w/ id=${book.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete the Book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  /** PUT: update the Book on the server */
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.log(`updated Book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    console.log('BookService: ' + message);
  }
}
