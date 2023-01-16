import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  menuOpened: boolean = false;

  loginForm = this.formbuilder.group({
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

  formSubmit(form: {email: string, password: string}) {
    if (this.loginForm.valid) {
  //     let correctPassword: boolean = false;

  //     this.firebaseService.getData('users').subscribe((response) => {

  //       for (let item of Object.values(response)) { // observable returns object of objects, Object.values = individual object
  //         if (form.email == item.email) {
  //           if (form.password == item.password) {
  //             correctPassword = true;
  //             break; // if already subscribed, exit for loop
  //           }
  //         }
  //       }

  //       if (correctPassword) {
  //         console.log("loged in");
  //       } else {
  //         this.translate.get('Login.Form.Submit-Alert-Warning').subscribe((res: string) => {
  //           alert(res);
  //         });
  //       }

  //     })

    this.authService.SignIn(form.email, form.password);
    }
  }

  }