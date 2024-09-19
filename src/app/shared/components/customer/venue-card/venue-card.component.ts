import { Component, Input } from '@angular/core';
import { IVenue } from '../../../../core/models/venue.model';
import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue-card',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './venue-card.component.html',
  styleUrl: './venue-card.component.css'
})


export class VenueCardComponent {
  @Input({required: true}) cardItems!: IVenue;
  @Input({required: true}) vendorType!: string;
  imageUrl!: string;


  ngOnInit(): void {
    if (this.cardItems?.coverPic) {
      this.imageUrl = `${environment.baseUrl}${environment.vv_coverpic_url}${this.cardItems.coverPic}`
    }
  }
}
