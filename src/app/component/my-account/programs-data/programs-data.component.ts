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

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getData('programs').subscribe((response) => {
      this.programs = response;
      this.keys = Object.keys(this.programs);
    })
  }

}