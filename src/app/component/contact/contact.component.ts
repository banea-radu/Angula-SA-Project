import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  menuOpened: boolean = false;

  contactForm = this.formbuilder.group({
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
    subject: [null, Validators.compose(
      [
        Validators.required,
        Validators.minLength(5)
      ]
    )],
    message: [null, Validators.compose(
      [
        Validators.required,
        Validators.minLength(20)
      ]
    )]
  })

  constructor(
    private menuService: MenuService,
    private formbuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    // Subscribe to observable from MenuService
    this.menuService.menuOpenedObservable.subscribe((response: boolean) => {
      this.menuOpened = response;
    });
  }

  formSubmit(form: {name: string, email: string, subject: string, message: string, dateSubmitted?: Date}) {
    if (this.contactForm.valid) {
      form.dateSubmitted = new Date();
      this.firebaseService.postData('contact', form).subscribe((response) => {
        this.translate.get('Footer.Newsletter.Submit-Alert-Success', {email : form.email}).subscribe((res: string) => {
          alert(res);
        });
        window.location.reload();
      })
    }
  }

}
