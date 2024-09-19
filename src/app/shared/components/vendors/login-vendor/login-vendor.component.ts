import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { CommonModule } from '@angular/common';
import { getError, getLoader } from '../../../../features/vendors/store/vendor.selectors';
import { vendorLogin } from '../../../../features/vendors/store/vendor.actions';




@Component({
  selector: 'app-login-vendor',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-vendor.component.html',
  styleUrl: './login-vendor.component.css'
})


export class LoginVendorComponent {

  vendorLoginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private store: Store){}

  ngOnInit(): void {
    this.vendorLoginForm = this.fb.group({
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(6)]],
    });

    this.store.select(getLoader).subscribe(loading => {
      this.isLoading = loading;
    })

    this.store.select(getError).subscribe((error: any) => {
      this.errorMessage = error?.message;
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.vendorLoginForm, fieldName);
  }

  onSubmit(): void {
    if (this.vendorLoginForm.valid) {
      this.isLoading = true;
      this.store.dispatch(vendorLogin(this.vendorLoginForm.value));
    } else {
      this.vendorLoginForm.markAllAsTouched();
    }
  }

}
