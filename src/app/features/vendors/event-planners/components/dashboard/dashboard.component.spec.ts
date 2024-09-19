import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: EventPlannerDashboardComponent;
  let fixture: ComponentFixture<EventPlannerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlannerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlannerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
