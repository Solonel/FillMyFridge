import { Injectable } from '@angular/core';
import { Language } from '../classes/language';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class LanguageService {

  private languagesUrl = 'api/languages';  // URL to web api

  constructor(private http: HttpClient) { }


  getDefaultLanguage(): string {
    let defaultLanguage = 'fr-fr';
    return defaultLanguage;
  }

  getDefaultLanguages(): Array<Object> {
    let languages = [];
    languages = [
      { id: 'en-en', label: 'Anglais', flag: 'icon du drapeau EN' },
      { id: 'fr-fr', label: 'Français', flag: 'icon du drapeau FR' }
    ]

    return languages
    // TODO - On filtre les traductions par la langue par défault
    // On créé un tableau simple 
    // Exemple avec la langue fr-fr en default : { id : 'en-en' , label : 'Anglais', flag : 'icon du drapeau'}
  }

  getIngredients(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languagesUrl)
      .pipe(
      tap(language => {
        this.log(`fetched Languages`)
        this.getDefaultLanguages();
        // TODO - Comment faire pour filter par la langue par default
      }
      ),
      catchError(this.handleError('getLanguages', []))
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

  /** Log a LanguageService message with the MessageService */
  private log(message: string) {
    console.log('LanguageService: ' + message);
  }

}
