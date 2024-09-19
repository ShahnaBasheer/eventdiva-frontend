import { Component } from '@angular/core';
import { IVenue } from '../../../../../core/models/venue.model';
import { CommonModule } from '@angular/common';
import { UpperImagePartComponent } from '../../../../../shared/components/common/upper-image-part/upper-image-part.component';
import { VenueVendorService } from '../../services/venue-vendor.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { VenueBodyDetailComponent } from '../../../../../shared/components/common/venue-body-detail/venue-body-detail.component';

@Component({
  selector: 'app-venue-vendor-detail',
  standalone: true,
  imports: [ CommonModule, UpperImagePartComponent, VenueBodyDetailComponent],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.css'
})


export class VenueDetailComponent {
  allMenus = ['AREAS', 'ABOUT', 'ADDRESS' ,'MORE', 'WORKS'];
  venueData!: IVenue;
  folder = environment.vv_coverpic_url;
  portUrl = environment.vv_portfolio_url;

  constructor(
    private venueVendorService: VenueVendorService,
    private router: Router,
    ){}

    ngOnInit(): void {
      this.venueVendorService.getVenueDetails().subscribe({
        next: (res) => {
          console.log(res.data)
          if (!res.data?.venueVendorData) {
            this.router.navigate(['/vendor/venue-vendor/new-service', 'VV']);
          } else {
            this.venueData = res.data.venueVendorData;
          }
        },
        error: (err: any) => {
          console.error('Error:', err.message);
        }
      });
    }
}
