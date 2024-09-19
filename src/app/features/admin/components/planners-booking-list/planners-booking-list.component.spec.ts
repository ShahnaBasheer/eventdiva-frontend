import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannersBookingListComponent } from './planners-booking-list.component';

describe('PlannersBookingListComponent', () => {
  let component: PlannersBookingListComponent;
  let fixture: ComponentFixture<PlannersBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannersBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannersBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
