import { Component } from '@angular/core';
import { VenueVendorService } from '../../services/venue-vendor.service';
import { VendorDashboardComponent } from '../../../../../shared/components/vendors/vendor-dashboard/vendor-dashboard.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PieChartComponentComponent } from '../../../../../shared/components/common/pie-chart-component/pie-chart-component.component';
import { LineChartComponentComponent } from '../../../../../shared/components/common/line-chart-component/line-chart-component.component';

@Component({
  selector: 'app-venue-dashboard',
  standalone: true,
  imports: [VendorDashboardComponent, CurrencyPipe,
    PieChartComponentComponent, CommonModule,
    LineChartComponentComponent],
  templateUrl: './venue-dashboard.component.html',
  styleUrl: './venue-dashboard.component.css'
})

export class VenueDashboardComponent {
  isLoading = true;
  totalBookings: number = 0;
  totalRevenue: number = 0;
  completedEvents: number = 0;
  AllBookings: any[] = [];
  revenueOverTime: { month: number, year: number, revenue: number }[]  = [];
  currentYear = new Date().getFullYear();

  constructor(private venueVendorService: VenueVendorService){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.venueVendorService.getDashboard().subscribe({
      next: (res) => {
        console.log(res, "jkdcnjdkk")
        const data = res.data;
        if(data.totalBookings && data?.totalRevenue && data?.AllBookings && data?.revenueOverTime){
          this.totalBookings = data?.totalBookings[0]?.totalBookings ?? 0;
          this.totalRevenue = data?.totalRevenue[0]?.totalRevenue ?? 0;
          this.AllBookings = data?.AllBookings ?? [];
          this.revenueOverTime = data?.revenueOverTime ?? [];

          const events = this.AllBookings.find(booking => booking?.status === 'completed');
          this.completedEvents = events? events?.count: 0 ;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading dashboard:',err);
        this.isLoading = false;
      }
    })
  }
}
