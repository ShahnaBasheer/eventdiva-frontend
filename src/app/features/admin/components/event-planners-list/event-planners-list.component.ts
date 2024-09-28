import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { EventPlannerAdminService } from '../../services/planner.service';
import { RouterModule } from '@angular/router';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-planners-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ActionBtnsComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './event-planners-list.component.html',
  styleUrl: './event-planners-list.component.css',
})
export class EventPlannersListComponent {
  planners: IEventPlanner[] = [];
  headers = [
    'SL.No',
    'CoverPic',
    'Company',
    'Start Year',
    'Mobile',
    'Email',
    'planning Fee',
    'Approval',
    'Action',
  ];
  activeDropdownIndex: number | null = null;

  constructor(
    private eventPlannerService: EventPlannerAdminService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.eventPlannerService.getPlannersPage().subscribe({
      next: (response) => {
        this.planners = response.data.eventPlanners;
        console.log(response.data);
      },
      error: (err) => {
        console.log('Error loading Event Planner Lists:', err.message);
        this.toastr.error('Error loading Event Planner Lists', 'Failed');
      },
    });
  }

  onStatusChange(index: number, slug: string, status: string) {
    this.eventPlannerService.plannerStatusChange(slug, status).subscribe({
      next: (res) => {
        if (status === 'approved' || status === 'rejected') {
          this.planners[index].approval = status;
          // Show an alert or a pop-up
          this.snackBar.open(`${this.planners[index].company} has been Approved`, 'OK', {
            duration: 2000,
            panelClass: ['snackbar-warning'],
          });
          this.activeDropdownIndex  = -1;
        }
      },
      error: (err) => {
        console.log(err, 'eroorrr');
      },
    });
  }

  onRejected(slug: string) {
    console.log(slug);
  }

  toggleDropdown(index: number) {
    this.activeDropdownIndex = this.activeDropdownIndex === index ? null : index;
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
}
