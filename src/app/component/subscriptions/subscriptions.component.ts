import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscription } from 'src/app/types/database';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  subscriptions$: Observable<DbSubscription[]>;
  idToChangeAfterConfirmation: string = ''; // this is used for id storing until confirmation of edit/reply is handled in modal
  editForm: FormGroup= new FormGroup({
    id: new FormControl(''),
    name: new FormControl(null),
    lastPaid: new FormControl(new Date()),
    sessionsLeft: new FormControl(0),
  });
  deleteForm: FormGroup= new FormGroup({
    id: new FormControl(''),
    name: new FormControl(null),
  });

  constructor(
    private databaseService: DatabaseService
  ) {};

  ngOnInit() {
    this.getSubscriptions();
  };

  getSubscriptions() {
    this.subscriptions$ = this.databaseService.getData('subscriptions');
  };

  // saveIdToChangeAfterConfirmation(subscription: DbSubscription) {
  //   const {id, name, lastPaid, sessionsLeft} = subscription;
  //   this.idToChangeAfterConfirmation = id;
  //   this.editForm = new FormGroup({
  //     id: new FormControl(id),
  //     name: new FormControl(name),
  //     lastPaid: new FormControl(lastPaid),
  //     sessionsLeft: new FormControl(sessionsLeft),
  //   });
  // };

  openEditModal(subscription: DbSubscription) {
    const {id, name, lastPaid, sessionsLeft} = subscription;
    this.editForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      lastPaid: new FormControl(lastPaid),
      sessionsLeft: new FormControl(sessionsLeft),
    });
  };

  editSubscription() {
    const body = this.editForm.value;
    this.databaseService.patchData('subscriptions', body, this.editForm.value.id)
      .subscribe(() => {
        console.log('subscription edited');
        this.getSubscriptions();
    });
  };

  openDeleteModal(subscription: DbSubscription) {
    const {id, name} = subscription;
    this.deleteForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
    });
  };

  deleteSubscription() {
    this.databaseService.deleteData('subscriptions', this.deleteForm.value.id)
      .subscribe(() => {
        console.log('subscription deleted');
        this.getSubscriptions();
      });
  }
};
