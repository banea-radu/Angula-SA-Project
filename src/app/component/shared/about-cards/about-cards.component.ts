import { Component } from '@angular/core';

@Component({
  selector: 'app-about-cards',
  templateUrl: './about-cards.component.html',
  styleUrls: ['./about-cards.component.css']
})
export class AboutCardsComponent {
  cardsData = [
    {
      title : "Claudia Bînţă",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/claudia_binta.jpg?alt=media&token=66a5c5ee-15d9-41a8-b395-97416613c702",
      imgAlt : "Claudia Bînţă"
    },
    {
      title : "AREA B52",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/sala_tenis_de_masa_sibiu.jpg?alt=media&token=2e9a122a-d247-48c4-8c03-0cd4be77a530",
      imgAlt : "AREA B52"
    },
  ]

}
