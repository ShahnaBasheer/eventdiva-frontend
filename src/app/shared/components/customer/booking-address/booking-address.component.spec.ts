import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAddressComponent } from './booking-address.component';

describe('BookingAddressComponent', () => {
  let component: BookingAddressComponent;
  let fixture: ComponentFixture<BookingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
