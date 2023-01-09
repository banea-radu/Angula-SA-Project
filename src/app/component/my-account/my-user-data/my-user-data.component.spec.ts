import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUserDataComponent } from './my-user-data.component';

describe('MyUserDataComponent', () => {
  let component: MyUserDataComponent;
  let fixture: ComponentFixture<MyUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyUserDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
