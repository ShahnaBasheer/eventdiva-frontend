import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventCompanyComponent } from './add-event-company.component';

describe('AddEventCompanyComponent', () => {
  let component: AddEventCompanyComponent;
  let fixture: ComponentFixture<AddEventCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
