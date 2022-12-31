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
      imgAlt : "Claudia Bînţă",
      text :
        `
        Eu sunt Claudia și sunt îndrăgostită de tenisul de masă de la vârsta de 7 ani.
        <br><br>
        Am practicat tenisul de masă de performanță până la vârsta de 17 ani. Am câștigat 
        locul III cu echipa în Superliga României de Senioare, am fost selecționată la lotul 
        național, am câștigat numeroase medalii în țară și în afara țării și am fost pe locul 
        181 în Clasamentul European de Juniori.
        <br><br>
        Am experiență de peste 20 ani în tenis și 
        peste 10 ani în training și coaching pe tenis de masă, pentru diferite categorii și 
        toate vârstele.
        <br><br>
        Cred cu tărie că fiecare dintre noi are un potențial care stă să iasă 
        la suprafață și te invit să-l descoperim prin tenis.
        `
    },
    {
      title : "AREA B52",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/sala_tenis_de_masa_sibiu.jpg?alt=media&token=2e9a122a-d247-48c4-8c03-0cd4be77a530",
      imgAlt : "AREA B52",
      text :
        `
        Sala de tenis de masă a fost amenajată cu podea specială TARAFLEX Gerflor de culoare "FRAMBOISE". 
        <br><br>
        Această podea, utilizată în sălile acreditate pentru organizarea de competiții internaționale, 
        are o grosime de 5 mm și este elastică, fiind gândită special pentru sălile de tenis de masă.
        <br><br>
        Sunt disponibile 5 mese de tenis Cornilleau Competition 740, model aprobat de Federația 
        Internațională de Tenis de Masă ITTF. Culoarea meselor este ,,BLEU’’, iar fiecare masă este 
        delimitată cu despărțitoare Cornilleau.
        <br><br>
        Distanța dintre mese este de 2 metri, ceea ce crește gradul de confort al jucătorului.
        `
    },
  ]

}
