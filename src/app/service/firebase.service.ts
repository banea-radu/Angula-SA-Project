import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private http: HttpClient
  ) {}

  createCompleteUrl(endpoint: string){
    const urlBase: string = "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/";
    let completeUrl = urlBase + endpoint + ".json";
    let accessToken: string = "";
    const localStorageUserData: string | null = localStorage.getItem("user");
    if (localStorageUserData !== "null" && localStorageUserData !== null) {
      accessToken = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
      completeUrl = completeUrl + "?auth=" + accessToken;
    }
    return completeUrl;
  }

  getData(endpoint: string){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.get(completeUrl);
  }

  postData(endpoint: string, bodyData: any){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.post(completeUrl, bodyData);
  }

}