import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  
  @Input()
  title: string= '';

  constructor(private viewportScroller: ViewportScroller) { }
  
  scrollToAnchroingPosition(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  
}
