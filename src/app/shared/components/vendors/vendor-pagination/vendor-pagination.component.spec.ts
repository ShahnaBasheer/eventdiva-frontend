import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaginationComponent } from './vendor-pagination.component';

describe('VendorPaginationComponent', () => {
  let component: VendorPaginationComponent;
  let fixture: ComponentFixture<VendorPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
