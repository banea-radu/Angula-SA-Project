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
  resetForm = this.formbuilder.group({
    email: [null, Validators.compose(
      [
        Validators.required,
        Validators.email
      ]
    )]
  })

  constructor(
    public menuService: MenuService,
    private formbuilder: FormBuilder,
    public authService: AuthService
  ) {}

  formSubmit(form: {email: string}) {
    if (this.resetForm.valid) {
      this.authService.ForgotPassword(form.email);
    }
  }

}
