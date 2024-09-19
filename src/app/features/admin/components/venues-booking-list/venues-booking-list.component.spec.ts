import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesBookingListComponent } from './venues-booking-list.component';

describe('VenuesBookingListComponent', () => {
  let component: VenuesBookingListComponent;
  let fixture: ComponentFixture<VenuesBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuesBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuesBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
