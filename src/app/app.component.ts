import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular-SA-Project';

  constructor(
    private localStorageService: LocalstorageService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.addLangs(['ro', 'en']);
    this.localStorageService.currentLanguage.subscribe((response) => {
      this.translateTexts(response);
    });
  }

  translateTexts(language: string) {
    this.translate.use(language);
  }
  
}
