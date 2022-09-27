import { Injectable } from '@angular/core';
import { translations } from '../data-provider/i18n/i18n-data';

export class TranslationSet {
  public languange: string;
  public values: { [key: string]: string } = {};
}

@Injectable()
export class TranslationService {
  public languages = ['en', 'ar'];

  public language = 'en';

  private dictionary: { [key: string]: TranslationSet } = translations;

  constructor() {}

  translate(value: string): string {
    //console.log('translate called with value ' + value + ' and language ' + this.language);
    if (this.dictionary[this.language] != null) {
      return this.dictionary[this.language].values[value];
    } else {
      return value;
    }
  }
}
