import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  closeMenu(menuOpened: boolean) {
    if (menuOpened) {
      menuOpened = false;
    }
    return menuOpened;
  }

}
