import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsDataComponent } from './programs-data.component';

describe('ProgramsDataComponent', () => {
  let component: ProgramsDataComponent;
  let fixture: ComponentFixture<ProgramsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
