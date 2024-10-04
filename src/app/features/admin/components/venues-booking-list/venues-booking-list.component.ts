import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { VenuesAdminService } from '../../services/venues.service';
import { ToastrService } from 'ngx-toastr';
import { VenueBooking } from '../../../../core/models/venueBooking.model';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';

@Component({
  selector: 'app-venues-booking-list',
  standalone: true,
  imports: [CommonModule, ActionBtnsComponent, StatusBadgeComponent],
  templateUrl: './venues-booking-list.component.html',
  styleUrl: './venues-booking-list.component.css',
})


export class VenuesBookingListComponent {
  venues!: VenueBooking[];
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;
  headers = [
    'SL.No',
    'BookingId',
    'Customer',
    'EventType',
    'EventName',
    'Venue',
    'Guests',
    'Email',
    'Mobile',
    'Payment Modes',
    'Status',
    'Payment Status',
    'Action',
  ];
  activeDropdownIndex: number | null = null;

  constructor(
    private venuesAdminService: VenuesAdminService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.venuesAdminService.getVenueBookings(this.page, this.limit).subscribe({
      next: (response) => {
        this.venues = response.data.bookings;
      },
      error: (err) => {
        console.log('Error loading Venue Lists:', err.message);
        this.toastr.error('Error loading Venue Lists', 'Failed');
      },
    });
  }

  onCancelled(bookingId: string) {
    console.log(bookingId);
  }

  toggleDropdown(index: number) {
    this.activeDropdownIndex =
      this.activeDropdownIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      !target.closest('.dropdown-container') &&
      !target.closest('.dropdown-button')
    ) {
      this.activeDropdownIndex = null;
    }
  }

  onPageSizeLimit(data: number){
    this.limit = data;
    this.isLoading = true;
    this.loadVendors();
  }
}
