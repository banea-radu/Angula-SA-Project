import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpened: boolean = false;

  constructor (private menuService: MenuService) {}

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  closeMenu() {
    this.menuOpened = this.menuService.closeMenu(this.menuOpened);
  }

}
