import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  constructor(
    public menuService: MenuService,
    public authService: AuthService
  ) {}

  sendVerificationMail() {
    this.authService.SendVerificationMail();
  }

}