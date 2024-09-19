import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVendorComponent } from './login-vendor.component';

describe('LoginVendorComponent', () => {
  let component: LoginVendorComponent;
  let fixture: ComponentFixture<LoginVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
