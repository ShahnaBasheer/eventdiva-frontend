import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannersListComponent } from './event-planners-list.component';

describe('EventPlannersListComponent', () => {
  let component: EventPlannersListComponent;
  let fixture: ComponentFixture<EventPlannersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlannersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlannersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
