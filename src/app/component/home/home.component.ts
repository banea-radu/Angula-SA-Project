import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private viewportScroller: ViewportScroller) { }
  
  goToElementId(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
