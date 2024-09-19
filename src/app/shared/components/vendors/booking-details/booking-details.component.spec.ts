import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueBookingDetailsComponent } from './booking-details.component';

describe('BookingDetailsComponent', () => {
  let component: VenueBookingDetailsComponent;
  let fixture: ComponentFixture<VenueBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueBookingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
