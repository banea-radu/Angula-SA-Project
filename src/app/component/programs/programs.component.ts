import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable } from "rxjs";
import { DbProgram } from 'src/app/types/db-program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
  programs$: Observable<DbProgram[]>;
  idToDeleteAfterConfirmation: string = '';
  newProgramForm = this.formbuilder.group({
    Day: ['Monday'],
    StartHour: ['07'],
    StartMinute: ['00'],
    EndHour: ['07'],
    EndMinute: ['00'],
    Category: ['Intermediate']
  })
  timeHours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  timeMinutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  constructor(
    public databaseService: DatabaseService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programs$ = this.databaseService.getData('programs');
  }

  saveIdToDeleteAfterConfirmation(id: string) {
    this.idToDeleteAfterConfirmation = id;
  }

  deleteProgram() {
    this.databaseService.deleteData('programs', this.idToDeleteAfterConfirmation)
      .subscribe(() => {
        console.log('program deleted');
        this.getPrograms();
      })
  }
  
  addNewProgram(form: {Day: string, StartHour: string, StartMinute: string, EndHour: string, EndMinute: string, Category: string}) {
    let time:string = form.StartHour + ":" + form.StartMinute + " - " + form.EndHour + ":" + form.EndMinute;
    let body = {
      Day: form.Day,
      Time: time,
      Category: form.Category
    }
    this.databaseService.postData('programs', body)
      .subscribe(() => {
        console.log('new program added');
        this.getPrograms();
      })
  }

}