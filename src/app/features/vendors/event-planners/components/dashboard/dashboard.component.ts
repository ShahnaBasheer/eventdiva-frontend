import { Component } from '@angular/core';
import { EventPlannerService } from '../../services/event-planner.service';
import { VendorDashboardComponent } from '../../../../../shared/components/vendors/vendor-dashboard/vendor-dashboard.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PieChartComponentComponent } from '../../../../../shared/components/common/pie-chart-component/pie-chart-component.component';
import { LineChartComponentComponent } from '../../../../../shared/components/common/line-chart-component/line-chart-component.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VendorDashboardComponent, CurrencyPipe,
     PieChartComponentComponent, CommonModule,
     LineChartComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class EventPlannerDashboardComponent {
  isLoading = true;
  totalBookings: number = 0;
  totalRevenue: number = 0;
  completedEvents: number = 0;
  AllBookings: any[] = [];
  revenueOverTime: { month: number, year: number, revenue: number }[]  = [];
  currentYear = new Date().getFullYear();

  constructor(private eventPlannerService: EventPlannerService){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.eventPlannerService.getDashboard().subscribe({
      next: (res) => {
        this.totalBookings = res.data.totalBookings[0].totalBookings || 0;
        this.totalRevenue = res.data.totalRevenue[0].totalRevenue || 0;
        this.AllBookings = res.data.AllBookings || [];
        this.revenueOverTime = res.data.revenueOverTime|| [];

        const events = this.AllBookings.find(booking => booking.status === 'completed');
        this.completedEvents = events? events.count: 0 ;

        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading dashboard:',err);
        this.isLoading = false;
      }
    })
  }
}
