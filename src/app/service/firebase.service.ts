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
      newsletter : "newsletter.json",
      contact : "contact.json",
      users : "users.json"
    }
  }

  constructor(
    private http: HttpClient
  ) {}

  createCompleteUrl(endpoint: string){
    // switch(endpoint) {
    //   case "programs" :
    //     endpoint = this.urlLink.endpoint.programs;
    //     break;
    //   case "newsletter" :
    //     endpoint = this.urlLink.endpoint.newsletter;
    //     break;
    //   case "contact" :
    //     endpoint = this.urlLink.endpoint.contact;
    //     break;
    //   case "users" :
    //     endpoint = this.urlLink.endpoint.users;
    //     break;
    // }
    const accessToken = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
    return this.urlLink.base + endpoint + ".json" + "?auth=" + accessToken;
  }

  getData(endpoint: string){
    endpoint = this.createCompleteUrl(endpoint);
    return this.http.get(endpoint);
  }

  postData(endpoint: string, formData: {name: string, email: string, dateSubmitted?: Date} ){
    endpoint = this.createCompleteUrl(endpoint);
    return this.http.post(endpoint, formData);
  }

}