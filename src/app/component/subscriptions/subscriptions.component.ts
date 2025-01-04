import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay, finalize, forkJoin, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscriptionSession, DbSubscriptionClient, DbSubscriptionSessionStatus } from 'src/app/types/database';
import { DatePipe } from '@angular/common';

export type SessionsData = {
  clientId: string;
  datePaid: string;
  name: string;
  sessionsToAdd: number;
}

type ClientData = {
  id: string;
  name: string;
  sessionsLeft: number;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  @ViewChild('hiddenDateInputAddModal') hiddenDateInputAddModal!: ElementRef;
  @ViewChild('hiddenDateInputEditModal') hiddenDateInputEditModal!: ElementRef;
  clients: DbSubscriptionClient[];
  sessions: DbSubscriptionSession[];
  clientsData: ClientData[];
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
    clientId: ['', Validators.required],
    datePaid: [this.today, Validators.required],
    name: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ]
    )],
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
    this.isLoading = true;
    forkJoin([
      this.getClients(),
      this.getSessionsData('AVAILABLE')
    ]).subscribe(([clients, sessions]) => {
      this.clients = clients;
      this.sessions = sessions;
      this.clientsData = clients.map(client => {
        const sessionsCount = sessions.filter(session => session.clientId === client.id).length;
        return {
          id: client.id,
          name: client.name,
          sessionsLeft: sessionsCount
        };
      });
      this.isLoading = false;
    });
  }

  getClients(): Observable<DbSubscriptionClient[]> {
    return this.databaseService.getSubscriptionsClients().pipe(
      delay(350)
    );
  }

  resetAddSessionsFormValues() {
    this.addSessionsForm.reset(this.addSessionsFormInitialValues);
  }

  addClient() {
    if (this.addClientForm.valid) {
      this.isLoading = true;
      this.databaseService.addSubscriptionClient(this.addClientForm.value.name).subscribe(() => {
        console.log('client added');
        this.addClientForm.reset(this.addClientFormInitialValues);
        this.getClients().subscribe((res)=> {
          this.clients = res;
          this.isLoading = false;
        });
      });
    }  
  }

  setSelectedClientName() {
    const selectedId = this.addSessionsForm.value.clientId;
    const selectedClientName = this.clients.find(client => client.id === selectedId).name;
    this.addSessionsForm.get('name').setValue(selectedClientName);
  }

  getSessionsData(status: DbSubscriptionSessionStatus): Observable<DbSubscriptionSession[]> {
    return this.databaseService.getSubscriptionsData(status).pipe(
      delay(350)
    );
  }

  addSessions() {
    if (this.addSessionsForm.valid) {
      this.isLoading = true;
      this.databaseService.addSubscriptionSessions(this.addSessionsForm.value as SessionsData).subscribe(() => {
        console.log('sessions added');
        this.addClientForm.reset(this.addClientFormInitialValues);
        this.getSessionsData('AVAILABLE').subscribe((res)=> {
          this.sessions = res;
          this.isLoading = false;
        });
      });
    }
  }








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
