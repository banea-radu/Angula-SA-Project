import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  menuOpened: boolean = false;

  constructor(private menuService: MenuService, private viewportScroller: ViewportScroller) { }
  
  ngOnInit() {
    this.menuService.menuOpenedObservable.subscribe(response => {
      this.menuOpened = response;
    });
  }
  
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
