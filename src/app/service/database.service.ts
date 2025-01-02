import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DbSubscriptionClient } from '../types/database';
import { Observable } from 'rxjs';
import { SessionsData } from '../component/subscriptions/subscriptions.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  startBaseUrl = 'https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app';
  endBaseUrl = 'json';
  accessToken: string = JSON.parse(localStorage.getItem('user')).stsTokenManager.accessToken;
  userEmail: string = JSON.parse(localStorage.getItem('user')).email;

  constructor(
    private http: HttpClient,
  ) {}

  constructUrl(endpoint: string, id?: string) {
    // let partialUrl = `${this.startBaseUrl}/${endpoint}`;
    // /* 
    //   Check if id was passed to this function.
    //   If yes, it is needed for a patch/delete request and we need to add it to the full path
    // */
    // if (id) {
    //   partialUrl = `${this.startBaseUrl}/${endpoint}/${id}`;
    // }
    // return `${partialUrl}.${this.endBaseUrl}?auth=${this.accessToken}`;
    return `${this.startBaseUrl}/${endpoint}.${this.endBaseUrl}?auth=${this.accessToken}`;
  }

  createUniqueId(originalText: string, descendingTimestamp = false): string {
    let text = originalText.replaceAll(" ", "");
    let timestamp = new Date().getTime();
    if (descendingTimestamp) {
      // Get a new number in a descending order for the database
      timestamp = 9999999999999 - timestamp;
    }    
    return descendingTimestamp ? `${timestamp}_${text}` : `${text}_${timestamp}`;
  }

  getSubscriptionsClients(): Observable<DbSubscriptionClient[]> {
    const completeUrl = this.constructUrl('subscriptions/clients');
    return this.http.get<Record<string, DbSubscriptionClient>>(completeUrl).pipe(
      map((response: Record<string, DbSubscriptionClient>) => {
        // Convert the response object into an array
        return Object.values(response || {});
      })
    );
  }

  addSubscriptionClient(clientName: string) {
    const uniqueId = this.createUniqueId(clientName);
    const completeUrl = this.constructUrl(`subscriptions/clients/${uniqueId}`);
    return this.http.patch(completeUrl, {
      createdBy: this.userEmail,
      dateCreated: new Date(),
      id: uniqueId,
      name: clientName,
    });
  }

  addSubscriptionSessions(sessionsData: SessionsData) {
    const uniqueId = this.createUniqueId(sessionsData.name, true);
    const completeUrl = this.constructUrl(`subscriptions/sessions/`);
    const numberOfSessions = sessionsData.sessionsToAdd;
    const payload: { [key: string]: any } = {};
    
    for (let i = 1; i <= numberOfSessions; i++) {
      // Create unique ID for each session. "padStart" ensures IDs like 01, 02, etc., maintaining consistency
      const id = `${uniqueId}_${i.toString().padStart(2, '0')}`;
      payload[id] = {
        clientId: sessionsData.clientId,
        createdBy: this.userEmail,
        dateCreated: new Date(),
        datePaid: sessionsData.datePaid,
        id: id,
        status: "AVAILABLE",
        subscriptionType: sessionsData.sessionsToAdd,
      };
    }
    
    return this.http.patch(completeUrl, payload);
  }





  





  createCompleteUrl(endpoint: string, id?: string){
    const urlBase: string = "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app";
    let completeUrl: string = '';
    /* check if id was passed to this function, if yes, it is needed for a patch/delete request and we 
    need to add it to the full path */
    if (id) {
      completeUrl = urlBase + endpoint + "/" + id + ".json";
    } else {
      completeUrl = urlBase + endpoint + ".json";
    }
    let accessToken: string = "";
    const localStorageUserData: string | null = localStorage.getItem("user");
    /* check if we have data for the user in the localstorage, if not, the user is not authenticated
      and we don't need to add the access token to the full path for requests */
    if (localStorageUserData !== "null" && localStorageUserData !== null) {
      accessToken = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
      completeUrl = completeUrl + "?auth=" + accessToken;
    }
    return completeUrl;
  }

  getData(endpoint: string){
    const completeUrl = this.createCompleteUrl(endpoint);
    return this.http.get(completeUrl)
      // create new objects with key as id property
      .pipe(map((response: any) => {
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