import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: any;
  keys: string[] = [];
  idToChangeAfterConfirmation: string = ''; // this is used for id storing until confirmation of delete/reply is handled in modal
  AddReplyForm = this.formbuilder.group({
    reply: [null],
  })

  constructor(
    private databaseService: DatabaseService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    // get contact data from database
    this.databaseService.getData('contact')
      .subscribe((response: any) => {
        this.contacts = response;
    })
  }

  saveIdToChangeAfterConfirmation(id: string) {
    this.idToChangeAfterConfirmation = id;
  }

  AddReply(form: {reply: string}) {
    console.log("not yet implemented");
  }

  deleteContact() {
    this.databaseService.deleteData('contact', this.idToChangeAfterConfirmation)
      .subscribe(() => {
        console.log('contact deleted');
        this.getContacts();
      })
  }
}