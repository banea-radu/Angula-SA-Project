import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-programs-data',
  templateUrl: './programs-data.component.html',
  styleUrls: ['./programs-data.component.css']
})
export class ProgramsDataComponent {
  programs: any;

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.getData('programs').subscribe((response) => {
      this.programs = response;
    })
  }
}
