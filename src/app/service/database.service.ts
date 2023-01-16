import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) {}

  createCompleteUrl(endpoint: string, id?: string){
    const urlBase: string = "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/";
    let completeUrl: string = '';
    if (id) {
      completeUrl = urlBase + endpoint + "/" + id + ".json";
    } else {
      completeUrl = urlBase + endpoint + ".json";
    }
    let accessToken: string = "";
    const localStorageUserData: string | null = localStorage.getItem("user");
    if (localStorageUserData !== "null" && localStorageUserData !== null) {
      accessToken = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
      completeUrl = completeUrl + "?auth=" + accessToken;
    }
    return completeUrl;
  }

  // getData(endpoint: string){
  //   const completeUrl = this.createCompleteUrl(endpoint);
  //   return this.http.get(completeUrl);
  // }

  getData(endpoint: string){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.get(completeUrl)
      .pipe(map((response: any) => { // create new objects with key as id property
        const newObjects = [];
        for(const key in response) {
          newObjects.push({...response[key], id: key});
        }
        return newObjects;
      }));
  }

  patchData(endpoint: string, bodyData: any, id: string){
    const completeUrl = this.createCompleteUrl(endpoint, id);
    return this.http.patch(completeUrl, bodyData);
  }

  postData(endpoint: string, bodyData: any){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.post(completeUrl, bodyData);
  }

  deleteData(endpoint: string, id: string){
    const completeUrl = this.createCompleteUrl(endpoint, id);
    return this.http.delete(completeUrl);
  }
}