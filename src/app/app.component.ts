import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-SA-Project';
  languageRoSelected: boolean = false;
  languageEnSelected: boolean = false;

  constructor(
    private localStorageService: LocalstorageService,
    public translate: TranslateService
  ) {
    translate.addLangs(['ro', 'en']);
    let defaultLanguage = this.localStorageService.getLanguageInLocalStorage();
    if (defaultLanguage == null) { defaultLanguage = 'ro'; }
    translate.setDefaultLang(defaultLanguage);
  }
  
}
