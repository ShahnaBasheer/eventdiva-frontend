import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator, isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { VendorAuthService } from '../../../../features/vendors/services/vendor-auth.service';
import { ToastrAlertService } from '../../../../core/services/toastr.service';

@Component({
  selector: 'app-signup-vendor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup-vendor.component.html',
  styleUrl: './signup-vendor.component.css'
})


export class SignupVendorComponent implements OnInit{

  vendorSignupForm!: FormGroup;
  isLoading: boolean = false;
  isEnabled = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vendorAuthService: VendorAuthService,
    private toastr: ToastrAlertService,
  ){}


  ngOnInit(): void {
    this.vendorSignupForm = this.fb.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "vendorType": ['', Validators.required],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "confirmPassword": ['', [Validators.required, Validators.minLength(6)]],
      }, { validators: confirmPasswordValidator()
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.vendorSignupForm, fieldName);
  }

  isConfirmPasswordMismatch() {
    return (
      this.vendorSignupForm.hasError('confirmPasswordMismatch') &&
      this.vendorSignupForm.controls['confirmPassword']?.touched
    );
  }

  onSubmit() {
    if (this.vendorSignupForm.valid) {
      this.isLoading = true;
      this.isEnabled = false;
      this.vendorAuthService.vendorRegistration(this.vendorSignupForm.value).subscribe({
        next: (res) => {
            this.toastr.success('OTP sent successfully for Signup verification!');
            this.router.navigate(['/vendor/otpverification']);
        },
        error: (error) => {
          this.isLoading = false;
          this.isEnabled = false;
          if (error.status === 409) {
            this.toastr.warning("You have already signed up. Please log in!");
            this.router.navigate(['/vendor/login']);
          } else {
            this.toastr.error("An error occurred during registration");
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  } else {
    this.vendorSignupForm.markAllAsTouched();
  }
  }

}
