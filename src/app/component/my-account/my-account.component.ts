import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  myaccountSectionSelected: string = 'Subscriptions';
  
  constructor(
    public menuService: MenuService,
    public authService: AuthService
  ) {}

  myaccountSectionSelect(myaccountSectionSelected: string) {
    this.myaccountSectionSelected = myaccountSectionSelected;
  }
}
