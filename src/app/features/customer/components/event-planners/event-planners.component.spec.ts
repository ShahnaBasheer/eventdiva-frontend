import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventPlannersComponent } from './event-planners.component';

describe('EventPlannersComponent', () => {
  let component: AllEventPlannersComponent;
  let fixture: ComponentFixture<AllEventPlannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEventPlannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEventPlannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
