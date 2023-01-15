import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-newsletter-data',
  templateUrl: './newsletter-data.component.html',
  styleUrls: ['./newsletter-data.component.css']
})
export class NewsletterDataComponent {
  newsletter: any;
  keys: string[] = [];

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('newsletter').subscribe((response) => {
      this.newsletter = response;
      this.keys = Object.keys(this.newsletter);
    })
  }
}