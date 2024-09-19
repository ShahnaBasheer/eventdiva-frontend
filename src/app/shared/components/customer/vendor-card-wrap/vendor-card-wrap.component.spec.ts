import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCardWrapComponent } from './vendor-card-wrap.component';

describe('VendorCardWrapComponent', () => {
  let component: VendorCardWrapComponent;
  let fixture: ComponentFixture<VendorCardWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCardWrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCardWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
