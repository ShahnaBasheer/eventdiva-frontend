import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDetailComponent } from './planner-detail.component';

describe('PlannerDetailComponent', () => {
  let component: PlannerDetailComponent;
  let fixture: ComponentFixture<PlannerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
