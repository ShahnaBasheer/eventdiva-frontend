import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerAuthService } from '../../services/auth.service';
import { confirmPasswordValidator, isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})


export class SignupComponent {
  registrationForm!: FormGroup;
  isLoading: boolean = false;
  isEnabled = true;

  constructor(
      private fb: FormBuilder,
      private customerAuthService: CustomerAuthService,
      private router: Router,
      private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "confirmPassword": ['', [Validators.required, Validators.minLength(6)]]
      }, { validators: confirmPasswordValidator()
    });
  }

  // Inside your component class
  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.registrationForm, fieldName);
  }

  isConfirmPasswordMismatch() {
    return (
      this.registrationForm.hasError('confirmPasswordMismatch') &&
      this.registrationForm.controls['confirmPassword']?.touched
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
        this.isLoading = true;
        this.isEnabled = false;
        this.customerAuthService.customerRegistration(this.registrationForm.value).subscribe({
          next: (response: any) => {
              this.toastr.success('Verification Code has been sent Successfully!', 'Success');
              this.router.navigate(['/otpverification']);
          },
          error: (error: any) => {
            this.isLoading = false;
            this.isEnabled = false;
            if (error.status === 409) {
              this.toastr.warning('You have already signed up. Please log in!', 'Warning');
              this.router.navigate(['/login']);
            } else {
              this.toastr.error(error.error?.message || "An error occurred during registration", 'Failed')
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}





