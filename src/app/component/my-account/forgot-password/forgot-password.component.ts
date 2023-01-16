import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  menuOpened: boolean = false;

  loginForm = this.formbuilder.group({
    email: [null, Validators.compose(
      [
        Validators.required,
        Validators.email
      ]
    )]
  })

  constructor(
    private menuService: MenuService,
    private formbuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to observable from MenuService
    this.menuService.menuOpenedObservable.subscribe((response: boolean) => {
      this.menuOpened = response;
    });
  }

  formSubmit(form: {email: string}) {
    if (this.loginForm.valid) {
      this.authService.ForgotPassword(form.email);
    }
  }

}
