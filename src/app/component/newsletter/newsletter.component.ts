import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable } from "rxjs";
import { DbNewsletter } from 'src/app/model/db-newsletter';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  newsletter$: Observable<DbNewsletter[]>;
  idToDeleteAfterConfirmation: string = '';

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getNewsletter();
  }

  getNewsletter() {
    this.newsletter$ = this.databaseService.getData('newsletter');
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