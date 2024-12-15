import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable } from "rxjs";
import { DbUser } from 'src/app/types/db-user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$: Observable<DbUser[]>;
  idToDeleteAfterConfirmation: string = '';

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.databaseService.getData('users');
  }

  saveIdToDeleteAfterConfirmation(id: string) {
    this.idToDeleteAfterConfirmation = id;
  }

  deleteUser() {
    this.databaseService.deleteData('users', this.idToDeleteAfterConfirmation)
      .subscribe(() => {
        console.log('user deleted');
        this.getUsers();
      })
  }
}