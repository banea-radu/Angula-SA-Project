import { Component } from '@angular/core';
import { DbUser } from 'src/app/model/db-user';
import { AuthService } from 'src/app/service/auth.service';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  userName: string ='?';

  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService
  ) {}

  ngOnInit() {
    // get user name from database
    this.databaseService.getData('users').subscribe((response) => {
      let dbUser: DbUser;
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user')!);
      for (dbUser of Object.values(response)) { // Object.values -> returns the user as an object
        if (dbUser.email === userFromLocalStorage.email) {
          this.userName = dbUser.name;
        }
      }
    })
  }

}
