import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhd4ZbhOGpD-krJFr50OC88-0k_HcSiYM",
  authDomain: "sa-project-11a2c.firebaseapp.com",
  databaseURL: "https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sa-project-11a2c",
  storageBucket: "sa-project-11a2c.appspot.com",
  messagingSenderId: "855417364531",
  appId: "1:855417364531:web:1cdbcbeb5ff213bd5f0346",
  measurementId: "G-P2Q047H3K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  urlLink:string  = 'https://sa-project-11a2c-default-rtdb.europe-west1.firebasedatabase.app/program.json';

  constructor(private http: HttpClient) {}

  getPrograms(){
    return this.http.get(this.urlLink);
  }

  postPrograms(){
    return this.http.post(this.urlLink, "test");
    console.log("post fired");
  }
}
