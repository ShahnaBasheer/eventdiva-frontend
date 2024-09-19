import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Vendor } from '../../../../core/models/vendor.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditProfileModalComponent } from '../../../../shared/components/common/edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditProfileModalComponent],
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})


export class VendorProfileComponent implements OnInit {
  showChangePassword = false;
  changePasswordForm!: FormGroup;
  profileInfo!: Vendor;
  showEditProfileModal: boolean = false;
  emailForm!: FormGroup;
  isEditingEmail = false;
  showOtpModal = false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const routePath = this.router.url;
    this.loadProfilePage(routePath);

    // Initialize the reactive form
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, {
      // Custom validator to match new password and confirm password
      validators: this.passwordsMatchValidator
    });


    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadProfilePage(url: string): void {
    this.commonService.getProfilePage().subscribe({
      next: (response) => {
        this.profileInfo = response.data.vendorDetail;
      },
      error: (error) => {
        console.error('Error loading profile page:', error);
      }
    });
  }

  // Toggle the visibility of the change password form
  toggleChangePassword(): void {
    this.showChangePassword = !this.showChangePassword;
  }

  // Handle the form submission
  onSubmitChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword } = this.changePasswordForm.value;

    // Handle password change logic here
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    // Add your password change logic here
  }

  // Custom validator to check if new password and confirm new password match
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword && confirmNewPassword && newPassword !== confirmNewPassword
      ? { passwordsMismatch: true }
      : null;
  }

  // Placeholder for forgot password action
  forgotPassword(): void {
    // Handle forgot password action here
    console.log('Forgot Password clicked');
  }

  // Toggle the visibility of the edit profile modal
  toggleEditProfileModal() {
    this.showEditProfileModal = !this.showEditProfileModal;
  }

  // Handle save profile details
  onSaveProfile(updatedProfile: any) {
    console.log('Updated Profile:', updatedProfile);
    this.toggleEditProfileModal();
  }

  cancelEdit() {
    this.isEditingEmail = false;
    this.emailForm.patchValue({ email: this.profileInfo.email });
  }

  onEmailChange() {
    this.isEditingEmail = true;
  }

  saveEmail() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    // Show OTP modal
    this.showOtpModal = true;
  }

}
