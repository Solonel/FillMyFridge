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
      map(Units => Units[0]), // returns a {0|1} element array
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
  addUnit(Unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.unitsUrl, Unit, httpOptions).pipe(
      tap((Unit: Unit) => this.log(`added Unit w/ id=${Unit.id}`)),
      catchError(this.handleError<Unit>('addUnit'))
    );
  }

  /** DELETE: delete the Unit from the server */
  deleteUnit(Unit: Unit | number): Observable<Unit> {
    const id = typeof Unit === 'number' ? Unit : Unit.id;
    const url = `${this.unitsUrl}/${id}`;

    return this.http.delete<Unit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Unit id=${id}`)),
      catchError(this.handleError<Unit>('deleteUnit'))
    );
  }

  /** PUT: update the Unit on the server */
  updateUnit(Unit: Unit): Observable<any> {
    return this.http.put(this.unitsUrl, Unit, httpOptions).pipe(
      tap(_ => this.log(`updated Unit id=${Unit.id}`)),
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
