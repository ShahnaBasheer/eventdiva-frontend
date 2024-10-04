import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerFiltersComponent } from './planner-filters.component';

describe('PlannerFiltersComponent', () => {
  let component: PlannerFiltersComponent;
  let fixture: ComponentFixture<PlannerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
