import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../classes/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private userUrl = 'api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
      tap(users => this.log(`fetched Users`)),
      catchError(this.handleError('getUsers', []))
      );
  }

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
      map(users => users[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} User id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET author by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new author to the server */
  addUser(author: User): Observable<User> {
    return this.http.post<User>(this.userUrl, author, httpOptions).pipe(
      tap((author: User) => this.log(`added User w/ id=${author.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the author from the server */
  deleteUser(author: User | number): Observable<User> {
    const id = typeof author === 'number' ? author : author.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the Author on the server */
  updateUser(author: User): Observable<any> {
    return this.http.put(this.userUrl, author, httpOptions).pipe(
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
    console.log('UserService: ' + message);
  }
}
