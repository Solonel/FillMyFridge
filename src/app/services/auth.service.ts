import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {


  isAuthenticated = false;
  private authUrl = 'api/users';

  constructor(private http: HttpClient) { }

  login(data): Boolean {
    let users = this.http.get<User[]>(this.authUrl)
      .pipe(
      tap(users => {
        users.forEach(user => {
          console.log("a");
          if (user.email === data.email && user.password === data.password) {
            this.isAuthenticated = true;
            console.log("isAuthenticated !!");
          }
        });
      }),
      catchError(this.handleError('user', []))
      );
    return this.isAuthenticated;
  }

  logOut() {
    if (this.isAuthenticated === true) {
      this.isAuthenticated = false;
    }
  }

  userIsLoggedIn() {
    return this.isAuthenticated;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.authUrl, user, httpOptions).pipe(
      tap((user: User) => {
        this.log(`added user w/ id=${user.id}`)
        console.log(user);
      }),
      catchError(this.handleError<User>('addAuthor'))
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
    console.log('AuthentificationService: ' + message);
  }
}
