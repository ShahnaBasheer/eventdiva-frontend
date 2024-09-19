import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getError, getLoader } from '../../store/admin.selectors';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import * as AdminActions from '../../store/admin.actions';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})


export class AdminLoginComponent implements OnInit{

  adminLoginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage!: string;


  constructor( private fb: FormBuilder, private store: Store){}
  ngOnInit(): void {
      this.adminLoginForm = this.fb.group({
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

  onSubmit() {
      if (this.adminLoginForm.valid) {
        this.isLoading = true;
        this.store.dispatch(AdminActions.userLogin(this.adminLoginForm.value));
      } else {
        this.adminLoginForm.markAllAsTouched();
      }
  }

  isFieldInvalid(fieldName: string): boolean {
      return isFieldInvalidator(this.adminLoginForm, fieldName);
  }

}
