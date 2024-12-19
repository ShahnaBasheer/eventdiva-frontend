import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Vendor } from '../../../../core/models/vendor.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditProfileModalComponent } from '../../../../shared/components/common/edit-profile-modal/edit-profile-modal.component';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { ToastrAlertService } from '../../../../core/services/toastr.service';


@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    EditProfileModalComponent, FormsModule ],
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})


export class VendorProfileComponent implements OnInit {
  showChangePassword = false;
  changePasswordForm!: FormGroup;
  profileInfo!: Vendor;
  showEditProfileModal: boolean = false;
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  isEditing: boolean = false;
  showOtpModal = false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrAlertService
  ) {}

  ngOnInit(): void {
    const routePath = this.router.url;
    this.loadProfilePage(routePath);

    // Initialize the reactive form
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      // Custom validator to match new password and confirm password
      validators: this.passwordsMatchValidator
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Initialize the OTP form
    this.otpForm = this.fb.group({
      otpOld: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      otpNew: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

 loadProfilePage(url: string): void {
    this.commonService.getProfilePage().subscribe({
      next: (response) => {
        this.profileInfo = response.data.vendorDetail;
        this.emailForm.patchValue({
          email: this.profileInfo.email
        });

      },
      error: (error) => {
        console.error('Error loading profile page:', error);
      }
    });
  }


  isFieldInvalid(fieldgroup: FormGroup, fieldName: string): boolean {
    return isFieldInvalidator(fieldgroup, fieldName);
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

  onEmailChange() {
    this.isEditing = true;
  }

   // When "Save" button is clicked
  saveEmail() {
    console.log(this.emailForm.get('email')?.value);
    const newEmail = this.emailForm.get('email')?.value;

    if(!this.emailForm.valid){
      this.emailForm.markAllAsTouched();
      return;
    }

    if (newEmail !== this.profileInfo.email && this.emailForm.valid) {
      this.commonService.sendOtpForEmail(newEmail).subscribe({
        next: (res) => {
            console.log(res, "response");
            this.toastr.success('OTP has been sent Succesfully!');
            this.otpForm.patchValue({
              email: newEmail
            });
            this.showOtpModal = true;
        },
        error: (err) => {
            console.log(err.error.message, "error in sending OTP");
            this.toastr.error(err.error.message);
        }
      });


    } else {
      this.isEditing = false;
    }
  }

  // When "Cancel" button is clicked
  cancelEdit() {
    this.isEditing = false;
  }

  // Close the OTP modal
  closeOtpModal() {
    this.showOtpModal = false;
  }

  // OTP verification logic (this should integrate with backend API)
  verifyOtp() {
    if (this.otpForm.valid) {
      this.commonService.verifyOTPForEmail(this.otpForm.value).subscribe({
        next: (res) => {
          console.log(res,"jbfhdfjjb");
          this.profileInfo = res.data.vendorDetail;
          this.isEditing = false;
          this.showOtpModal = false;
          this.toastr.success("Email has been successfully changed!");
        },
        error: (err) => {
          console.log(err.error.message,'Error in verify OTP');
          this.toastr.error(err.error.message);
        }
      })
    } else {
      // Handle error if OTP fields are empty or invalid
      this.otpForm.markAllAsTouched();
    }
  }

  toggleChangePassword(){
     this.showChangePassword = !this.showChangePassword;
  }

  onSubmitPassword(){
    if(this.changePasswordForm.valid){
        this.commonService.passwordChange(this.changePasswordForm.value).subscribe({
          next: (res) => {
            this.toastr.success("Password has been Successfully Changed");
            this.showChangePassword = false;
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.error.message);
          }
        })
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  onEditedProfile(data: Vendor){
    this.profileInfo = data;
  }

}
