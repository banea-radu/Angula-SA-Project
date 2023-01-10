import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-newsletter-data',
  templateUrl: './newsletter-data.component.html',
  styleUrls: ['./newsletter-data.component.css']
})
export class NewsletterDataComponent {
  newsletter: any;
  keys: string[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.getData('newsletter').subscribe((response) => {
      this.newsletter = response;
      this.keys = Object.keys(this.newsletter);
    })
  }
}