import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { MenuService } from 'src/app/service/menu.service';
import { DatabaseService } from 'src/app/service/database.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  ownerName:string = "SC Believe IT SRL";
  currentYear:number = new Date().getFullYear();

  newsletterForm = this.formbuilder.group({
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
    )]
  })

  constructor(
    public menuService: MenuService,
    private formbuilder: FormBuilder,
    private databaseService: DatabaseService,
    private viewportScroller: ViewportScroller,
    public translate: TranslateService
  ) {}
   
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  formSubmit(form: {name: string, email: string, dateSubmitted?: Date}) {
    if (this.newsletterForm.valid) {
      let alreadySubscribed: boolean = false;
      
      this.databaseService.getData('newsletter').subscribe((response) => {
        if (response !== null) {
          for (let item of Object.values(response)) { // observable returns object of objects, Object.values = individual object
            if (form.email == item.email) {
              alreadySubscribed = true;
              break; // if already subscribed, exit for loop
            }
          }
        }
        
        if (alreadySubscribed) {
          this.translate.get('Contact.Form.Submit-Alert-Warning', {email : form.email}).subscribe((res: string) => {
            alert(res);
          });
        } else {
          form.dateSubmitted = new Date();
          this.databaseService.postData('newsletter', form).subscribe((response) => {
            this.translate.get('Contact.Form.Submit-Alert-Success', {email : form.email}).subscribe((res: string) => {
              alert(res);
            });
            window.location.reload();
          })
        }
      })
    }
  }
  
}
