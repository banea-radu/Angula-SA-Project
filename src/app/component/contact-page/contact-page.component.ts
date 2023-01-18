import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
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
    public menuService: MenuService,
    private formbuilder: FormBuilder,
    private databaseService: DatabaseService,
    public translate: TranslateService
  ) {}

  formSubmit(form: {name: string, email: string, subject: string, message: string, dateSubmitted?: Date}) {
    if (this.contactForm.valid) {
      form.dateSubmitted = new Date();
      this.databaseService.postData('contact', form).subscribe((response) => {
        this.translate.get('Footer.Newsletter.Submit-Alert-Success', {email : form.email}).subscribe((res: string) => {
          alert(res);
        });
        window.location.reload();
      })
    }
  }

}
