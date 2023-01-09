import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';
// import { FirebaseService } from 'src/app/service/firebase.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
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
    // private firebaseService: FirebaseService,
    public translate: TranslateService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to observable from MenuService
    this.menuService.menuOpenedObservable.subscribe((response: boolean) => {
      this.menuOpened = response;
    });
  }

  }