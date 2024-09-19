import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerBookingComponent } from './planner-booking.component';

describe('PlannerBookingComponent', () => {
  let component: PlannerBookingComponent;
  let fixture: ComponentFixture<PlannerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
