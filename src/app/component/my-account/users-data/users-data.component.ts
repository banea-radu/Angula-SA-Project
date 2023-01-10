import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent {
  users: any;
  keys: string[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.getData('users').subscribe((response) => {
      this.users = response;
      this.keys = Object.keys(this.users);
    })
  }
}