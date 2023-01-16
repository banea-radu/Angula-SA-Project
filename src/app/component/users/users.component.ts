import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any;
  idToDeleteAfterConfirmation: string = '';

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.databaseService.getData('users')
    .subscribe((response: any) => {
      this.users = response;
    })
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