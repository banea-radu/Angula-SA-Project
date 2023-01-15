import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  menuOpened: boolean = false;
  totalSlides: number = 5; // total nmumber of slides
  currentSlide:number = 1; // starting slide
  pressedSliderButton:string = '';

  constructor(private menuService: MenuService, private viewportScroller: ViewportScroller) { }
  
  ngOnInit() {
    // Subscribe to observable from MenuService
    this.menuService.menuOpenedObservable.subscribe((response: boolean) => {
      this.menuOpened = response;
    });
  }
    
  goToElementId(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  nextSlide() {
    this.pressedSliderButton = 'next'; // change class to slide from right
    if (this.currentSlide === this.totalSlides) {
      this.currentSlide = 1;
    } else {
      this.currentSlide++;
    }
  }

  previousSlide() {
    this.pressedSliderButton = 'previous'; // change class to slide from right
    if (this.currentSlide === 1) {
      this.currentSlide = this.totalSlides;
    } else {
      this.currentSlide--;
    }
  }
}
