import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { MenuService } from 'src/app/service/menu.service';
import { FirebaseService } from 'src/app/service/firebase.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  menuOpened: boolean = false;
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
    private menuService: MenuService,
    private formbuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private viewportScroller: ViewportScroller
  ) {}
  
  ngOnInit() {
    this.menuService.menuOpenedObservable.subscribe(response => {
      this.menuOpened = response;
    });
  }
  
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  formSubmit(form: {name: string, email: string, dateSubmitted?: Date}) {
    if (this.newsletterForm.valid) {
      this.firebaseService.postNewsletterFormData(form);
    }
  }
}
