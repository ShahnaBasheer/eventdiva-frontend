import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { EventPlannerAdminService } from '../../services/planner.service';
import { RouterModule } from '@angular/router';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from '../../../../core/enums/important.enums';
import { SortSearchComponent } from '../../../../shared/components/admin/sort-search/sort-search.component';
import { AdminPaginationComponent } from '../../../../shared/components/admin/admin-pagination/admin-pagination.component';
import { FormsModule } from '@angular/forms';
import { ToastrAlertService } from '../../../../core/services/toastr.service';

@Component({
  selector: 'app-event-planners-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ActionBtnsComponent,
    StatusBadgeComponent,
    SortSearchComponent,
    AdminPaginationComponent
  ],
  templateUrl: './event-planners-list.component.html',
  styleUrl: './event-planners-list.component.css',
})


export class EventPlannersListComponent {
  status = Status;
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;
  planners!: IEventPlanner[];
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
    private toastr: ToastrAlertService,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.eventPlannerService.getPlannersPage(this.page, this.limit).subscribe({
      next: (res) => {
        this.planners = res.data?.eventPlanners;
        this.totalCount = res.data?.totalPages;
        this.totalPages = res.data?.totalCount;
      },
      error: (err) => {
        console.log('Error loading Event Planner Lists:', err.message);
        this.toastr.error('Error loading Event Planner Lists', 'Failed');
      },
    });
  }

  onStatusChange(index: number, slug: string, status: Status.Approved | Status.Rejected) {
    this.eventPlannerService.plannerStatusChange(slug, status).subscribe({
      next: (res) => {
        if (status === Status.Approved || status === Status.Rejected) {
          this.planners[index].approval = status;
          // Show an alert or a pop-up
          this.snackBar.open(`${this.planners[index].company} has been Approved`, 'OK', {
            duration: 2000,
            panelClass: ['mat-mdc-snackbar-surface', 'snackbar-success'],
          });
          this.activeDropdownIndex  = -1;
        }
      },
      error: (err) => {
        console.log(err, 'eroorrr');
      },
    });
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

  onPageSizeLimit(data: number){
    this.limit = data;
    this.isLoading = true;
    this.loadVendors();
  }


}
