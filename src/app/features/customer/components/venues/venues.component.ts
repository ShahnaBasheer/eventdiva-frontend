import { Component } from '@angular/core';
import { VendorCardWrapComponent } from '../../../../shared/components/customer/vendor-card-wrap/vendor-card-wrap.component';
import { IVenue } from '../../../../core/models/venue.model';
import { AllVendorsService } from '../../services/vendors.service';
import { VenueCardComponent } from '../../../../shared/components/customer/venue-card/venue-card.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';

@Component({
  selector: 'app-venues',
  standalone: true,
  imports: [ VendorCardWrapComponent, VenueCardComponent, CommonModule, LoaderComponent ],
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.css'
})


export class VenuesComponent {
  venues!: IVenue[] ;
  isLoading = true;
  constructor(private allvendorsservice: AllVendorsService){}

  ngOnInit(): void {
      this.allvendorsservice.getAllVenuesPage().subscribe({
        next: (res)=> {
            this.venues = res.data?.venues;
            this.isLoading = false;
        },
        error: (err) => {
            console.log(err, "error occured");
            this.isLoading = false;
        }
      })

  }


}
