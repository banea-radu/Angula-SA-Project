import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MenuService } from 'src/app/service/menu.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpened: boolean = false;

  constructor(
    private menuService: MenuService,
    public localStorageService: LocalStorageService,
    private viewportScroller: ViewportScroller
  ) {}
    
  ngOnInit() {
    this.menuService.menuOpened$.subscribe((response: boolean) => {
      this.menuOpened = response;
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
      this.menuService.closeMenuIfOpened(this.menuOpened);
    } else {
      if (language == 'en') {
        this.localStorageService.saveLanguageInLocalStorage('en');
        this.menuService.closeMenuIfOpened(this.menuOpened);
      }
    }
  }

}
