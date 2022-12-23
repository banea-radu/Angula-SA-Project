import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpened: boolean = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  closeMenu() {
    if (this.menuOpened) {
      this.menuOpened = false;
    }
  }

}
