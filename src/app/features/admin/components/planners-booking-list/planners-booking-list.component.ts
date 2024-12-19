import { Component, HostListener } from '@angular/core';
import { PlannerBooking } from '../../../../core/models/plannerBooking.model';
import { CommonModule } from '@angular/common';
import { EventPlannerAdminService } from '../../services/planner.service';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';
import { SortSearchComponent } from '../../../../shared/components/admin/sort-search/sort-search.component';
import { Status } from '../../../../core/enums/important.enums';
import { ToastrAlertService } from '../../../../core/services/toastr.service';

@Component({
  selector: 'app-planners-booking-list',
  standalone: true,
  imports: [CommonModule, ActionBtnsComponent,
    StatusBadgeComponent, SortSearchComponent],
  templateUrl: './planners-booking-list.component.html',
  styleUrl: './planners-booking-list.component.css',
})
export class PlannersBookingListComponent {
  status = Status;
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;
  planners!: PlannerBooking[];;
  headers = [
    'SL.No',
    'BookingId',
    'Customer',
    'EventType',
    'EventName',
    'Company',
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
    private plannerAdminService: EventPlannerAdminService,
    private toastr: ToastrAlertService
  ) {}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.plannerAdminService.getPlannerBookings(this.page, this.limit).subscribe({
      next: (res) => {
        console.log(res)
        this.planners = res.data.bookings;
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
