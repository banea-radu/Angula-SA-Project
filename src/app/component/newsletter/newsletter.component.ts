import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  newsletter: any;
  // keys: string[] = [];
  idToDeleteAfterConfirmation: string = '';

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getNewsletter();
  }

  getNewsletter() {
    this.databaseService.getData('newsletter')
    .subscribe((response: any) => {
      this.newsletter = response;
    })
  }

  saveIdToDeleteAfterConfirmation(id: string) {
    this.idToDeleteAfterConfirmation = id;
  }

  deleteSubscriber() {
    this.databaseService.deleteData('newsletter', this.idToDeleteAfterConfirmation)
      .subscribe(() => {
        console.log('subscriber deleted');
        this.getNewsletter();
      })
  }
}