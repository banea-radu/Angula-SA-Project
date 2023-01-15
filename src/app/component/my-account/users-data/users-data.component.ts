import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent {
  users: any;
  keys: string[] = [];

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('users').subscribe((response) => {
      this.users = response;
      this.keys = Object.keys(this.users);
    })
  }
}