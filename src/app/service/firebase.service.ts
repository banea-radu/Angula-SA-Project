import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // baseUrlLink:string  = 'https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/';
  urlLink = {
    base : "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/",
    endpoint : {
      programs: "program.json",
      newsletter : "newsletterForm.json",
      contact : "contactForm.json"
    }
  }

  constructor(private http: HttpClient) {}

  getData(endpoint: string){
    switch(endpoint) {
      case "programs" :
        endpoint = this.urlLink.endpoint.programs;
        break;
      case "newsletter" :
        endpoint = this.urlLink.endpoint.newsletter;
        break;
      case "contact" :
        endpoint = this.urlLink.endpoint.contact;
        break;
    }
    return this.http.get(this.urlLink.base + endpoint);
  }

  postData(endpoint: string, formData: {name: string, email: string, dateSubmitted?: Date} ){
    switch(endpoint) {
      case "programs" :
        endpoint = this.urlLink.endpoint.programs;
        break;
      case "newsletter" :
        endpoint = this.urlLink.endpoint.newsletter;
        break;
      case "contact" :
        endpoint = this.urlLink.endpoint.contact;
        break;
    }
    return this.http.post(this.urlLink.base + endpoint, formData);
  }

  postContactFormData(formData: {name: string, email: string, subject: string, message: string, dateSubmitted?: Date}){
    formData.dateSubmitted = new Date();
    return this.http.post(this.urlLink.base + this.urlLink.endpoint.contact, formData)
      .subscribe((response) => {
        alert("Formularul a fost trimis! O sa fii contactat pe emailul " + formData.email + " . Multumim!");
        window.location.reload();
      });
  }
  // getPrograms(){
  //   return this.http.get(this.urlLink.base + this.urlLink.endpoint.programs);
  // }

  // postNewsletterFormData(formData: {name: string, email: string, dateSubmitted?: Date}){
  //   let alreadySubscribed: boolean = false;
  //   this.http.get(this.urlLink + "newsletterForm.json")
  //     .subscribe((response) => {
  //       if (response) {
  //         for (let item of Object.values(response)) {
  //           if (formData.email == item.email) {
  //             alreadySubscribed = true;
  //             break;
  //           }
  //         }
  //       }
  //       if (alreadySubscribed) {
  //         alert("Emailul " + formData.email + " este deja abonat! Incearca te rog alt email! Multumesc");
  //         return;
  //       } else {
  //         formData.dateSubmitted = new Date();
  //         return this.http.post(this.urlLink + "newsletterForm.json", formData)
  //           .subscribe((response) => {
  //             alert("Te-ai abonat cu succes! O sa primesti noutati pe emailul " + formData.email + " . Multumim!");
  //             window.location.reload();
  //         });
  //       }
  //     })
  // }

  // getNewsletterData() {
  //   return this.http.get(this.urlLink.base + this.urlLink.endpoint.newsletter);
  // }



  // postNewsletterFormData(formData: {name: string, email: string, dateSubmitted?: Date}){
  //   let alreadySubscribed: boolean = false;
  //   this.http.get(this.urlLink.base + this.urlLink.endpoint.newsletter)
  //     .subscribe((response) => {
  //       if (response) {
  //         for (let item of Object.values(response)) {
  //           if (formData.email == item.email) {
  //             alreadySubscribed = true;
  //             break;
  //           }
  //         }
  //       }
  //       if (alreadySubscribed) {
  //         alert("Emailul " + formData.email + " este deja abonat! Incearca te rog alt email! Multumesc");
  //         return;
  //       } else {
  //         formData.dateSubmitted = new Date();
  //         return this.http.post(this.urlLink.base + this.urlLink.endpoint.newsletter, formData)
  //           .subscribe((response) => {
  //             alert("Te-ai abonat cu succes! O sa primesti noutati pe emailul " + formData.email + " . Multumim!");
  //             window.location.reload();
  //         });
  //       }
  //     })
  // }
}