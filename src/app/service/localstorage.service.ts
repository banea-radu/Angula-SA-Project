import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  defaultLanguage: string = 'ro';
  currentLanguage = new BehaviorSubject<string>('');

  constructor () {
    let storedLanguage!: string;
    if (localStorage.getItem('language') == null) {
      storedLanguage = this.defaultLanguage;
    } else {
      storedLanguage = localStorage.getItem('language') as string; // type assertion
    }
    this.saveLanguageInLocalStorage(storedLanguage);
  }

  saveLanguageInLocalStorage(language: string) {
    localStorage.setItem('language', language);
    this.setLanguageFromLocalStorage(language);
  }

  setLanguageFromLocalStorage(language: string) {
    this.currentLanguage.next(language);
  }
  
}
