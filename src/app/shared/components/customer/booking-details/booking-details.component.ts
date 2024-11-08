import { Component, Input, NgZone } from '@angular/core';
import { PlannerService } from '../../../../features/customer/services/planner.service';
import { DateCalendarComponent } from '../../common/date-calendar/date-calendar.component';
import { CommonModule } from '@angular/common';
import { PlannerBooking } from '../../../../core/models/plannerBooking.model';
import { VenueBooking } from '../../../../core/models/venueBooking.model';
import { FormsModule } from '@angular/forms';
import { Payment } from '../../../../core/models/bookingdetails.model';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { venueService } from '../../../../features/customer/services/venue.service';

declare var Razorpay: any;

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})

export class BookingDetailsComponent {
  @Input({required: true}) bookingId: string = '';
  @Input({required: true}) type!: string;
  item: PlannerBooking | VenueBooking | null = null;
  payments: Payment[] = [];
  fullPayment: number = 0;

  constructor(
    private plannerservice: PlannerService,
    private venueservice: venueService,
    private ngZone: NgZone,
    private toastr: ToastrService){}

  ngOnInit(){
    console.log(this.bookingId);
    if(this.type === 'planner'){
      this.plannerservice.bookingDetails(this.bookingId).subscribe({
        next: (res) => {
          this.item = res.data.bookingData as PlannerBooking;
          this.payments = this.item.payments || [];
          this.fullPayment = res.data.fullPayment;
          console.log(this.item)
        }
      })
    } else if(this.type === 'venue'){
      this.venueservice.bookingDetails(this.bookingId).subscribe({
        next: (res) => {
          console.log(res.data)
          this.item = res.data.bookingData as VenueBooking;
          this.payments = this.item.payments || [];
          this.fullPayment = res.data.fullPayment;
        }
      })
    }
  }

  isVenueBookingtype(item: PlannerBooking | VenueBooking | null): item is VenueBooking{
    return (item as VenueBooking)?.venueId !== undefined;
  }


  isPlannerBookingtype(item: PlannerBooking | VenueBooking | null): item is PlannerBooking{
    return (item as PlannerBooking)?.eventPlannerId !== undefined;
  }

  onPayAdvancepayment(){
    if(this.type == 'planner'){
      this.plannerservice.payAdvancepayment(this.bookingId).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            let options = {
                key: environment.razor_key,
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Advance payment Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.ngZone.run(() => {
                    this.plannerservice.confirmRazorpayPayment(response).subscribe({
                      next: (res)=> {
                        if(res.data?.bookedData){
                           this.toastr.success('Advance payment is successfully paid!');
                           this.item = res.data?.bookedData;
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
          this.toastr.error('Failed to pay advance payment. Please try again.');
        }
        },
        error: (err: any) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message);
          } else if (err.status === 400) {
            this.toastr.error(err.message);
          } else {
            this.toastr.error("Error booking the venue. Please try again.");
          }
        }

      })
    } else if(this.type == 'venue'){
      this.venueservice.payAdvancepayment(this.bookingId).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            let options = {
                key: environment.razor_key,
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Advance payment Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.ngZone.run(() => {
                    this.venueservice.confirmRazorpayPayment(response).subscribe({
                      next: (res)=> {
                        if(res.data?.bookedData){
                           this.toastr.success('Advance payment is successfully paid!');
                           this.item = res.data?.bookedData;
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
          this.toastr.error('Failed to pay advance payment. Please try again.');
        }
        },
        error: (err: any) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message);
          } else if (err.status === 400) {
            this.toastr.error(err.message);
          } else {
            this.toastr.error("Error booking the venue. Please try again.");
          }
        }

      })
    }
  }

  onPayFullPayment(){
    if(this.type === 'planner'){
      this.plannerservice.payFullpayment(this.bookingId).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            let options = {
                key: environment.razor_key,
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Full payment Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.ngZone.run(() => {
                    this.plannerservice.confirmRazorpayPayment(response).subscribe({
                      next: (res)=> {
                        if(res.data?.bookedData){
                           this.toastr.success('Full payment is successfully paid!');
                           this.item = res.data?.bookedData;
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
          this.toastr.error('Failed to pay full payment. Please try again.');
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

      })
    } else if(this.type === 'venue'){
      this.venueservice.payFullpayment(this.bookingId).subscribe({
        next: (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            let options = {
                key: environment.razor_key,
                amount: data?.razorpayOrderData.amount,
                currency: data?.razorpayOrderData.currency,
                name: 'EventDiva',
                description: 'Full payment Transaction',
                order_id: data?.razorpayOrderData.id,
                handler: (response: any) => {
                  this.ngZone.run(() => {
                    this.venueservice.confirmRazorpayPayment(response).subscribe({
                      next: (res)=> {
                        if(res.data?.bookedData){
                           this.toastr.success('Full payment is successfully paid!');
                           this.item = res.data?.bookedData;
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
          this.toastr.error('Failed to pay full payment. Please try again.');
        }
        },
        error: (err) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message);
          } else if (err.status === 400) {
            this.toastr.error(err.message);
          } else {
            this.toastr.error("Error booking the planner. Please try again.");
          }
        }

      })
    }

  }
}
