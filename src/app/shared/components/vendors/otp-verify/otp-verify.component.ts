import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorAuthService } from '../../../../features/vendors/services/vendor-auth.service';
import { Router } from '@angular/router';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './otp-verify.component.html',
  styleUrl: './otp-verify.component.css'
})


export class OtpVerifyComponent {
  email: string = '';
  otpVerificationForm!: FormGroup;
  countdownIntervalId!: ReturnType<typeof setInterval>;
  countdown!: string;
  isLoading: boolean = false;
  isEnabled: boolean = true;
  isTimerEnabled: boolean = true;
  resendOtpCount: number = 3;

  constructor(
    private router: Router,
    private vendorService: VendorAuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    console.log("heyyyy 39")
      this.vendorService.email$.subscribe(email => {
        this.email = email ;
        this.startCountdown();
      });

      this.otpVerificationForm = this.fb.group({
        "otp": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      });
  }

  isFieldInvalid(fieldName: string): boolean {
      return isFieldInvalidator(this.otpVerificationForm, fieldName);
  }

  onSubmit(){
      if (this.otpVerificationForm.valid) {
        this.isLoading = true;
        this.isEnabled = false;
        this.vendorService.verifyOTP(this.email, this.otpVerificationForm.value.otp).subscribe({
          next: (response) => {
            this.toastr.success('Signed Up successfully!');
            console.log("otp verification 60")
            this.router.navigate(['/vendor/login']);
          },
          error: (error) => {
            this.isLoading = false;
            this.isEnabled = true;
            this.toastr.error("An error occurred during OTP verification");
          },
          complete: () => {
            this.isLoading = false;
            this.isEnabled = true;
          },
        });
      } else {
          this.otpVerificationForm.markAllAsTouched();
      }
  }

  startCountdown(): void {
      let totalSeconds = 120; // 2 minutes
      this.countdownIntervalId = setInterval(() => {
          totalSeconds--;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          this.countdown = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          if (totalSeconds <= 0) {
            clearInterval(this.countdownIntervalId);
            this.countdown = '00:00';
          }
      }, 1000);
  }

  onResendOTP(): void {
      this.isTimerEnabled = false;
      this.vendorService.resendOTP(this.email).subscribe({
        next: (response) => {
          this.resendOtpCount = parseInt(response?.data?.remainingLimit);
          clearInterval(this.countdownIntervalId)
          this.isTimerEnabled = true;
          this.startCountdown();
          if(response){
            this.toastr.success('Resend OTP successfully!');
          }
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastr.warning('You have already signed up. Please log in!');
            this.router.navigate(['/vendors/login']);
          } else {
            console.log(error,"errors from signupcomponent")
            this.toastr.error(error.error?.message || 'An error occurred during registration')

          }
        }
      })
  }
}
