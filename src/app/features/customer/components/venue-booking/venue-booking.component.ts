import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingAddressComponent } from '../../../../shared/components/customer/booking-address/booking-address.component';
import { venueService } from '../../services/venue.service';
import { atLeastOneSelected, eventDateValidator, isFieldInvalid } from '../../../../core/validators/forms.validator';
import { IVenue } from '../../../../core/models/venue.model';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from '../../../../core/services/common.service';


declare var Razorpay: any;

@Component({
  selector: 'app-venue-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingAddressComponent,
    LoaderComponent
  ],
  templateUrl: './venue-booking.component.html',
  styleUrl: './venue-booking.component.css'
})


export class VenueBookingComponent implements OnInit{
  @Input({required: true}) slug: string = '';
  venueBookingForm!: FormGroup;
  venueData!: IVenue;
  isLoading: boolean = true;
  activeTab: number = 0;
  isSubmitForm = false;
  imgUrl: string = '';
  eventTypes = this.commonservice.getEventTypes();
  servicesOptions: string[] = [];
  servicesHalfLength = this.servicesOptions.length;

  tabs: string[] = ['Event', 'Address', 'Services', 'Confirm'];

  constructor(
    private fb: FormBuilder,
    private venueService: venueService,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private router: Router,
   ) {
    this.venueBookingForm = this.fb.group({
      eventInfo: this.fb.group({
          eventType: ['',[Validators.min(3), Validators.required]],
          eventName: ['', Validators.required],
          rooms: [null, [Validators.min(1), Validators.pattern('^[0-9]+$')]],
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
      servicesInfo: this.fb.group({
          servicesRequested: this.fb.array([], [Validators.required, atLeastOneSelected]),
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
    this.venueService.getVenueBookingPage(this.slug).subscribe({
      next: (res) => {
          this.venueData = res?.data?.venueData;
          this.imgUrl = `${environment.baseUrl}${environment.vv_coverpic_url}${this.venueData.coverPic}`;
          this.servicesOptions = res?.data?.venueData?.services;
          this.servicesOptions.forEach((value) => {
            const control = this.fb.control({name: value, selected: false});
            (this.venueBookingForm.get('servicesInfo.servicesRequested') as FormArray).push(control);
          });
          this.servicesHalfLength = Math.ceil(this.servicesOptions.length / 2);
          this.isLoading = false;
      },
      error: (err) => {
          this.isLoading = false;
      }
    })

    this.venueBookingForm.statusChanges.subscribe((status) => {
      if(status === 'VALID'){
          this.isSubmitForm = this.isServicesValid();
      } else {
          this.isSubmitForm = false;
      }
    });
  }

  isServicesValid(): boolean {
    return this.venueBookingForm.get('servicesInfo.servicesRequested')?.value.some(
      (obj: {name: string, selected: boolean})=> obj.selected === true)
  }

  isFieldError(fieldgroup: string, fieldName: string): boolean | undefined{
    if(fieldgroup){
      return isFieldInvalid(this.venueBookingForm, `${fieldgroup}.${fieldName}`);
    }
    return isFieldInvalid(this.venueBookingForm, `${fieldName}`);
  }

  get addressInfoFormGroup(): FormGroup {
    return this.venueBookingForm.get('addressInfo') as FormGroup;
  }

  get serviceControls(): {name: string, selected: boolean}[] {
    return (this.venueBookingForm.get('servicesInfo.servicesRequested') as FormArray).value;
  }


  onCheckboxChange(event: Event, index: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    let arr = this.venueBookingForm.get('servicesInfo.servicesRequested') as FormArray;
    const control = arr?.at(index) as FormGroup;
    control.patchValue({  name: control.value.name, selected: isChecked });
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
      this.activeTab++;
    } else {
      const controls = this.venueBookingForm.controls;
      if(this.activeTab === 0){
          controls['eventInfo']?.markAllAsTouched();
      } else if(this.activeTab === 1){
          controls['addressInfo']?.markAllAsTouched();
      } else if(this.activeTab === 2){
          controls['servicesInfo']?.markAllAsTouched();
      }
    }
  }

  canProceed(): boolean {
    const controls = this.venueBookingForm.controls;

    if (this.activeTab === 0) {
      //controls['venueInfo'].valid
      return controls['eventInfo'].valid;
    } else if (this.activeTab === 1) {
      //controls['eventInfo'].valid && controls['addressInfo'].valid
      return controls['eventInfo'].valid && controls['addressInfo'].valid;
    } else if (this.activeTab === 2) {
      //controls['eventInfo'].valid && controls['addressInfo'].valid && controls['servicesInfo'].valid
      return this.isSubmitForm;
    }

    return false;
  }


  onSubmit(): void {
    const controls = this.venueBookingForm.controls;

    if (this.venueBookingForm.valid && this.isSubmitForm) {
      const eventInfo = controls['eventInfo']?.value;
      const servicesInfo = controls['servicesInfo']?.value;
      const addressInfo = controls['addressInfo']?.value;

      // Extract and filter selected services
      const selectedServices: string[] = servicesInfo.servicesRequested
        .filter((service: { name: string, selected: boolean }) => service.selected)
        .map((service: { name: string, selected: boolean }) => service.name);

      // Create FormData object
      const formData = new FormData();
      formData.append('eventInfo', JSON.stringify(eventInfo));
      formData.append('servicesInfo', JSON.stringify(servicesInfo));
      formData.append('addressInfo', JSON.stringify(addressInfo));
      formData.append('servicesRequested', JSON.stringify(selectedServices));

      this.venueService.submitVenueBookingForm(formData, this.slug).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            console.log(res, "ok")
            let options = {
                key: 'rzp_test_FmNCCXUWBBloc6',
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Test Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.venueService.confirmRazorpayPayment(response).subscribe({
                     next: (res)=> {
                       if(res.data?.bookedData){
                          this.activeTab++;
                          this.router.navigate(['/vendors/venues'], { replaceUrl: true });
                       }
                     },
                     error: (err) => {
                        this.toastr.error(err.message, 'Error');
                     }
                  })
                },

            };
            let rzp = new Razorpay(options);
            (rzp as any).open();
        } else {
          this.toastr.error('Failed to create payment order. Please try again.', 'Error');
        }
        },
        error: (err: any) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message, 'Error');
          } else if (err.status === 400) {
            this.toastr.error(err.message, 'Error');
          } else {
            this.toastr.error("Error booking the venue. Please try again.", 'Error');
          }
        }
      });
    } else {
      this.venueBookingForm.markAllAsTouched();
    }
  }


}
