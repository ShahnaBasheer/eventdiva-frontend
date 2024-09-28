import { Component, Input } from '@angular/core';
import { IVenue } from '../../../../core/models/venue.model';
import { DetailAreasComponent } from '../detail-areas/detail-areas.component';
import { DetailAboutComponent } from '../../customer/detail-about/detail-about.component';
import { DetailWorksComponent } from '../detail-works/detail-works.component';
import { DetailReviewsComponent } from '../../customer/detail-reviews/detail-reviews.component';
import { DetailHeadersComponent } from '../detail-headers/detail-headers.component';
import { DetailAddressComponent } from '../detail-address/detail-address.component';
import { DetailServicesComponent } from '../detail-services/detail-services.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue-body-detail',
  standalone: true,
  imports: [
    DetailAreasComponent,
    DetailAboutComponent,
    DetailWorksComponent,
    DetailReviewsComponent,
    DetailHeadersComponent,
    DetailAddressComponent,
    DetailServicesComponent,
    DetailAreasComponent,
    CommonModule
  ],
  templateUrl: './venue-body-detail.component.html',
  styleUrl: './venue-body-detail.component.css'
})


export class VenueBodyDetailComponent {
  @Input() venueData: IVenue | null = null;
}
