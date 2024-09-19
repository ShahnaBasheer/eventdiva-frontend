import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { googleSignin, userLogin } from '../../store/customer.actions';
import { Store } from '@ngrx/store';
import { getError, getLoader } from '../../store/customer.selectors';
import { environment } from '../../../../../environments/environment';


declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private store: Store){}

  ngOnInit(): void {
    google.accounts.id.initialize({
        client_id: environment.google_client_id,
        callback: (res: any) => {
            this.handleSignInResponse(res);
        }
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 300
    })

    this.loginForm = this.fb.group({
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
    return isFieldInvalidator(this.loginForm, fieldName);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.store.dispatch(userLogin(this.loginForm.value));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private handleSignInResponse(response: any): void {
      if (response.error) {
        console.error('Google Sign-In Error:', response.error);
      } else if (response.credential) {
          this.store.dispatch(googleSignin({ token: response.credential }));
      } else {
        console.warn('Unknown Google Sign-In Response:', response);
      }
    }
}







