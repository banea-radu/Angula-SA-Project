import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  menuOpened: boolean = false;

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

  sendVerificationMail() {
    this.authService.SendVerificationMail();
  }

}