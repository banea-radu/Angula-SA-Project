import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
})
export class HomeCardsComponent {
  programsData: string = "";
  cardsData = [
    {
      id: "beneficii",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/beneficii_tenis_de_masa_copii.jpg?alt=media&token=bf633d02-86b3-4585-a2f0-e0c5218de0b7"
    },
    {
      id: "deCeTenis",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/tenis_de_masa_copii.jpg?alt=media&token=c5e2f024-10d9-4058-bd4c-c190ba4a04ed"
    },
    {
      id: "cursuri",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/cursuri_tenis_de_masa_copii_sibiu.jpg?alt=media&token=e3948285-4568-4185-b392-1d54f18cc92b"
    },
  ]

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.firebaseService.getPrograms()
      .subscribe((response) => {
        for (let item of Object.values(response)) { // observable returns object of objects, Object.values = individual object
          this.programsData = this.programsData
            + item.Ziua
            + " "
            + item.Ora
            + " "
            + item.Categoria
            + "; "
        }
      })
  }

}

