import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueFiltersComponent } from './venue-filters.component';

describe('VenueFiltersComponent', () => {
  let component: VenueFiltersComponent;
  let fixture: ComponentFixture<VenueFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
