import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuOpened: boolean = false;

  constructor(private menuService: MenuService, private viewportScroller: ViewportScroller) { }
  
  ngOnInit() {
    this.menuService.menuOpenedObservable.subscribe(response => {
      this.menuOpened = response;
    });
  }
    
  goToElementId(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
