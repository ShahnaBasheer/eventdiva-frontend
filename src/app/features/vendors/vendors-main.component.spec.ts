import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsMainComponent } from './vendors-main.component';

describe('VendorsMainComponent', () => {
  let component: VendorsMainComponent;
  let fixture: ComponentFixture<VendorsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
