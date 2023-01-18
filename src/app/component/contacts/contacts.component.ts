import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { DbContact } from 'src/app/model/db-contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts$: Observable<DbContact[]>;
  idToChangeAfterConfirmation: string = ''; // this is used for id storing until confirmation of delete/reply is handled in modal
  addReplyForm = this.formbuilder.group({
    reply: [null],
  })
  contactReplyData: DbContact = {
    dateSubmitted: new Date(),
    email: "?",
    message: "?",
    name: "?",
    subject: "?"
  };

  constructor(
    private databaseService: DatabaseService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.databaseService.getData('contact');
  }

  saveIdToChangeAfterConfirmation(contact: any) {
    this.idToChangeAfterConfirmation = contact.id;
    this.contactReplyData = contact;
  }

  addReply(form: {reply: string}) {
    this.databaseService.patchData('contact', form, this.idToChangeAfterConfirmation)
      .subscribe(() => {
        console.log('contact replied');
        this.getContacts();
      })
  }

  deleteContact() {
    this.databaseService.deleteData('contact', this.idToChangeAfterConfirmation)
      .subscribe(() => {
        console.log('contact deleted');
        this.getContacts();
      })
  }
}