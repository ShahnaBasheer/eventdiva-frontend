import { Component } from '@angular/core';
import { PlannerBooking } from '../../../../../core/models/plannerBooking.model';
import { PlannerBookingService } from '../../services/planner-booking.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BookingsCardComponent } from '../../../../../shared/components/vendors/bookings-card/bookings-card.component';
import { VendorPaginationComponent } from '../../../../../shared/components/vendors/vendor-pagination/vendor-pagination.component';
import { PageLoaderComponent } from '../../../../../shared/components/common/page-loader/page-loader.component';
import { BookingSearchFiltersComponent } from '../../../../../shared/components/common/booking-search-filters/filters.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planners-booking',
  standalone: true,
  imports: [ CommonModule, BookingsCardComponent ,
      VendorPaginationComponent, PageLoaderComponent,
      FormsModule, BookingSearchFiltersComponent
  ],
  templateUrl: './planners-booking.component.html',
  styleUrl: './planners-booking.component.css'
})


export class PlannersBookingComponent {
  planners: PlannerBooking[] = [];
  isLoading = true;
  tabs = ['pending', 'confirmed', 'cancelled', 'completed'];
  activeTab: string = 'pending';
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

  constructor(private plannerBookingService: PlannerBookingService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.plannerBookingService.getPlannerBookings(this.page, this.limit, this.activeTab, this.selectedFilters).subscribe({
      next: (res) => {
          this.planners = res.data?.bookings;
          this.totalCount = res.data?.filterData?.totalCount;
          this.completedCount = res.data?.completed;
          this.totalPages = res.data?.totalPages;
          this.filters = res.data?.filterData;
          this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading Venue Bookings:',err.message);
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
