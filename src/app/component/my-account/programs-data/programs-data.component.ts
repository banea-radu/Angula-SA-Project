import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-programs-data',
  templateUrl: './programs-data.component.html',
  styleUrls: ['./programs-data.component.css']
})
export class ProgramsDataComponent {
  programs: any;
  keys: string[] = [];
  showFormModal: boolean = false;

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('programs').subscribe((response) => {
      this.programs = response;
      this.keys = Object.keys(this.programs);
    })
  }

  toggleFormModal() {
    // if (this.showFormModal) {
    //   this.showFormModal = !this.showFormModal;
    // }
  }

  formSubmit(form: {name: string, email: string, subject: string, message: string, dateSubmitted?: Date}) {
    if (this.contactForm.valid) {
      form.dateSubmitted = new Date();
      this.databaseService.postData('contact', form).subscribe((response) => {
        this.translate.get('Footer.Newsletter.Submit-Alert-Success', {email : form.email}).subscribe((res: string) => {
          alert(res);
        });
        window.location.reload();
      })
    }
  }

}