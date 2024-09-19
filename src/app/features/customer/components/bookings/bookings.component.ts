import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCardComponent } from '../../../../shared/components/customer/booking-card/booking-card.component';
import { SubNavbarComponent } from '../../../../shared/components/customer/sub-navbar/sub-navbar.component';
import { AllBookingService } from '../../services/booking.service';

@Component({
    selector: 'app-bookings',
    standalone: true,
    templateUrl: './bookings.component.html',
    styleUrl: './bookings.component.css',
    imports: [
      SubNavbarComponent,
      BookingCardComponent,
      CommonModule
    ]
})


export class BookingsComponent implements OnInit{
  allbookings = [];
  constructor(private allBookingService: AllBookingService){}

  ngOnInit(): void {
       this.allBookingService.getAllBookings().subscribe({
        next: (res) => {
            this.allbookings = res.data?.allBookings;
            console.log(res.data.allBookings)
        }
       })
  }

}
