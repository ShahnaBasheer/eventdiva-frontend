import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannersBookingComponent } from './planners-booking.component';

describe('PlannersBookingComponent', () => {
  let component: PlannersBookingComponent;
  let fixture: ComponentFixture<PlannersBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannersBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannersBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
