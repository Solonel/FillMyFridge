import { Injectable } from '@angular/core';
import { Language, LanguageLight } from '../classes/language';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class LanguageService {

  private languagesUrl = 'api/languages';  // URL to web api

  constructor(private http: HttpClient) { }


  // Retourne un observable tableau de languages complexes (objet tel que sur la DB)
  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languagesUrl)
      .pipe(
      tap(language => this.log(`fetched languages`)),
      catchError(this.handleError('getLanguages', []))
      );
  }

  // Retourne un tableau de languages simples (objet sans la notion de locale)
  getLanguagesLight(callback): LanguageLight[] {
    let languagesLight: LanguageLight[] = new Array<LanguageLight>();
    let languageLight: LanguageLight;
    this.getLanguages().subscribe(languages => {
      languages.forEach(element => {
        languageLight = {
          id: element.id,
          label: element.locale[this.getDefaultLanguageId()].label,
          flag: element.flag
        };
        languagesLight.push(languageLight);
      });
      callback(languagesLight);
    });
    return languagesLight;
  }

  // Retourne l'ID de la langue par défaut (fr-fr dans un premier temps)
  getDefaultLanguageId(): string {
    let defaultLanguage = 'fr-fr';
    return defaultLanguage;
  }

  // DOIT retourner un objet langue complexe de la langue par défaut (fr-fr dans un premier temps)
  getDefaultLanguage(): string {
    let defaultLanguage = 'fr-fr';
    return defaultLanguage;
  }

  //
  getImplementedLanguages(locales): Observable<LanguageLight[]> {
    let implementedLanguages = [];
    this.getLanguagesLight(function (locales) {
      return function (languages) {
        languages.forEach(language => {
          if (locales.find(function (element) {
            return element === language.id;
          })) {
            implementedLanguages.push(language);
          }
        });
      }
    }(locales));
    return of(implementedLanguages);
  }

  getNotImplementedLanguages(locales): Observable<LanguageLight[]> {
    let notImplementedLanguages = [];
    this.getLanguagesLight(function (locales) {
      return function (languages) {
        languages.forEach(language => {
          if (!locales.find(function (element) {
            return element === language.id;
          })) {
            notImplementedLanguages.push(language);
          }
        });
      }
    }(locales));
    return of(notImplementedLanguages);
  }

  /** GET Language by id. Return `undefined` when id not found */
  getLanguageNo404<Data>(id: number): Observable<Language> {
    const url = `${this.languagesUrl}/?id=${id}`;
    return this.http.get<Language[]>(url)
      .pipe(
      map(languages => languages[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(outcome);
      }),
      catchError(this.handleError<Language>(`getLanguage id=${id}`))
      );
  }

  /** GET Language by id. Will 404 if id not found */
  getLanguage(id: string): Observable<Language> {
    const url = `${this.languagesUrl}/${id}`;
    return this.http.get<Language>(url).pipe(
      tap(_ => this.log(`fetched Language id=${id}`)),
      catchError(this.handleError<Language>(`getLanguage id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Language to the server */
  addLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.languagesUrl, language, httpOptions).pipe(
      tap((language: Language) => this.log(`added Language w/ id=${language.id}`)),
      catchError(this.handleError<Language>('addLanguage'))
    );
  }

  /** DELETE: delete the Language from the server */
  deleteLanguage(language: Language | string): Observable<Language> {
    const id = typeof language === 'string' ? language : language.id;
    const url = `${this.languagesUrl}/${id}`;

    return this.http.delete<Language>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Language id=${id}`)),
      catchError(this.handleError<Language>('deleteLanguage'))
    );
  }

  /** PUT: update the Language on the server */
  updateLanguage(language: Language): Observable<any> {
    return this.http.put(this.languagesUrl, language, httpOptions).pipe(
      tap(_ => this.log(`updated Language id=${language.id}`)),
      catchError(this.handleError<any>('updateLanguage'))
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
