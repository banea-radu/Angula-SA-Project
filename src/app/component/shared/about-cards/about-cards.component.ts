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
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/claudia_binta_background.jpg?alt=media&token=6e041694-12c9-42df-93d0-37471130fe72",
      imgSrc2 : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/claudia_binta_no_background.png?alt=media&token=cb4e156f-5874-4c6e-8a41-2f1cc705fca1",
      imgAlt : "Claudia Bînţă"
    },
    {
      title : "AREA B52",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/sala_tenis_de_masa_sibiu.jpg?alt=media&token=2e9a122a-d247-48c4-8c03-0cd4be77a530",
      imgAlt : "AREA B52"
    },
  ]

}
