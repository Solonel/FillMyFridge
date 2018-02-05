import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ShoppingList } from '../classes/shopping-list'
import { Recipe } from "../classes/recipe";
import { RecipeService } from "./recipe.service";

import { forEach } from '@angular/router/src/utils/collection';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ShoppingListService {

  private shoppingListUrl = 'api/shoppinglist';  // URL to web api

  // Liste des recettes de l'application
  recipes: Recipe[];

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }


  getList(id): Observable<ShoppingList> {
    const url = `${this.shoppingListUrl}/${id}`;
    return this.http.get<ShoppingList>(url).pipe(
      tap(_ => this.log(`fetched ShoppingList id=${id}`)),
      catchError(this.handleError<ShoppingList>(`getList id=${id}`))
    );
  };

  getLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.shoppingListUrl)
      .pipe(
      tap(shoppingLists => this.log(`fetched Shopping List`)),
      catchError(this.handleError('getLists', []))
      );
  };

  generateList(values) {
    let listsRecipe;
    // On récupère les recettes de l'application.
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      values.configs.forEach(config => {
        config.recipes = [];

        for (let i = 0; i < config.nbMeal; i++) {
          let recipeId = Math.floor(Math.random() * this.recipes.length);
          config.recipes.push(this.recipes[recipeId]);
          this.recipes.splice(recipeId, 1);
        }
        console.log("config", config);
        console.log("recipes ", recipes);

      });
    }, error => {
      console.log("Generate List Error", error);
    })
  };



  //////// Save methods //////////

  /** POST: add a new Recipe to the server */
  addShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, httpOptions).pipe(
      tap((shoppingList: ShoppingList) => this.log(`added recipe w/ id=${shoppingList.id}`)),
      catchError(this.handleError<ShoppingList>('addShoppingList'))
    );
  }

  /** DELETE: delete the Recipe from the server */
  deleteShoppingList(shoppingList: ShoppingList | number): Observable<ShoppingList> {
    const id = typeof shoppingList === 'number' ? shoppingList : shoppingList.id;
    const url = `${this.shoppingListUrl}/${id}`;

    return this.http.delete<ShoppingList>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted shoppingList id=${id}`)),
      catchError(this.handleError<ShoppingList>('deleteShoppingList'))
    );
  }

  /** PUT: update the Recipe on the server */
  updateShoppingList(shoppingList: ShoppingList): Observable<any> {
    return this.http.put(this.shoppingListUrl, shoppingList, httpOptions).pipe(
      tap(_ => this.log(`updated ShoppingList id=${shoppingList.id}`)),
      catchError(this.handleError<any>('updateShoppingList'))
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
