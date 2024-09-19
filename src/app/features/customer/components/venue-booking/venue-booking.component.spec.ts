import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueBookingComponent } from './venue-booking.component';

describe('VenueBookingComponent', () => {
  let component: VenueBookingComponent;
  let fixture: ComponentFixture<VenueBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenueBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
