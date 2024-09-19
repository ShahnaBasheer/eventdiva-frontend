import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VenuesAdminService } from '../../services/venues.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { ActionBtnsComponent } from '../../../../shared/components/common/action-btns/action-btns.component';
import { StatusBadgeComponent } from '../../../../shared/components/common/status-badge/status-badge.component';

@Component({
  selector: 'app-venues-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ActionBtnsComponent,
    StatusBadgeComponent
  ],
  templateUrl: './venues-list.component.html',
  styleUrl: './venues-list.component.css'
})

export class VenuesListComponent {
    venues: any;
    headers = [ 'SL.No', 'CoverPic' ,'Venue Name', 'Venue Type', 'Start Year',
         'Mobile', 'Email', 'Price', 'Status', 'Action'];
    imgUrl =  `${environment.baseUrl}${environment.vv_coverpic_url}`;
    activeDropdownIndex: number | null = null;

    constructor(private venuesAdminService: VenuesAdminService, private toastr: ToastrService){}
    ngOnInit(): void {
       this.loadVendors();
    }

    loadVendors(){
      this.venuesAdminService.getVenuesPage().subscribe({
        next: (response) => {
            this.venues = response.data.venues;
            console.log(response.data)
        },
        error: (err) => {
          console.log('Error loading Venue Lists:',err.message);
          this.toastr.error("Error loading Venue Lists", 'Failed');
        },
      })
    }


    onStatusChange(index: number, slug: string, status: string){
      this.venuesAdminService.venueStatusChange(slug, status).subscribe({
        next: (res) => {
            console.log(res.data, "ffffffffff")
            this.venues[index].approval = status;
        },
        error: (err) => {
             console.log(err, "eroorrr")
        }
      })
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
