import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})
export class ContactDataComponent {
  contacts: any;
  keys: string[] = [];

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('contact').subscribe((response) => {
      this.contacts = response;
      this.keys = Object.keys(this.contacts);
    })
  }
}