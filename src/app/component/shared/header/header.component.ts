import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { ViewportScroller } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpened: boolean = false;
  languageRoSelected: boolean = false;
  languageEnSelected: boolean = false;

  constructor(
    private menuService: MenuService,
    private viewportScroller: ViewportScroller,
    public translate: TranslateService)
    {
      translate.addLangs(['ro', 'en']);
      translate.setDefaultLang('ro');
    }

  ngOnInit() {
    this.menuService.menuOpenedObservable.subscribe(response => {
      this.menuOpened = response;
    });
    this.dropdownSelectLanguage('ro');
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

  dropdownSelectLanguage(language: string) { // select language in dropdown list by marking it adding the active class
    if (language == 'ro') {
      this.languageRoSelected = true;
      this.languageEnSelected = false;
    } else {
      if (language == 'en') {
        this.languageRoSelected = false;
        this.languageEnSelected = true;
      }
    }
  }

}
