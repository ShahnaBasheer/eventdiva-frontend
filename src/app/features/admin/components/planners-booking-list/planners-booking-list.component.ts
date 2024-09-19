import { Component, HostListener } from '@angular/core';
import { IPlannerBooking } from '../../../../core/models/IPlannerBooking.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { EventPlannerAdminService } from '../../services/planner.service';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';

@Component({
  selector: 'app-planners-booking-list',
  standalone: true,
  imports: [ CommonModule, ActionBtnsComponent, StatusBadgeComponent ],
  templateUrl: './planners-booking-list.component.html',
  styleUrl: './planners-booking-list.component.css'
})


export class PlannersBookingListComponent {
  planners: IPlannerBooking[] = [];
  headers = [ 'SL.No', 'BookingId' ,'Customer', 'EventType', 'EventName', 'Company',
       'Guests', 'Email', 'Mobile', 'Payment Modes' ,'Status', 'Payment Status', 'Action'];
  imgUrl =  `${environment.baseUrl}${environment.ep_coverpic_url}`;
  activeDropdownIndex: number | null = null;

  constructor(private plannerAdminService: EventPlannerAdminService, private toastr: ToastrService){}
  ngOnInit(): void {
     this.loadVendors();
  }

  loadVendors(){
    this.plannerAdminService.getPlannerBookings().subscribe({
      next: (response) => {
          this.planners = response.data.bookings;
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
