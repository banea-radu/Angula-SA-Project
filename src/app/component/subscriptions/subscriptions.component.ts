import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, finalize, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscriptionSession, DbSubscriptionClient } from 'src/app/types/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  @ViewChild('hiddenDateInputAddModal') hiddenDateInputAddModal!: ElementRef;
  @ViewChild('hiddenDateInputEditModal') hiddenDateInputEditModal!: ElementRef;
  subscriptions$: Observable<DbSubscriptionSession[]>;
  subscriptionsClients$: Observable<DbSubscriptionClient[]>;
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
  addSubscriptionForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(null),
    datePaid: new FormControl(this.today),
    sessionsToAdd: new FormControl(0),
  });
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
  ) {};

  ngOnInit() {
    this.getSubscriptionsClients();
  };

  getSubscriptionsClients() {
    this.isLoading = true;
    this.subscriptionsClients$ = this.databaseService.getSubscriptionsClients().pipe(
      delay(350),
      finalize(() => {
        this.isLoading = false;
      })
    );
  };

  openAddModal() {
    this.addSubscriptionForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(null),
      datePaid: new FormControl(this.today),
      sessionsToAdd: new FormControl(0),
    });
  };

  addClient() {
    console.log(this.addClientForm.value.name);
    this.databaseService.addNewSubscriptionClient(this.addClientForm.value.name)
      .subscribe(() => {
        console.log('client added');
        this.getSubscriptionsClients();
    });
  };






  // openAddClientModal() {
  //   this.addClientForm = new FormGroup({
  //     name: new FormControl(null),
  //   });
  // };





  getSubscriptions() {
    this.subscriptions$ = this.databaseService.getData('subscriptions');
  };

  openDatePickerAddModal() {
     this.hiddenDateInputAddModal.nativeElement.showPicker();
  };

  addSubscription() {
    const body = {
      id: this.addSubscriptionForm.value.id,
      name: this.addSubscriptionForm.value.name,
      lastPaid: this.addSubscriptionForm.value.datePaid,
      sessionsLeft: this.addSubscriptionForm.value.sessionsToAdd,
    };
    this.databaseService.postData('subscriptions', body)
      .subscribe(() => {
        console.log('subscription added');
        this.getSubscriptions();
    });
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
