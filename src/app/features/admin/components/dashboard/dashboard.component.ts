import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { PieChartComponentComponent } from '../../../../shared/components/common/pie-chart-component/pie-chart-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PieChartComponentComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoading = true;
  totalusers: number = 0;
  totalVendors: number = 0;
  totalPlannerBookings: number = 0;
  totalVenueBookings: number = 0;
  totalRevenue: number = 0;
  allPlannerBookings = [];
  allVenueBookings = [];
  revenueOverTime: { month: number, year: number, revenue: number }[]  = [];
  currentYear = new Date().getFullYear();

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.dashboardService.getDashboardPage().subscribe({
      next: (res) => {
        const data = res.data;
        console.log(data)
          this.totalusers = data?.totalUsers|| 0;
          this.totalVendors = data?.totalVendors || 0;
          this.totalPlannerBookings = data?.totalPlannerBookings ?? 0;
          this.totalVenueBookings = data?.totalVenueBookings ?? 0;
          this.allPlannerBookings = data?.allPlannerBookings;
          this.allVenueBookings = data?.allVenueBookings;


        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading dashboard:',err);
      },
      complete: () => {
        console.log('Dashboard loading complete');
      }
    })
  }
}
