import { Component } from '@angular/core';
import { BookingsCardComponent } from '../../../../../shared/components/vendors/bookings-card/bookings-card.component';
import { CommonModule } from '@angular/common';
import { VenueBookingService } from '../../services/venue-booking.service';
import { VenueBooking } from '../../../../../core/models/venueBooking.model';
import { ToastrService } from 'ngx-toastr';
import { VendorPaginationComponent } from '../../../../../shared/components/vendors/vendor-pagination/vendor-pagination.component';
import { PageLoaderComponent } from '../../../../../shared/components/common/page-loader/page-loader.component';
import { FormsModule } from '@angular/forms';
import { BookingSearchFiltersComponent } from '../../../../../shared/components/common/booking-search-filters/filters.component';

@Component({
  selector: 'app-venue-bookings',
  standalone: true,
  imports: [BookingsCardComponent, CommonModule,
    VendorPaginationComponent, PageLoaderComponent,
    FormsModule, BookingSearchFiltersComponent
    ],
  templateUrl: './venue-bookings.component.html',
  styleUrl: './venue-bookings.component.css'
})


export class VenueBookingsComponent {
  isLoading = true;
  tabs = ['pending', 'confirmed', 'cancelled', 'completed'];
  activeTab: string = 'pending';
  venues: VenueBooking[] = [];
  filters!: { months: number[], years: number[], eventTypes: string[] } ;
  selectedFilters: {
    selectedMonth: number | null;
    selectedYear: number | null;
    selectedEventType: string | null;
    selectedDays: string | null;
  } = {
    selectedMonth: null,
    selectedYear: null,
    selectedEventType: null,
    selectedDays: null
  }

  totalCount = 0;
  completedCount = 0;
  totalPages = 1;
  page: number = 1;
  limit: number = 10;




  constructor(private venueBookingService: VenueBookingService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.venueBookingService.getAllVenueBookings(this.page, this.limit, this.activeTab, this.selectedFilters).subscribe({
      next: (res) => {
          console.log(res.data)
          this.venues = res.data?.bookings;
          this.totalCount = res.data?.filterData?.totalCount;
          this.completedCount = res.data?.completed;
          this.totalPages = res.data?.totalPages;
          this.filters = res.data?.filterData;
          this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading Venue Bookings:',err.message);
        this.isLoading = false;
        this.toastr.error("Error loading Venue Bookings");
      },
    })
  }


  onSelectPage(data: number){
    this.page = data;
    this.isLoading = true;
    this.loadVendors();
  }

  onSelectPageSize(value: number){
    this.limit = value;
    this.isLoading = true;
    this.loadVendors();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.isLoading = true;
    this.loadVendors();
  }

  onSelectedFilters(data: {
    selectedMonth: number | null;
    selectedYear: number | null;
    selectedEventType: string | null;
    selectedDays: string | null;
  }){
    this.selectedFilters = data;
    console.log(this.selectedFilters)
    this.loadVendors();
  }

}
