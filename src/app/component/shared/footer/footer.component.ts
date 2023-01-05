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

  // getNewsletterData() {
  //   this.firebaseService.getData('newsletter').subscribe((response) => {
  //     console.log(response);
  //     return response;
  //   })
  // }

  formSubmit(form: {name: string, email: string, dateSubmitted?: Date}) {
    let alreadySubscribed: boolean = false;

    if (this.newsletterForm.valid) {
      this.firebaseService.getData('newsletter').subscribe((response) => {

        for (let item of Object.values(response)) { // observable returns object of objects, Object.values = individual object
          if (form.email == item.email) {
            alreadySubscribed = true;
            break; // if already subscribed, exit for loop
          }
        }

        if (alreadySubscribed) {
          alert("Emailul " + form.email + " este deja abonat! Incearca te rog alt email! Multumesc");
        } else {
          form.dateSubmitted = new Date();
          this.firebaseService.postData('newsletter', form).subscribe((response) => {
            alert("Te-ai abonat cu succes! O sa primesti noutati pe emailul " + form.email + " . Multumim!");
            window.location.reload();
          })
        }

      })
    }
    
  }
    
      // if (response != null || response != undefined) {
      //   for (let item of Object.values(response)) {
          // console.log(item);
          // if (form.email == item.email) {
          //   let alreadySubscribed = true;
          //   break;
          // }
        // }
      // }

      // if (alreadySubscribed) {
      //   alert("Emailul " + form.email + " este deja abonat! Incearca te rog alt email! Multumesc");
      //   return;
      // } else {
        // console.log("########");
        // form.dateSubmitted = new Date();
        // return this.http.post(this.urlLink.base + this.urlLink.endpoint.newsletter, formData)
        //   .subscribe((response) => {
        //     alert("Te-ai abonat cu succes! O sa primesti noutati pe emailul " + formData.email + " . Multumim!");
        //     window.location.reload();
        // });
      // }

      // this.firebaseService.postNewsletterFormData(form);
    // }
  // }
}
