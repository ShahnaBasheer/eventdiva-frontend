import { Component } from '@angular/core';
import IEventPlanner from '../../../../../core/models/eventPlanner.model';
import { IPlannerBooking } from '../../../../../core/models/IPlannerBooking.model';
import { PlannerBookingService } from '../../services/planner-booking.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BookingsCardComponent } from '../../../../../shared/components/vendors/bookings-card/bookings-card.component';

@Component({
  selector: 'app-planners-booking',
  standalone: true,
  imports: [ CommonModule, BookingsCardComponent ],
  templateUrl: './planners-booking.component.html',
  styleUrl: './planners-booking.component.css'
})


export class PlannersBookingComponent {
  planners: IPlannerBooking[] = [];
  constructor(private plannerBookingService: PlannerBookingService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.plannerBookingService.getPlannerBookings().subscribe({
      next: (response) => {
          this.planners = response.data?.bookings;
      },
      error: (err) => {
        console.log('Error loading Venue Bookings:',err.message);
        this.toastr.error("Error loading Venue Bookings", 'Failed');
      },
    })
  }
}
