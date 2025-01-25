import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay, forkJoin, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscriptionSession, DbSubscriptionClient, DbSubscriptionSessionStatus } from 'src/app/types/database';
import { DatePipe } from '@angular/common';

export type SessionsData = {
  clientId: string;
  datePaid: string;
  name: string;
  sessionsToAdd: number;
}

type TableClientData = {
  id: string;
  name: string;
  oldestPayDate: Date;
  sessionsLeft: number;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  @ViewChild('hiddenDateInputAddModal') hiddenDateInputAddModal!: ElementRef;
  clients: DbSubscriptionClient[];
  sessions: DbSubscriptionSession[];
  tableClientsData: TableClientData[];
  selectedClientName: string | null = null;
  clientSessions: DbSubscriptionSession[];
  sessionIdToDelete: string;
  isLoading = true;
  today = this.datePipe.transform(new Date(), "yyyy-MM-dd"); // get today's date for datepicker
  isSaveNameButtonVisible = false;
  isSaveNameLoading = false;
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
  editForm = this.formbuilder.group({
    id: new FormControl(''),
    name: new FormControl(null),
    oldestPayDate: new FormControl(new Date()), // not used in form, just for type checking
    sessionsLeft: new FormControl({value: 0, disabled: true}),
    sessionsList: new FormControl([]),
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
    ])
    // .pipe(
    //   retryWhen((errors) =>
    //     errors.pipe(
    //       scan((retryCount, err) => {
    //         if (retryCount >= 3) {
    //           throw err; // Stop retrying after 3 attempts
    //         }
    //         console.warn(`Retrying... Attempt #${retryCount + 1}`);
    //         return retryCount + 1;
    //       }, 0),
    //       delay(2000) // 2 seconds between retries
    //     )
    //   )
    // )
    .subscribe(([clients, sessions]) => {
      this.clients = clients;
      this.sessions = sessions;
      this.setTableClientsData();
      this.isLoading = false;
    });
  }

  getClients(): Observable<DbSubscriptionClient[]> {
    return this.databaseService.getSubscriptionsClients().pipe(
      delay(350)
    );
  }

  addClient() {
    if (this.addClientForm.valid) {
      this.isLoading = true;
      this.databaseService.addSubscriptionClient(this.addClientForm.value.name).subscribe(() => {
        console.log('client added');
        this.addClientForm.reset(this.addClientFormInitialValues);
        this.getClients().subscribe((res)=> {
          this.clients = res;
          this.setTableClientsData();
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
        this.addSessionsForm.reset(this.addSessionsFormInitialValues);
        this.getSessionsData('AVAILABLE').subscribe((res)=> {
          this.sessions = res;
          this.setTableClientsData();
          this.isLoading = false;
        });
      });
    }
  }

  setTableClientsData() {
    this.tableClientsData = this.clients.map(client => {
      const clientSessions  = this.sessions.filter(session => session.clientId === client.id);
      const sessionsCount = clientSessions.length;
      const oldestDatePaid = sessionsCount > 0 
        ? new Date(Math.min(...clientSessions.map(session => new Date(session.datePaid).getTime())))
        : null;

      return {
        id: client.id,
        name: client.name,
        oldestPayDate: oldestDatePaid,
        sessionsLeft: sessionsCount
      };
    });
  }

  openEditModal(client: TableClientData) {
    const {id, name, oldestPayDate, sessionsLeft} = client;
    this.isLoading = true;
    // Get all sessions for client to view in sessions table
    this.databaseService.getClientSubscriptionsData(id).pipe(
      delay(350)
    ).subscribe((res) => {
      this.clientSessions = res;
      this.editForm = this.formbuilder.group({
        id: new FormControl(id),
        name: new FormControl(name),
        oldestPayDate: new FormControl(oldestPayDate),
        sessionsLeft: new FormControl({value: sessionsLeft, disabled: true}),
        sessionsList: new FormControl(this.clientSessions),
      });
      this.editForm.get('name').valueChanges.subscribe(value => {
        this.isSaveNameButtonVisible = value !== name;
      });
      this.isLoading = false;
    });
  }

  editClientName() {
    const { id, name} = this.editForm.value;
    this.isSaveNameButtonVisible = false;
    this.isSaveNameLoading = true;
    this.databaseService.editSubscriptionClientName(id, name)
      .subscribe(() => {
        console.log('subscription name edited');
        const editedClientData = this.editForm.getRawValue() as TableClientData; // Fetch all values, including those from disabled controls.
        // refresh table clients object
        this.isLoading = true;
        this.getClients().subscribe((res)=> {
          this.clients = res;
          this.setTableClientsData();
          this.isLoading = false;
          this.isSaveNameLoading = false;
        });
        this.openEditModal(editedClientData);
    });
  }

  toggleSessionStatus(session: DbSubscriptionSession) {
    session.status = session.status === 'AVAILABLE' ? 'USED' : 'AVAILABLE';
    this.isLoading = true;
    this.databaseService.setSubscriptionSessionStatus(session.id, session.status)
    .subscribe(() => {
      console.log('session status edited');
      this.getSessionsData('AVAILABLE').subscribe((res)=> {
        this.sessions = res;
        this.setTableClientsData();
        const sessionsLeft = this.editForm.get('sessionsLeft').value;
        this.editForm.get('sessionsLeft').setValue(session.status === 'AVAILABLE' ? sessionsLeft + 1 : sessionsLeft - 1);
        this.isLoading = false;
      });
  });
  }

  setSessionIdToDelete(id: string) {
    this.sessionIdToDelete = id;
  }

  openDeleteClientModal() {
    this.deleteForm = this.formbuilder.group({
      id: new FormControl(this.editForm.value.id),
      name: new FormControl(this.editForm.value.name),
    });
  }

  deleteClient(clientId: string) {
    this.isLoading = true;
    this.databaseService.deleteSubscriptionClient(clientId)
      .subscribe(() => {
        console.log('subscription deleted');
        // refresh table clients object
        this.isLoading = true;
        this.getClients().subscribe((res)=> {
          this.clients = res;
          this.setTableClientsData();
          this.isLoading = false;
        });
    });
  }

  deleteClientSession(id: string) {
    this.isLoading = true;
    this.databaseService.deleteSubscriptionSession(id).subscribe(() => {
      console.log('session deleted');
      this.getSessionsData('AVAILABLE').subscribe((res)=> {
        this.sessions = res;
        this.setTableClientsData();
        const sessionsLeft = this.editForm.get('sessionsLeft').value;
        this.editForm.get('sessionsLeft').setValue(sessionsLeft - 1);
        this.isLoading = false;
      });
    });
  }

  openDatePickerAddModal() {
      alert('click');
      this.hiddenDateInputAddModal.nativeElement.showPicker();
  }
};
