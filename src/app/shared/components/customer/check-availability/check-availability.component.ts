import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { venueService } from '../../../../features/customer/services/venue.service';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { checkEndDateValidator, isFieldInvalid } from '../../../../core/validators/forms.validator';
import { PlannerService } from '../../../../features/customer/services/planner.service';
import { isLoggedIn } from '../../../../features/customer/store/customer.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-check-availability',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './check-availability.component.html',
  styleUrl: './check-availability.component.css'
})


export class CheckAvailabilityComponent implements OnInit{
  @Output() availabilityChecked = new EventEmitter<boolean>();
  checkAvailabilityForm!: FormGroup;
  isCheckingLoding = false;
  isLoggedIn: boolean = false;
  @Input({required: true}) vendorId: string = '';
  @Input({required: true}) role: string = '';


  constructor(
    private venueService: venueService,
    private fb: FormBuilder,
    private toastr: ToastrAlertService,
    private plannerService: PlannerService,
    private store: Store,
    private router: Router
  ){

    this.checkAvailabilityForm = this.fb.group({
        isMultipleDays: [false, Validators.required],
        startDate: ['', [Validators.required]],
        endDate: ['', [checkEndDateValidator]],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
    })

  }

  ngOnInit(): void{
      this.store.select(isLoggedIn).subscribe(data => this.isLoggedIn = data)
      this.checkAvailabilityForm.get('isMultipleDays')?.valueChanges.subscribe((isMultipleDays) => {
        const endDateControl = this.checkAvailabilityForm.get('endDate');

        if (!isMultipleDays) {
          endDateControl?.removeValidators(Validators.required);
          endDateControl?.disable();
        } else {
          endDateControl?.addValidators(Validators.required);
          endDateControl?.enable();
        }
    });
  }

  isFieldError(fieldName: string): boolean | undefined{
    return isFieldInvalid(this.checkAvailabilityForm, `${fieldName}`);
  }

  onCheckAvailability(){
      console.log(this.checkAvailabilityForm.valid)
      if(!this.isLoggedIn){
          this.router.navigate(['/login']);
          this.toastr.info('Please Login to Check Availability');
          return;
      }
      if(this.checkAvailabilityForm.valid){
          this.isCheckingLoding = true;

          if(this.role === environment.event_planner){
              this.plannerService.checkAvailability(this.checkAvailabilityForm.value,this.vendorId).subscribe({
                next: (res) => {
                    this.isAvailable(res.data?.isAvailable);
                },
                error: (err) => {
                  this.isCheckingLoding = false;
                  if(err.status !== 400){
                    this.toastr.error('Failed to check availability. Please try again later.')
                  } else {
                    this.toastr.error(err.error.message)
                  }
                }
              })
          } else if(this.role === environment.venue_vendor){
              this.venueService.checkAvailability(this.checkAvailabilityForm.value,this.vendorId).subscribe({
                next: (res) => {
                    this.isAvailable(res.data?.isAvailable);
                },
                error: (err) => {
                    this.isCheckingLoding = false;
                    if(err.status !== 400){
                      this.toastr.error('Failed to check availability. Please try again later.')
                    } else {
                      this.toastr.error(err.error.message)
                    }

                }
              })
          }

      } else {
        this.checkAvailabilityForm.markAllAsTouched();
      }
  }

  private isAvailable(isAvailable: boolean){
    if(isAvailable){
      this.toastr.success('Slot is Available! You can proceed to book')
    } else {
        this.toastr.warning('Slot is Unavailable!')
    }
    this.isCheckingLoding = false;
    this.availabilityChecked.emit(isAvailable);
  }
}


// guests: [null, [Validators.required, Validators.min(20), Validators.pattern('^[0-9]+$')]],
