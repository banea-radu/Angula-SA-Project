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
  // dbUsers: DbUser;
  // keys: string[] = [];

  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('users').subscribe((response) => {
      // this.users = response;
      let keys = Object.keys(response);
      const entries = Object.entries(response)  
      // for (const key in response) {
        console.log(entries);
      // }
    })
  }

}
