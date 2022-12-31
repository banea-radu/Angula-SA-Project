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
    formData.dateSubmitted = new Date();
    return this.http.post(this.urlLink + "contactForm.json", formData);
  }
}