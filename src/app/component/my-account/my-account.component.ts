import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  menuOpened: boolean = false;
  myaccountSectionSelected: string = 'My Profile';
  
  constructor(
    private menuService: MenuService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to observable from MenuService
    this.menuService.menuOpenedObservable.subscribe((response: boolean) => {
      this.menuOpened = response;
    });
  }

  myaccountSectionSelect(myaccountSectionSelected: string) {
    this.myaccountSectionSelected = myaccountSectionSelected;
  }
}
