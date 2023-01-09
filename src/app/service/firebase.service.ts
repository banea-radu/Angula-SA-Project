import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // urlLink = {
  //   base : "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/",
  //   endpoint : {
  //     programs: "programs.json",
  //     newsletter : "newsletter.json",
  //     contact : "contact.json",
  //     users : "users.json"
  //   }
  // }

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
    const urlBase: string = "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/";
    let completeUrl = urlBase + endpoint + ".json";
    let accessToken: string = "";
    const localStorageUserData: string | null = localStorage.getItem('user');
    if(localStorageUserData !== "null" && localStorageUserData !== null) {
      accessToken = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
      completeUrl = completeUrl + "?auth=" + accessToken;
    }
    return completeUrl;
  }

  getData(endpoint: string){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.get(completeUrl);
  }

  postData(endpoint: string, formData: {name: string, email: string, dateSubmitted?: Date} ){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.post(completeUrl, formData);
  }

}