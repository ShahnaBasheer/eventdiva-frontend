import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerDetailComponent } from './event-planner-detail.component';

describe('EventPlannerDetailComponent', () => {
  let component: EventPlannerDetailComponent;
  let fixture: ComponentFixture<EventPlannerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlannerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
