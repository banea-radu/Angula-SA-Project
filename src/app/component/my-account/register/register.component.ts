import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.formbuilder.group({
    name: [null, Validators.compose(
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ]
    )],
    email: [null, Validators.compose(
      [
        Validators.required,
        Validators.email
      ]
    )],
    password: [null, Validators.compose(
      [
        Validators.required,
        Validators.minLength(5)
      ]
    )]
  })

  constructor(
    public menuService: MenuService,
    private formbuilder: FormBuilder,
    public authService: AuthService
  ) {}

  formSubmit(form: {name: string, email: string, password: string}) {
    if (this.registerForm.valid) {
      this.authService.SignUp(form.name, form.email, form.password);
    }
  }

}
