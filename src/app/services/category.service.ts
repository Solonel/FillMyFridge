import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from '../classes/category'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CategoryService {

  
  private categoriesUrl = 'api/categories';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Categories from the server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
      tap(categories => this.log(`fetched Categories`)),
      catchError(this.handleError('getCategories', []))
      );
  }

  /** GET Category by id. Return `undefined` when id not found */
  getCategoryNo404<Data>(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/?id=${id}`;
    return this.http.get<Category[]>(url)
      .pipe(
      map(categories => categories[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Category id=${id}`);
      }),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  /** GET Category by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched Category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Category to the server */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions).pipe(
      tap((category: Category) => this.log(`added Category w/ id=${category.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  /** DELETE: delete the Category from the server */
  deleteCategory(category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category :category.id;
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  /** PUT: update the Category on the server */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl,category, httpOptions).pipe(
      tap(_ => this.log(`updated Category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
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

  /** Log a CategoryService message with the MessageService */
  private log(message: string) {
    console.log('CategoryService: ' + message);
  }

}
