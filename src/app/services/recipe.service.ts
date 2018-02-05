import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from '../classes/recipe'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RecipeService {

  private recipesUrl = 'api/recipes';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Recipes from the server */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
      tap(recipes => this.log(`fetched Recipes`)),
      catchError(this.handleError('getRecipes', []))
      );
  }

  /** GET Recipes from the server */
  getRecipesByCat(categoryId): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
      tap(recipes => {
        let keepedRecipe: Recipe[] = [];
        recipes.forEach(recipe => {

          let keepRecipe: boolean = false;
          recipe.categories.forEach(recipeCategory => {
            if (!keepRecipe) {
              if (recipeCategory.id == categoryId) {
                keepRecipe = true;
                keepedRecipe.push(recipe);
              }
            }
          });
        })
        recipes = keepedRecipe;
      }),
      catchError(this.handleError('getRecipes', []))
      );
  }


  /** GET Recipe by id. Return `undefined` when id not found */
  getRecipeNo404<Data>(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/?id=${id}`;
    return this.http.get<Recipe[]>(url)
      .pipe(
      map(recipes => recipes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //  this.log(`${outcome} Recipe id=${id}`);
        this.log(outcome);
      }),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
      );
  }

  /** GET Recipe by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched Recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Recipe to the server */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, httpOptions).pipe(
      tap((recipe: Recipe) => this.log(`added recipe w/ id=${recipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the Recipe from the server */
  deleteRecipe(recipe: Recipe | number): Observable<Recipe> {
    const id = typeof recipe === 'number' ? recipe : recipe.id;
    const url = `${this.recipesUrl}/${id}`;

    return this.http.delete<Recipe>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /** PUT: update the Recipe on the server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, httpOptions).pipe(
      tap(_ => this.log(`updated Recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('Recipe'))
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

  /** Log a RecipeService message with the MessageService */
  private log(message: string) {
    console.log('RecipeService: ' + message);
  }

}


