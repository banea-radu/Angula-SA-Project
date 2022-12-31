import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  urlLink:string  = 'https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  getPrograms(){
    return this.http.get(this.urlLink + "program.json");
  }

  postContactFormData(formData: {name: string, email: string, subject: string, message: string, dateSubmitted?: Date}){
    let alreadySubscribed: boolean = false;
    this.http.get(this.urlLink + "contactForm.json")
      .subscribe((response) => {
        for (let item of Object.values(response)) {
          if (formData.email == item.email) {
            alreadySubscribed = true;
            break;
          }
        }
        if (alreadySubscribed) {
          alert("Emailul " + formData.email + " este deja abonat! Incearca te rog alt email! Multumesc");
          return;
        } else {
          formData.dateSubmitted = new Date();
          return this.http.post(this.urlLink + "contactForm.json", formData)
            .subscribe((response) => {
              alert("Formularul a fost trimis! O sa fii contactat pe emailul " + formData.email + " . Multumim!");
          });
        }
      })
  }
}