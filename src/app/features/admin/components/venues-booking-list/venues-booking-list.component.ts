import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { VenuesAdminService } from '../../services/venues.service';
import { ToastrService } from 'ngx-toastr';
import { IVenueBooking } from '../../../../core/models/IvenueBooking.model';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';

@Component({
  selector: 'app-venues-booking-list',
  standalone: true,
  imports: [ CommonModule, ActionBtnsComponent, StatusBadgeComponent ],
  templateUrl: './venues-booking-list.component.html',
  styleUrl: './venues-booking-list.component.css'
})


export class VenuesBookingListComponent {

  venues: IVenueBooking[] = [];
  headers = [ 'SL.No', 'BookingId' ,'Customer', 'EventType', 'EventName', 'Venue',
       'Guests', 'Email', 'Mobile', 'Payment Modes' ,'Status', 'Payment Status', 'Action'];
  imgUrl =  `${environment.baseUrl}${environment.vv_coverpic_url}`;
  activeDropdownIndex: number | null = null;

  constructor(private venuesAdminService: VenuesAdminService, private toastr: ToastrService){}
  ngOnInit(): void {
     this.loadVendors();
  }

  loadVendors(){
    this.venuesAdminService.getVenueBookings().subscribe({
      next: (response) => {
          this.venues = response.data.bookings;
      },
      error: (err) => {
        console.log('Error loading Venue Lists:',err.message);
        this.toastr.error("Error loading Venue Lists", 'Failed');
      },
    })
  }

  onCancelled(bookingId: string){
    console.log(bookingId);
  }

  toggleDropdown(index: number) {
    this.activeDropdownIndex = this.activeDropdownIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown-container') && !target.closest('.dropdown-button')) {
      this.activeDropdownIndex = null;
    }
  }
}
