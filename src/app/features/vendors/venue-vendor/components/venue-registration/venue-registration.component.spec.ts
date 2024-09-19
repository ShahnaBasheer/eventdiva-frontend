import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueRegistrationComponent } from './venue-registration.component';

describe('VenueRegistrationComponent', () => {
  let component: VenueRegistrationComponent;
  let fixture: ComponentFixture<VenueRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
