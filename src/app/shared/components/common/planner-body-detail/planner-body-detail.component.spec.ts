import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerBodyDetailComponent } from './planner-body-detail.component';

describe('PlannerBodyDetailComponent', () => {
  let component: PlannerBodyDetailComponent;
  let fixture: ComponentFixture<PlannerBodyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerBodyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerBodyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
