import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.dashboardService.getDashboardPage().subscribe({
      next: () => {
        // Handle successful response
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
