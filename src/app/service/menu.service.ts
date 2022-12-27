import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuOpenedObservable = new BehaviorSubject<boolean>(false);
  
  toggleMenu(menuOpened: boolean) {
    this.menuOpenedObservable.next(!menuOpened);
  }

  closeMenuIfOpened(menuOpened: boolean) {
    if (menuOpened) {
      this.toggleMenu(menuOpened);
    }
  }

}
