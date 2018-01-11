import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

  constructor() { }


  getDefaultLanguage(): string {
    let defaultLanguage = 'fr-fr';
    return defaultLanguage;
  }
}
