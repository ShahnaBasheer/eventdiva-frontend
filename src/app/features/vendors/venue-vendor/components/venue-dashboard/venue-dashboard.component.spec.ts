import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDashboardComponent } from './venue-dashboard.component';

describe('VenueDashboardComponent', () => {
  let component: VenueDashboardComponent;
  let fixture: ComponentFixture<VenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
