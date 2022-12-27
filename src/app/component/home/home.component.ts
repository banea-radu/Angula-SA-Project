import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuOpened: boolean = false;

  constructor( private viewportScroller: ViewportScroller) { }
  
  goToElementId(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
