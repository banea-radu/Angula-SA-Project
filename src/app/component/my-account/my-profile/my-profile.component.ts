import { Component } from '@angular/core';
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
    this.getUserName();
  }

  getUserName() {
    // get user name from database
    this.databaseService.getData('users').subscribe((response: any) => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user')!);
      for (let user of response) {
        if (user.email === userFromLocalStorage.email) {
          this.userName = user.name;
        }
      }
    })
  }

}
