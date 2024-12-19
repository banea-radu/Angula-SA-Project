import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { DbSubscription } from 'src/app/types/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  @ViewChild('hiddenDateInputAddModal') hiddenDateInputAddModal!: ElementRef;
  @ViewChild('hiddenDateInputEditModal') hiddenDateInputEditModal!: ElementRef;
  subscriptions$: Observable<DbSubscription[]>;
  today = this.datePipe.transform(new Date(), "yyyy-MM-dd"); // get today's date for datepicker
  addForm: FormGroup= new FormGroup({
    id: new FormControl(''),
    name: new FormControl(null),
    datePaid: new FormControl(this.today),
    sessionsToAdd: new FormControl(0),
  });
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
    private databaseService: DatabaseService,
    private datePipe: DatePipe,
  ) {};

  ngOnInit() {
    this.getSubscriptions();
  };

  getSubscriptions() {
    this.subscriptions$ = this.databaseService.getData('subscriptions');
  };

  openAddModal() {
    this.addForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(null),
      datePaid: new FormControl(this.today),
      sessionsToAdd: new FormControl(0),
    });
  };

  openDatePickerAddModal() {
     this.hiddenDateInputAddModal.nativeElement.showPicker();
  };

  addSubscription() {
    const body = {
      id: this.addForm.value.id,
      name: this.addForm.value.name,
      lastPaid: this.addForm.value.datePaid,
      sessionsLeft: this.addForm.value.sessionsToAdd,
    };
    this.databaseService.postData('subscriptions', body)
      .subscribe(() => {
        console.log('subscription added');
        this.getSubscriptions();
    });
  };

  openEditModal(subscription: DbSubscription) {
    const {id, name, lastPaid, sessionsLeft} = subscription;
    this.editForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      lastPaid: new FormControl(lastPaid),
      sessionsLeft: new FormControl(sessionsLeft),
    });
  };

  openDatePickerEditModal() {
    this.hiddenDateInputEditModal.nativeElement.showPicker();
 };

  saveEditedSubscription() {
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
