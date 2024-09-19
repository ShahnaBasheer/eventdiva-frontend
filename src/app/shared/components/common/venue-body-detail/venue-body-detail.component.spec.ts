import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueBodyDetailComponent } from './venue-body-detail.component';

describe('VenueBodyDetailComponent', () => {
  let component: VenueBodyDetailComponent;
  let fixture: ComponentFixture<VenueBodyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueBodyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueBodyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
