import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Unit } from '../classes/unit'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UnitService {

  private unitsUrl = 'api/units';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET Units from the server */
  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitsUrl)
      .pipe(
      tap(units => this.log(`fetched Units`)),
      catchError(this.handleError('getUnits', []))
      );
  }

  /** GET Unit by id. Return `undefined` when id not found */
  getUnitNo404<Data>(id: number): Observable<Unit> {
    const url = `${this.unitsUrl}/?id=${id}`;
    return this.http.get<Unit[]>(url)
      .pipe(
      map(units => units[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Unit id=${id}`);
      }),
      catchError(this.handleError<Unit>(`getUnit id=${id}`))
      );
  }

  /** GET Unit by id. Will 404 if id not found */
  getUnit(id: number): Observable<Unit> {
    const url = `${this.unitsUrl}/${id}`;
    return this.http.get<Unit>(url).pipe(
      tap(_ => this.log(`fetched Unit id=${id}`)),
      catchError(this.handleError<Unit>(`getUnit id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Unit to the server */
  addUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.unitsUrl, unit, httpOptions).pipe(
      tap((unit: Unit) => this.log(`added Unit w/ id=${unit.id}`)),
      catchError(this.handleError<Unit>('addUnit'))
    );
  }

  /** DELETE: delete the Unit from the server */
  deleteUnit(unit: Unit | number): Observable<Unit> {
    const id = typeof unit === 'number' ? unit :unit.id;
    const url = `${this.unitsUrl}/${id}`;

    return this.http.delete<Unit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Unit id=${id}`)),
      catchError(this.handleError<Unit>('deleteUnit'))
    );
  }

  /** PUT: update the Unit on the server */
  updateUnit(unit: Unit): Observable<any> {
    return this.http.put(this.unitsUrl,unit, httpOptions).pipe(
      tap(_ => this.log(`updated Unit id=${unit.id}`)),
      catchError(this.handleError<any>('updateUnit'))
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

  /** Log a UnitService message with the MessageService */
  private log(message: string) {
    console.log('UnitService: ' + message);
  }
}
