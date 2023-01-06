import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  urlLink = {
    base : "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/",
    endpoint : {
      programs: "programs.json",
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

}