import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MenuService } from 'src/app/service/menu.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpened: boolean = false;
  languageSelected: string = '';

  constructor(
    private menuService: MenuService,
    private localStorageService: LocalstorageService,
    private viewportScroller: ViewportScroller
    ) {}
    
  ngOnInit() {
    this.menuService.menuOpenedObservable.subscribe(response => {
      this.menuOpened = response;
    });
    this.localStorageService.currentLanguage.subscribe((response) => {
        this.languageSelected = response
    });
  }
  
  toggleMenu() {
    this.menuService.toggleMenu(this.menuOpened);
  }

  closeMenuIfOpened() {
      this.menuService.closeMenuIfOpened(this.menuOpened);
      this.scrollToTop();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  dropdownSelectLanguage(language: string) {
    if (language == 'ro') {
      this.localStorageService.saveLanguageInLocalStorage('ro');
    } else {
      if (language == 'en') {
        this.localStorageService.saveLanguageInLocalStorage('en');
      }
    }
  }

}
