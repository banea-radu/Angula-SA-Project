import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs";
import { DbProgram } from 'src/app/model/db-program';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
})
export class HomeCardsComponent {
  programs$: Observable<DbProgram[]>;
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
    public databaseService: DatabaseService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    // get programs data as observable from database
    this.programs$ = this.databaseService.getData('programs');
  }

}

