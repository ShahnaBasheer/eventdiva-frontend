
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { VenuesAdminService } from '../../services/venues.service';
import { EventPlannerAdminService } from '../../services/planner.service';
import { CommonModule } from '@angular/common';
import { VenueBodyDetailComponent } from '../../../../shared/components/common/venue-body-detail/venue-body-detail.component';
import { PlannerBodyDetailComponent } from '../../../../shared/components/common/planner-body-detail/planner-body-detail.component';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { IVenue } from '../../../../core/models/venue.model';
import { ToastrService } from 'ngx-toastr';
import { checkEventPlanner, checkVenue } from '../../../../core/helpers/helper.function';


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
  item: IEventPlanner | IVenue | null = null;
  venueItem: IVenue | null = null;
  plannerItem: IEventPlanner | null = null;
  name: string = '';
  @Input({required: true}) type!: string;

  constructor(
    private venueadminservice: VenuesAdminService,
    private planneradminservice: EventPlannerAdminService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    if(this.type === 'venue'){
      this.venueadminservice.getVenueDetails(this.slug).subscribe({
        next: (res) => {
            console.log(res.data)
            this.item = res.data.venueData as IVenue;
            this.name = res.data.venueData.venueName;
            this.venueItem = this.item as IVenue;
        },
        error:(err) => {
            console.log(err, "error");
            this.toastr.error(err.error.message);
        }
      })
    } else if(this.type === 'planner'){
      this.planneradminservice.getPlannerDetails(this.slug).subscribe({
        next: (res) => {
            this.name = res.data.eventPlannerData?.company;
            this.plannerItem =  res.data.eventPlannerData as IEventPlanner;
            this.item = this.plannerItem as IEventPlanner;
            this.cd.detectChanges();
        },
        error:(err) => {
            console.log(err, "error");
            this.toastr.error(err.error.message);
        }
      })
    }
  }


}


