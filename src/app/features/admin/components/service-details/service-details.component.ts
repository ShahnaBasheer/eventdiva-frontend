import { Component, Input, OnInit } from '@angular/core';
import { VenuesAdminService } from '../../services/venues.service';
import { Router } from '@angular/router';
import { EventPlannerAdminService } from '../../services/planner.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { VenueBodyDetailComponent } from '../../../../shared/components/common/venue-body-detail/venue-body-detail.component';
import { PlannerBodyDetailComponent } from '../../../../shared/components/common/planner-body-detail/planner-body-detail.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    CommonModule,
    VenueBodyDetailComponent,
    PlannerBodyDetailComponent
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})


export class ServiceDetailsComponent implements OnInit{
  allMenus = ['ABOUT', 'ADDRESS' ,'SERVICES', 'WORKS'];
  @Input({required: true}) slug!: string;
  @Input({required: true}) item!: any;
  @Input({required: true}) type!: string;
  portUrl: string = '';
  imgUrl: string = '';



  constructor(
    private venueadminservice: VenuesAdminService,
    private planneradminservice: EventPlannerAdminService,
    private route: Router
  ){}

  ngOnInit(): void {
      if(this.type === 'venue'){
        this.venueadminservice.getVenueDetails(this.slug).subscribe({
          next: (res) => {
              this.item = res.data.venueData;
              this.imgUrl = `${environment.baseUrl}${environment.vv_coverpic_url}${this.item?.coverPic}`;
              this.portUrl = environment.vv_portfolio_url
          },
          error:(err) => {
              console.log(err, "error");
          }
        })
      } else if(this.type === 'planner'){
        this.planneradminservice.getPlannerDetails(this.slug).subscribe({
          next: (res) => {
            console.log(res,  "jjj")
            this.item = res.data.eventPlannerData;
            this.imgUrl = `${environment.baseUrl}${environment.ep_coverpic_url}${this.item?.coverPic}`;
            this.portUrl = environment.ep_portfolio_url
          },
          error:(err) => {
              console.log(err, "error");

          }
        })
      }

  }

}
