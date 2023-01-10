import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})
export class ContactDataComponent {
  contacts: any;
  keys: string[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.getData('contact').subscribe((response) => {
      this.contacts = response;
      this.keys = Object.keys(this.contacts);
    })
  }
}