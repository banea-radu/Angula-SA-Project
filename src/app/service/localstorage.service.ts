import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveLanguageInLocalStorage(language: string) {
    localStorage.setItem('language', language)
  }

  getLanguageInLocalStorage() {
    return localStorage.getItem('language');
  }
  
}
