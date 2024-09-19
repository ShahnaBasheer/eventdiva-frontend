import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueBookingsComponent } from './venue-bookings.component';

describe('VenueBookingsComponent', () => {
  let component: VenueBookingsComponent;
  let fixture: ComponentFixture<VenueBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
