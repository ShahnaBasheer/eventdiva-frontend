import { Component, OnInit } from '@angular/core';
import { VendorCardWrapComponent } from '../../../../shared/components/customer/vendor-card-wrap/vendor-card-wrap.component';
import { CardComponent } from '../../../../shared/components/customer/card/card.component';
import { AllVendorsService } from '../../services/vendors.service';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';

@Component({
  selector: 'app-event-planners',
  standalone: true,
  imports: [
    VendorCardWrapComponent,
    CardComponent,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './event-planners.component.html',
  styleUrl: './event-planners.component.css'
})


export class AllEventPlannersComponent implements OnInit{
  isLoading = true;
  eventPlanners!: IEventPlanner[];
  constructor(private allvendorsservice: AllVendorsService){}

  ngOnInit(): void {
      this.allvendorsservice.getAllEventPlannersPage().subscribe({
        next: (res)=> {
            this.eventPlanners = res.data?.eventPlanners;
            this.isLoading = false;
        },
        error: (err) => {
            console.log(err, "error occured");
            this.isLoading = false;
        }
      })
  }


}
