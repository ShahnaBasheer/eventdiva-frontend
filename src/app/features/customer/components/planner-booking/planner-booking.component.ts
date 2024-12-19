import { CommonModule } from '@angular/common';
import { Component, Input, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingAddressComponent } from '../../../../shared/components/customer/booking-address/booking-address.component';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { eventDateValidator, isFieldInvalid } from '../../../../core/validators/forms.validator';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { CurrencyFormat } from '../../../../core/pipes/currency-format.pipe';
import { PlannerService } from '../../services/planner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrAlertService } from '../../../../core/services/toastr.service';

declare var Razorpay: any;

@Component({
  selector: 'app-planner-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingAddressComponent,
    LoaderComponent,
    CurrencyFormat
  ],
  templateUrl: './planner-booking.component.html',
  styleUrl: './planner-booking.component.css'
})


export class PlannerBookingComponent {
  @Input({required: true}) slug: string = '';
  plannerBookingForm!: FormGroup;
  plannerData!: IEventPlanner;
  isLoading: boolean = true;
  activeTab: number = 0;
  isSubmitForm = false;
  eventTypes: string[] = [];


  tabs: string[] = ['Event', 'Address', 'Services'];

  constructor(
    private fb: FormBuilder,
    private plannerService: PlannerService,
    private toastr: ToastrAlertService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
   ) {
    this.plannerBookingForm = this.fb.group({
      eventInfo: this.fb.group({
          eventType: ['',[Validators.min(3), Validators.required]],
          eventName: ['', Validators.required],
          isMultipleDays: [false, Validators.required],
          guests: [null, [Validators.required, Validators.min(20), Validators.pattern('^[0-9]+$')]],
          eventDate: this.fb.group({
            startDate: ['', [Validators.required, eventDateValidator]],
            endDate: ['', [Validators.required, eventDateValidator]],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required]
          }),
          email: ['', [Validators.required, Validators.email]],
          mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      }),
      paymentInfo: this.fb.group({
          paymentMode: ['', [Validators.required ]],
          platformCharge: [50],
          additionalNeeds: [''],
      }),
      addressInfo: this.fb.group({
        building: ['', [Validators.required, Validators.minLength(3)]],
        street: [null, Validators.minLength(3)],
        city: ['', [Validators.required, Validators.minLength(3)]],
        town: [null, Validators.minLength(3)],
        district: ['', [Validators.required, Validators.minLength(3)]],
        state: ['', [Validators.required, Validators.minLength(3)]],
        landmark: [null, Validators.minLength(4)],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
     }),
    });
  }

  ngOnInit(): void {
    this.plannerService.getPlannerBookingPage(this.slug).subscribe({
      next: (res) => {
          this.plannerData = res?.data?.plannerData;
          this.eventTypes = res?.data?.plannerData?.services;
          this.isLoading = false;
      },
      error: (err) => {
          this.isLoading = false;
          this.toastr.error('Something went wrong in loading page! Try again Later!');
      },
      complete: () => {
          this.isLoading = false;
      }
    })

    this.plannerBookingForm.get('eventInfo.isMultipleDays')?.valueChanges.subscribe(() => {
      console.log('it is triggering')
      this.plannerBookingForm.get('eventInfo.eventDate.endDate')?.updateValueAndValidity();
    });
  }

  isFieldError(fieldgroup: string, fieldName: string): boolean | undefined{
    if(fieldgroup){
      return isFieldInvalid(this.plannerBookingForm, `${fieldgroup}.${fieldName}`);
    }
    return isFieldInvalid(this.plannerBookingForm, `${fieldName}`);
  }

  get addressInfoFormGroup(): FormGroup {
    return this.plannerBookingForm.get('addressInfo') as FormGroup;
  }


  setActiveTab(index: number) {
    if (index < this.activeTab) {
      this.activeTab = index;
    } else if (this.canProceed()) {
      this.activeTab = index;
    }
  }

  prevTab() {
    if (this.activeTab > 0) {
      this.activeTab--;
    }
  }

  nextTab() {
    if (this.canProceed()) {
      if(this.activeTab === 0){

        this.plannerService.checkAvailability(this.plannerBookingForm.get('eventInfo.eventDate')?.value, this.plannerData.vendorId).subscribe({
          next: (res) => {
              if(res.data.isAvailable){
                this.activeTab++;

              } else {
                this.snackBar.open('Slot is Available!', 'OK', {
                  duration: 2000,
                  panelClass: ['mat-mdc-snackbar-surface', 'snackbar-warning'],
                });
              }
          },
          error: (err) => {
            if(err.status !== 400){
              this.snackBar.open('Slot is Unvailable!', 'OK', {
                duration: 2000,
                panelClass: ['mat-mdc-snackbar-surface', 'snackbar-warning'],
              });
            } else {
              this.toastr.error(err.error.message)
            }
          }
        })
      } else {
        this.activeTab++;
      }

    } else {
      const controls = this.plannerBookingForm.controls;
      if(this.activeTab === 0){
          controls['eventInfo']?.markAllAsTouched();
      } else if(this.activeTab === 1){
          controls['addressInfo']?.markAllAsTouched();
      } else if(this.activeTab === 2){
          controls['paymentInfo']?.markAllAsTouched();
      }
    }
  }

  canProceed(): boolean {
    const controls = this.plannerBookingForm.controls;

    if (this.activeTab === 0) {
      //controls['venueInfo'].valid
      return controls['eventInfo'].valid;
    } else if (this.activeTab === 1) {
      //controls['eventInfo'].valid && controls['addressInfo'].valid
      return controls['eventInfo'].valid && controls['addressInfo'].valid;
    } else if (this.activeTab === 2) {
      this.isSubmitForm = controls['eventInfo'].valid && controls['addressInfo'].valid && controls['paymentInfo'].valid
      return this.isSubmitForm;
    }

    return false;
  }


  onSubmit(): void {
    if (this.plannerBookingForm.valid) {

      this.plannerService.submitPlannerBookingForm(this.plannerBookingForm.value, this.slug).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            let options = {
                key: environment.razor_key,
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Test Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.ngZone.run(() => {
                    this.plannerService.confirmRazorpayPayment(response).subscribe({
                      next: (res)=> {
                        if(res.data?.bookedData){
                           this.activeTab++;
                           this.router.navigate(['/bookings'], { replaceUrl: true });
                           this.toastr.success('Booking is Successfull!');
                        }
                      },
                      error: (err) => {
                         this.toastr.error(err.message, 'Error');
                      }
                   })
                  })
                },
            };
            let rzp = new Razorpay(options);
            (rzp as any).open();
        } else {
          this.toastr.error('Failed to create payment order. Please try again.');
        }
        },
        error: (err: any) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message);
          } else if (err.status === 400) {
            this.toastr.error(err.message);
          } else {
            this.toastr.error("Error booking the planner. Please try again.");
          }
        }
      });
    } else {
      this.plannerBookingForm.markAllAsTouched();
    }
  }

}
