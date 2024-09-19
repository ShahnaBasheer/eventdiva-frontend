import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { CommonService } from '../../../../features/vendors/services/common.service';
import { OtpVerificationComponent } from '../../../../features/customer/components/otp-verification/otp-verification.component';


@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OtpVerificationComponent],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.css'
})


export class EditProfileModalComponent {
  @Input() isOpen: boolean = false;
  @Input() profileInfo: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  showOtpModal: boolean = false;



  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [ Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngOnChanges() {
    if (this.profileInfo) {
      this.editProfileForm.patchValue(this.profileInfo);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.editProfileForm, fieldName);
  }


  closeModal() {
    this.close.emit();
  }

  onSave() {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAsTouched();
      return;
    }

     // Check if the email has been changed
     const newEmail = this.editProfileForm.get('email')?.value;
     const oldEmail = this.profileInfo?.email;

     if(newEmail !== oldEmail){
        // Trigger OTP verification
        this.showOtpModal = true;
        return;
     }

    // Perform the PATCH request to update the profile
    this.commonService.updateProfile(this.editProfileForm.value).subscribe({
      next: (response) => {
        // Handle success
        console.log('Profile updated successfully', response);

        this.closeModal(); // Close the modal after successful update
      },
      error: (error) => {
        // Handle error
        console.error('Error updating profile', error);
      }
    });
  }
}
