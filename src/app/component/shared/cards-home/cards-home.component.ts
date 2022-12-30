import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-home',
  templateUrl: './cards-home.component.html',
  styleUrls: ['./cards-home.component.css']
})
export class CardsHomeComponent {
  cardsData = [
    {
      id: "beneficii",
      title : "Care sunt beneficiile?",
      title2: "",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/beneficii_tenis_de_masa_copii.jpg?alt=media&token=bf633d02-86b3-4585-a2f0-e0c5218de0b7",
      imgAlt : "Beneficii tenis de masa copii",
      text :
        `
        În ultima perioadă am fost întrebată la ce ajută acest sport și cum poate dezvolta el armonios un copil, ”că doar primește o bilă și o paleta copilul și nimerește și el cum poate masa aia”.

        Antrenamentul nostru este mai mult decât atât! Este construit din teme ce îi permit copilului să-și dezvolte reacțiile și coordonarea întregului corp.

        Un alt aspect important pentru noi îl reprezintă încălzirea corpului, adică pregătirea lui pentru efort, un lucru esențial pentru evitarea accidentărilor.
        
        Continuăm cu exerciții pentru atenție și concentrare și ne înarmăm cu multă răbdare și cuvinte de încurajare (copilul trebuie susținut, felicitat pentru fiecare reușită, ceea ce ar trebui să facem cât mai des cu putință).
        
        Antrenamentul se sfârșește doar după ce facem stretching (exerciții pentru flexibilitate, mobilitate și pentru revenirea după efort).
        `
    },
    {
      id: "deCeTenis",
      title : "De ce tenis de masă?",
      title2 : 
        `
        Îți dorești să-ți dai copilul la un sport, însă nu știi ce sport i s-ar potrivi?
        Ai vrea să facă mai multă mișcare și să stea mai puțin cu ochii în calculator?
        Vrei să fie mai sociabil și mai atent și crezi că sportul l-ar ajuta?
        `,
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/tenis_de_masa_copii.jpg?alt=media&token=c5e2f024-10d9-4058-bd4c-c190ba4a04ed",
      imgAlt : "Tenis de masa copii",
      text :
        `
        Motivele pentru care îți dorești să îți îndrumi copilul către sport sunt nenumărate, însă îți voi enumera mai jos și câteva beneficii pe care le poate avea tenisul de masă asupra copilului tău:
        👉 Ajută la dezvoltarea coordonării și a reflexelor, tot corpul fiind în armonie pentru a putea lovi mingea;
        👉 Viteza cu care se desfășoară jocul necesită o concentrare ridicată, iar prin practicarea regulată se pot observa îmbunătățiri ale capacității de concentrare și atenție la școală sau în rutina zilnică;
        👉 Este util pentru întărirea mușchilor și ajută la dezvoltarea echilibrului;
        👉 Este un sport individual care îi va dezvolta copilului autonomia și capacitatea de a lua decizii proprii;
        👉 Vederea este stimulată și dezvoltată;
        👉 Este ideal pentru a socializa și pentru a-și face prieteni noi;
        👉 Există puține situații în care tenisul de masă nu este recomandat și poate constitui un ajutor în ceea ce privește integrarea copiiilor cu dizabilități în societate.
        👉 Este un sport accesibil ca preț, la început nefiind necesară achiziționarea unui echipament, ci doar a unui antrenor și a orele de joc;
        👉 Nu este un sport de contact, iar accidentările sunt rare.
        `
    },
    {
      id: "cursuri",
      title : "Cursuri ",
      title2: "",
      imgSrc : "https://firebasestorage.googleapis.com/v0/b/sa-project-11a2c.appspot.com/o/cursuri_tenis_de_masa_copii_sibiu.jpg?alt=media&token=e3948285-4568-4185-b392-1d54f18cc92b",
      imgAlt : "Cursuri tenis de masa copii sibiu",
      text :
        `
        👉 Cursurile se desfășoară în Sibiu, pe strada August Treboniu Laurean, nr. 2/4 lângă sala de bowling.

        <strong> Abonament Kids tenis de masă (8) - 300 RON </strong>
        👉 Prețul este valabil pentru 8 sedințe / lună, marți şi joi (câte două antrenamente pe săptămână). 
        
        <strong> Abonament Kids tenis de masă (4) - 150 RON  </strong>
        👉 Prețul este valabil pentru 4 sedințe / lună, marți sau joi, o zi la alegere (câte un antrenament pe săptămână).
        
        ❕ Abonamentele sunt valabile pentru copiii cu vârste cuprinse între 8 şi 12 ani. ❕
        
        👉 Pentru detalii și rezervări <span><a href="pages/contact.html" class="text-warning link-success text-decoration-none"> CONTACTEAZĂ-NE </a></span>
        
        <strong> PROGRAMUL ACTUALIZAT AL CURSURILOR: </strong>
        `
    },
  ]
}
