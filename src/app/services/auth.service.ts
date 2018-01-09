import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';
import { UserService } from '../services/user.service'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  currentlyLoggedInUser: User = null;
  isAuthenticated = false;
  private authUrl = 'api/users';

  constructor(private http: HttpClient, private userService: UserService) { }

  login(data): Boolean {
    let users = this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.email === data.email && user.password === data.password) {
          this.isAuthenticated = true;
          this.currentlyLoggedInUser = user;
          console.log( this.currentlyLoggedInUser);
          console.log("isAuthenticated !!");
        }
      })
    });
    return this.isAuthenticated;
  }

  logOut() {
    if (this.isAuthenticated === true) {
      this.currentlyLoggedInUser = null;
      this.isAuthenticated = false;
    }
  }

  getConnectedUser(): User {
    return this.currentlyLoggedInUser;
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
      catchError(this.handleError<User>('addUser'))
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
