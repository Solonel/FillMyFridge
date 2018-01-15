import { Injectable } from '@angular/core';
import { Language, LanguageLight } from '../classes/language';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class LanguageService {

  private languagesUrl = 'api/languages';  // URL to web api

  private languages;


  constructor(private http: HttpClient) { this.languages = this.getLanguages(); }


  // Retourne un observable tableau de languages complexes (objet tel que sur la DB)
  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languagesUrl)
      .pipe(
      tap(language => this.log(`fetched languages`)),
      catchError(this.handleError('getLanguages', []))
      );
  }

  // Retourne un tableau de languages simples (objet sans la notion de locale)
  getLanguagesLight(): LanguageLight[] {
    let languagesLight = [];
    let languageLight;
    this.getLanguages().subscribe(language => {
      language.forEach(element => {
        languageLight.id = element.id;
        languageLight.label = element.locale[this.getDefaultLanguageId()].label;
        languageLight.flag = element.flag;
        languagesLight.push(languageLight);
      });
    })
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
  getImplementedLanguages(locales): LanguageLight[] {
    let implementedLanguages;
    this.getLanguagesLight().forEach(language => {
      if (locales.find(function (element) {
        return element === language.id;
      })) {
        implementedLanguages.push(language);
      }
    });
    return implementedLanguages;
  }

  getNotYetImplementedLanguages(locales): LanguageLight[] {
    let implementedLanguages;
    this.getLanguagesLight().forEach(language => {
      if (!locales.find(function (element) {
        return element === language.id;
      })) {
        implementedLanguages.push(language);
      }
    });
    return null;
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
