import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDataComponent } from './newsletter-data.component';

describe('NewsletterDataComponent', () => {
  let component: NewsletterDataComponent;
  let fixture: ComponentFixture<NewsletterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
