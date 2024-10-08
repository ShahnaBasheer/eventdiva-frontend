import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesListComponent } from './venues-list.component';

describe('VenuesListComponent', () => {
  let component: VenuesListComponent;
  let fixture: ComponentFixture<VenuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
