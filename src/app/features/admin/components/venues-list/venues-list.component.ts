import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VenuesAdminService } from '../../services/venues.service';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';
import { IVenue } from '../../../../core/models/venue.model';
import { Status } from '../../../../core/enums/important.enums';
import { SortSearchComponent } from '../../../../shared/components/admin/sort-search/sort-search.component';
import { AdminPaginationComponent } from '../../../../shared/components/admin/admin-pagination/admin-pagination.component';
import { ToastrAlertService } from '../../../../core/services/toastr.service';

@Component({
  selector: 'app-venues-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ActionBtnsComponent,
    StatusBadgeComponent,
    SortSearchComponent,
    AdminPaginationComponent
  ],
  templateUrl: './venues-list.component.html',
  styleUrl: './venues-list.component.css',
})
export class VenuesListComponent {
  status = Status;
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;
  venues!: IVenue[];
  headers = [
    'SL.No',
    'CoverPic',
    'Venue Name',
    'Venue Type',
    'Start Year',
    'Mobile',
    'Email',
    'Price',
    'Status',
    'Action',
  ];
  activeDropdownIndex: number | null = null;

  constructor(
    private venuesAdminService: VenuesAdminService,
    private toastr: ToastrAlertService
  ) {}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.venuesAdminService.getVenuesPage(this.page, this.limit).subscribe({
      next: (res) => {
        this.venues = res.data?.venues;
        this.totalPages = res.data?.totalPages;
        this.totalCount = res.data?.totalCount;
      },
      error: (err) => {
        console.log('Error loading Venue Lists:', err.message);
        this.toastr.error('Error loading Venue Lists');
      },
    });
  }

  onStatusChange(index: number, slug: string, status: Status.Approved | Status.Rejected) {
    this.venuesAdminService.venueStatusChange(slug, status).subscribe({
      next: (res) => {
        if(this.venues[index]){
          this.venues[index].approval = status;
        }
      },
      error: (err) => {
        console.log(err, 'eroorrr');
      },
    });
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
