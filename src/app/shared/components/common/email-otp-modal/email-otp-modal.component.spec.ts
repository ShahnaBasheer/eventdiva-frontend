import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpModalComponent } from './email-otp-modal.component';

describe('EmailOtpModalComponent', () => {
  let component: EmailOtpModalComponent;
  let fixture: ComponentFixture<EmailOtpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailOtpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailOtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
