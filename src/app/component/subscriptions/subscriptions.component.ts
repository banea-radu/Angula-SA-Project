import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay, finalize, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscriptionSession, DbSubscriptionClient } from 'src/app/types/database';
import { DatePipe } from '@angular/common';

export type SessionsData = {
  clientId: string;
  datePaid: string;
  name: string;
  sessionsToAdd: number;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  @ViewChild('hiddenDateInputAddModal') hiddenDateInputAddModal!: ElementRef;
  @ViewChild('hiddenDateInputEditModal') hiddenDateInputEditModal!: ElementRef;
  sessions$: Observable<DbSubscriptionSession[]>;
  // clients$: Observable<DbSubscriptionClient[]>;
  clients: DbSubscriptionClient[];
  selectedClientName: string | null = null;
  isLoading = true;
  today = this.datePipe.transform(new Date(), "yyyy-MM-dd"); // get today's date for datepicker
  addClientForm = this.formbuilder.group({
    name: [null, Validators.compose(
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ]
    )],
  });
  addClientFormInitialValues = this.addClientForm.value;

  addSessionsForm = this.formbuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ]
    )],
    datePaid: [this.today, Validators.required],
    sessionsToAdd: [0, Validators.compose(
      [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]
    )],
  });
  addSessionsFormInitialValues = this.addSessionsForm.value;




  editClientForm = this.formbuilder.group({
    id: new FormControl(''),
    name: new FormControl(null),
    lastPaid: new FormControl(new Date()),
    sessionsLeft: new FormControl(0),
  });
  deleteForm = this.formbuilder.group({
    id: new FormControl(''),
    name: new FormControl(null),
  });

  constructor(
    private databaseService: DatabaseService,
    private datePipe: DatePipe,
    private formbuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.isLoading = true;
    this.databaseService.getSubscriptionsClients().pipe(
      delay(350),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((res) => {
      this.clients = res;
    });
  }

  resetAddSessionsFormValues() {
    this.addSessionsForm.reset(this.addSessionsFormInitialValues);
  }

  addClient() {
    if (this.addClientForm.valid) {
      this.databaseService.addSubscriptionClient(this.addClientForm.value.name)
        .subscribe(() => {
          console.log('client added');
          this.addClientForm.reset(this.addClientFormInitialValues);
          this.getClients();
      });
    }  
  }

  setSelectedClientName() {
    const selectedId = this.addSessionsForm.value.id;
    const selectedClientName = this.clients.find(client => client.id === selectedId).name;
    this.addSessionsForm.get('name').setValue(selectedClientName);
  }

  addSessions() {
    if (this.addSessionsForm.valid) {
      this.databaseService.addSubscriptionSessions(this.addSessionsForm.value as SessionsData)
        .subscribe(() => {
          console.log('sessions added');
          this.addClientForm.reset(this.addClientFormInitialValues);
          this.getClients();
      });
    }
    
    // const body = {
    //   id: this.addSessionsForm.value.id,
    //   name: this.addSessionsForm.value.name,
    //   lastPaid: this.addSessionsForm.value.datePaid,
    //   sessionsLeft: this.addSessionsForm.value.sessionsToAdd,
    // };
    // this.databaseService.postData('subscriptions', body)
    //   .subscribe(() => {
    //     console.log('subscription added');
    //     this.getSubscriptions();
    // });
  }






  // openAddClientModal() {
  //   this.addClientForm = new FormGroup({
  //     name: new FormControl(null),
  //   });
  // };





  getSessions() {
    this.sessions$ = this.databaseService.getData('subscriptions');
  };

  openDatePickerAddModal() {
     this.hiddenDateInputAddModal.nativeElement.showPicker();
  };

  // openEditModal(subscription: DbSubscriptionSession) {
  //   const {id, name, lastPaid, sessionsLeft} = subscription;
  //   this.editForm = new FormGroup({
  //     id: new FormControl(id),
  //     name: new FormControl(name),
  //     lastPaid: new FormControl(lastPaid),
  //     sessionsLeft: new FormControl(sessionsLeft),
  //   });
  // };

  openDatePickerEditModal() {
    this.hiddenDateInputEditModal.nativeElement.showPicker();
 };

  // saveEditedSubscription() {
  //   const body = this.editForm.value;
  //   this.databaseService.patchData('subscriptions', body, this.editForm.value.id)
  //     .subscribe(() => {
  //       console.log('subscription edited');
  //       this.getSubscriptions();
  //   });
  // };

  // openDeleteModal(subscription: DbSubscriptionSession) {
  //   const {id, name} = subscription;
  //   this.deleteForm = new FormGroup({
  //     id: new FormControl(id),
  //     name: new FormControl(name),
  //   });
  // };

  // deleteSubscription() {
  //   this.databaseService.deleteData('subscriptions', this.deleteForm.value.id)
  //     .subscribe(() => {
  //       console.log('subscription deleted');
  //       this.getSubscriptions();
  //     });
  // }
};
