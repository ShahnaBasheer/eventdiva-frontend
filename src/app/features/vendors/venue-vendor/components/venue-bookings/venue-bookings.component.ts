import { Component } from '@angular/core';
import { BookingsCardComponent } from '../../../../../shared/components/vendors/bookings-card/bookings-card.component';
import { CommonModule } from '@angular/common';
import { VenueBookingService } from '../../services/venue-booking.service';
import { IVenueBooking } from '../../../../../core/models/IvenueBooking.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venue-bookings',
  standalone: true,
  imports: [BookingsCardComponent, CommonModule],
  templateUrl: './venue-bookings.component.html',
  styleUrl: './venue-bookings.component.css'
})


export class VenueBookingsComponent {
  venues: IVenueBooking[] = [];
  constructor(private venueBookingService: VenueBookingService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.venueBookingService.getVenueBookings().subscribe({
      next: (response) => {
          this.venues = response.data?.bookings;
      },
      error: (err) => {
        console.log('Error loading Venue Bookings:',err.message);
        this.toastr.error("Error loading Venue Bookings", 'Failed');
      },
    })
  }

}
