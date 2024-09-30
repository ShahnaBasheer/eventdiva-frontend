import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchFiltersComponent } from './filters.component';

describe('BookingSearchFiltersComponent', () => {
  let component: BookingSearchFiltersComponent;
  let fixture: ComponentFixture<BookingSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSearchFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
