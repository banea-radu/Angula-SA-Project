import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retryWhen, delay, scan } from 'rxjs/operators';
import { DbSubscriptionClient, DbSubscriptionSession, DbSubscriptionSessionStatus } from '../types/database';
import { Observable } from 'rxjs';
import { SessionsData } from '../component/subscriptions/subscriptions.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  startBaseUrl = 'https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app';
  endBaseUrl = 'json';
  localStorageUserData: string | null = localStorage.getItem('user');
  isLocalStorageUserData = this.localStorageUserData !== 'null' && this.localStorageUserData !== null;
  accessToken: string = this.isLocalStorageUserData ? JSON.parse(this.localStorageUserData).stsTokenManager.accessToken: '';
  userEmail: string =  this.isLocalStorageUserData ? JSON.parse( this.localStorageUserData).email : '';

  constructor(
    private http: HttpClient,
  ) {}

  constructUrl(endpoint: string) {
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
      }),
      retryWhen((errors) =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err; // Stop retrying after 3 attempts
            }
            console.warn(`Retrying... Attempt #${retryCount + 1}`);
            return retryCount + 1;
          }, 0),
          delay(1000) // 1 second between retries
        )
      )
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

  editSubscriptionClientName(id: string, name: string) {
    const completeUrl = this.constructUrl(`subscriptions/clients/${id}`);
    return this.http.patch(completeUrl, {
      name,
    });
  }

  deleteSubscriptionClient(id: string) {
    const completeUrl = this.constructUrl(`subscriptions/clients/${id}`);
    return this.http.delete(completeUrl);
  }

  getSubscriptionsData(status: DbSubscriptionSessionStatus): Observable<DbSubscriptionSession[]> {
    const completeUrl = this.constructUrl('subscriptions/sessions');
    return this.http.get<Record<string, DbSubscriptionSession>>(completeUrl, {
      params: {
        orderBy: '"status"',      // Property to filter by (must be indexed)
        equalTo: `"${status}"`    // Value to match, in double quotes to make it a JSON string
      }
    }).pipe(
      map((response: Record<string, DbSubscriptionSession>) => {
        // Convert the response object into an array an keep original order
        return Object.values(response || {}).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
      }),
      retryWhen((errors) =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err; // Stop retrying after 3 attempts
            }
            console.warn(`Retrying... Attempt #${retryCount + 1}`);
            return retryCount + 1;
          }, 0),
          delay(1000) // 1 second between retries
        )
      )
    );
  }

  getClientSubscriptionsData(id: string): Observable<DbSubscriptionSession[]> {
    const completeUrl = this.constructUrl('subscriptions/sessions');
    return this.http.get<Record<string, DbSubscriptionSession>>(completeUrl, {

      // const endDate = new Date();
      // const startDate = new Date();
      // startDate.setMonth(endDate.getMonth() - 2);

      // /* Firebase Realtime Database can only filter by one field per query. 
      //   If you want to filter by clientId and datePaid together, you'll need a composite key or manual filtering. */
      //   params: {
      //   orderBy: '"datePaid"',             // Property to filter by (must be indexed)
      //   startAt: `"${startDate.toISOString()}"`,    // Convert date to ISO string
      //   endAt: `"${endDate.toISOString()}"`,        // Convert date to ISO string
      //   // equalTo: `"${id}"`                          // Value to match, in double quotes to make it a JSON string
      // }

      params: {
        orderBy: '"clientId"',             // Property to filter by (must be indexed)
        equalTo: `"${id}"`                 // Value to match, in double quotes to make it a JSON string
      }
    }).pipe(
      map((response: Record<string, DbSubscriptionSession>) => {
        // Convert the response object into an array an keep original order
        return Object.values(response || {}).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
      })
    );
  }

  addSubscriptionSessions(sessionsData: SessionsData) {
    const uniqueId = this.createUniqueId(sessionsData.name, true);
    const completeUrl = this.constructUrl(`subscriptions/sessions`);
    const numberOfSessions = sessionsData.sessionsToAdd;
    const payload: { [key: string]: DbSubscriptionSession } = {};
    
    for (let i = 1; i <= numberOfSessions; i++) {
      // Create unique ID for each session. "padStart" ensures IDs like 01, 02, etc., maintaining consistency
      const id = `${uniqueId}_${i.toString().padStart(2, '0')}`;
      payload[id] = {
        clientId: sessionsData.clientId,
        createdBy: this.userEmail,
        dateCreated: new Date(),
        datePaid: new Date(sessionsData.datePaid),
        id: id,
        status: "AVAILABLE",
        subscriptionSessionsType: sessionsData.sessionsToAdd,
      };
    }
    
    return this.http.patch(completeUrl, payload);
  }

  setSubscriptionSessionStatus(id: string, status: string) {
    const completeUrl = this.constructUrl(`subscriptions/sessions/${id}`);
    const payload = {
      status,
    };
    return this.http.patch(completeUrl, payload);
  }

  deleteSubscriptionSession(id: string) {
    const completeUrl = this.constructUrl(`subscriptions/sessions/${id}`);
    return this.http.delete(completeUrl);
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