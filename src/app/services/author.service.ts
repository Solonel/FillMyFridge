import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Author } from '../classes/author'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuthorService {

  private authorsUrl = 'api/authors';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Authors from the server */
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
      tap(authors => this.log(`fetched Authors`)),
      catchError(this.handleError('getAuthors', []))
      );
  }

  /** GET Author by id. Return `undefined` when id not found */
  getAuthorNo404<Data>(id: number): Observable<Author> {
    const url = `${this.authorsUrl}/?id=${id}`;
    return this.http.get<Author[]>(url)
      .pipe(
      map(authors => authors[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Author id=${id}`);
      }),
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
      );
  }

  /** GET author by id. Will 404 if id not found */
  getAuthor(id: number): Observable<Author> {
    const url = `${this.authorsUrl}/${id}`;
    return this.http.get<Author>(url).pipe(
      tap(_ => this.log(`fetched Author id=${id}`)),
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
    );
  }

  /* GET Authors whose name contains search term */
  searchAuthors(term: string): Observable<Author[]> {
    if (!term.trim()) {
      // if not search term, return empty Author array.
      return of([]);
    }
    return this.http.get<Author[]>(`api/authors/?name=${term}`).pipe(
      tap(_ => this.log(`found authors matching "${term}"`)),
      catchError(this.handleError<Author[]>('searchAuthors', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new author to the server */
  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author, httpOptions).pipe(
      tap((author: Author) => this.log(`added author w/ id=${author.id}`)),
      catchError(this.handleError<Author>('addAuthor'))
    );
  }

  /** DELETE: delete the author from the server */
  deleteAuthor(author: Author | number): Observable<Author> {
    const id = typeof author === 'number' ? author : author.id;
    const url = `${this.authorsUrl}/${id}`;

    return this.http.delete<Author>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted author id=${id}`)),
      catchError(this.handleError<Author>('deleteAuthor'))
    );
  }

  /** PUT: update the Author on the server */
  updateAuthor(author: Author): Observable<any> {
    return this.http.put(this.authorsUrl, author, httpOptions).pipe(
      tap(_ => this.log(`updated author id=${author.id}`)),
      catchError(this.handleError<any>('updateAuthor'))
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

  /** Log a AuthorService message with the MessageService */
  private log(message: string) {
    console.log('AuthorService: ' + message);
  }
}
