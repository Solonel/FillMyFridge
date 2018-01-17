import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient, IngredientLight } from '../classes/ingredient'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class IngredientService {

  private ingredientsUrl = 'api/ingredients';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Ingredients from the server */
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl)
      .pipe(
      tap(ingredients => this.log(`fetched Ingredients`)),
      catchError(this.handleError('getIngredients', []))
      );
  }

  /** GET Ingredient by id. Return `undefined` when id not found */
  getIngredientNo404<Data>(id: number): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/?id=${id}`;
    return this.http.get<Ingredient[]>(url)
      .pipe(
      map(ingredients => ingredients[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //  this.log(`${outcome} Ingredient id=${id}`);
        this.log(outcome);
      }),
      catchError(this.handleError<Ingredient>(`getIngredient id=${id}`))
      );
  }

  /** GET Ingredient by id. Will 404 if id not found */
  getIngredient(id: number): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/${id}`;
    return this.http.get<Ingredient>(url).pipe(
      tap(_ => this.log(`fetched Ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>(`getIngredient id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Ingredient to the server */
  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.ingredientsUrl, ingredient, httpOptions).pipe(
      tap((Ingredient: Ingredient) => this.log(`added Ingredient w/ id=${ingredient.id}`)),
      catchError(this.handleError<Ingredient>('addIngredient'))
    );
  }

  /** DELETE: delete the Ingredient from the server */
  deleteIngredient(ingredient: Ingredient | number): Observable<Ingredient> {
    const id = typeof ingredient === 'number' ? ingredient : ingredient.id;
    const url = `${this.ingredientsUrl}/${id}`;

    return this.http.delete<Ingredient>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>('deleteIngredient'))
    );
  }

  /** PUT: update the Ingredient on the server */
  updateIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.put(this.ingredientsUrl, ingredient, httpOptions).pipe(
      tap(_ => this.log(`updated Ingredient id=${ingredient.id}`)),
      catchError(this.handleError<any>('updateIngredient'))
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

  /** Log a IngredientService message with the MessageService */
  private log(message: string) {
    console.log('IngredientService: ' + message);
  }
}
