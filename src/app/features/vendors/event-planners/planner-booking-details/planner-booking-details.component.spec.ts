import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerBookingDetailsComponent } from './planner-booking-details.component';

describe('PlannerBookingDetailsComponent', () => {
  let component: PlannerBookingDetailsComponent;
  let fixture: ComponentFixture<PlannerBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerBookingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
