import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { TranslateService } from '@ngx-translate/core';


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
    private firebaseService: FirebaseService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.translate.onLangChange.subscribe((event: any) => {
      this.programsData = ''; // clear old data before translating again
      this.firebaseService.getData('programs').subscribe((response) => {
        for (let item of Object.values(response)) { // observable returns object of objects, Object.values = individual object
          let dayToTranslate: string = '';
          let categoryToTranslate: string = '';
          this.translate.get('Home.Card-3.Programs.' + item.Day).subscribe((res: string) => {
            dayToTranslate = res;
          })
          this.translate.get('Home.Card-3.Programs.' + item.Category).subscribe((res: string) => {
            categoryToTranslate = res;
          })
          this.programsData = this.programsData
            + "🏓"
            + " "
            + dayToTranslate
            + " "
            + item.Time
            + " "
            + categoryToTranslate
            + " "
        }
      })
    })
  }

}

