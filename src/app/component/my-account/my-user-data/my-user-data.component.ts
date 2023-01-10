import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-user-data',
  templateUrl: './my-user-data.component.html',
  styleUrls: ['./my-user-data.component.css']
})
export class MyUserDataComponent {

  constructor(
    public authService: AuthService
  ) {}
}
