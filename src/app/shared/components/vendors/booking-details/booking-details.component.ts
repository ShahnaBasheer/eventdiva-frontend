import { Component, HostListener, Input, OnInit } from '@angular/core';
import { VenueBookingService } from '../../../../features/vendors/venue-vendor/services/venue-booking.service';
import { IVenueBooking } from '../../../../core/models/IvenueBooking.model';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from '../../../../core/pipes/cutom-date.pipe';
import { CurrencyFormat } from '../../../../core/pipes/currency-format.pipe';
import { DateCalendarComponent } from '../../common/date-calendar/date-calendar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [ CommonModule, CustomDatePipe, CurrencyFormat, DateCalendarComponent, ReactiveFormsModule ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})


export class VenueBookingDetailsComponent implements OnInit{
  @Input({ required: true }) bookingId!: string;
  item!: IVenueBooking;
  addSummaryModal: boolean = false;
  generateAdvanceModal: boolean = false;
  statusDropdown: boolean = false;
  advancePaymentForm!: FormGroup;
  status = ['confirmed', 'cancelled', 'completed'];

  constructor(
    private venueBookingService: VenueBookingService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
      this.advancePaymentForm = this.fb.group({
        "advancePayment": ['', [Validators.required, Validators.min(100), Validators.pattern('^[0-9]+$')]],
        "bookingId": [this.bookingId, Validators.required]
      });

      this.venueBookingService.getVenueBookingDetail(this.bookingId).subscribe({
        next: (res) => {
            this.item = res?.data?.bookingData;

        },
        error: (err: any) => {
           console.log(err)
        }
      })
  }

  onDisplayAddSummary(){
      this.addSummaryModal = true;
  }

  onCancelAddSummary(){
    this.addSummaryModal = false;
  }

  onDisplayAdvancePayment(){
    this.generateAdvanceModal = true;
    console.log("clicked")
  }

  onCancelAdvancePayment(){
    this.generateAdvanceModal = false;
  }

  onShowStatusDropdown(){
    this.statusDropdown = !this.statusDropdown;
  }


  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.advancePaymentForm, fieldName);
  }

  onChangeStatus(status: string){
      this.venueBookingService.statusChange(this.bookingId, status).subscribe({
        next: (res) => {
            this.item = res?.data?.bookingData;
            if(status === "confirmed"){
             this.toastr.success("Booking has been Confirmed!", 'success')
            }
        },
        error: (err) => {
          if(err.status == 400) {
            this.toastr.error(err?.error?.message, 'error');
          } else {
            this.toastr.error("Status changing has been failed! Try Later!", 'error');
          }
        }
      });
  }

  onSendAdvancePaymentSubmit(): void {
    if (this.advancePaymentForm.valid) {
      console.log(this.advancePaymentForm.valid);
      this.venueBookingService.sendAdvancePayment(this.advancePaymentForm.value).subscribe({
        next: (res) => {
          this.item = res?.data?.bookingData;
          this.generateAdvanceModal = false;
          this.toastr.success("Successfully Generated Advance Payment!", 'success');
        },
        error: (err) => {
            this.toastr.error("Status changing has been failed! Try Later!", 'error');
        }
      })
    }else {
      this.advancePaymentForm.markAllAsTouched();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('#status-container') && !target.closest('#statusDropdown-btn')) {
      this.statusDropdown = false;
    }
  }

}
