import { EventPlannerService } from './../../services/event-planner.service';
import { Component, OnInit } from '@angular/core';
import { UpperImagePartComponent } from '../../../../../shared/components/common/upper-image-part/upper-image-part.component';
import { CommonModule } from '@angular/common';
import IEventPlanner from '../../../../../core/models/eventPlanner.model';
import { Router } from '@angular/router';
import { PlannerBodyDetailComponent } from "../../../../../shared/components/common/planner-body-detail/planner-body-detail.component";
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-event-planner-detail',
  standalone: true,
  imports: [
    UpperImagePartComponent,
    CommonModule,
    PlannerBodyDetailComponent
],
  templateUrl: './event-planner-detail.component.html',
  styleUrl: './event-planner-detail.component.css'
})


export class EventPlannerDetailComponent implements OnInit{
    allMenus = ['ABOUT', 'ADDRESS' ,'SERVICES', 'WORKS'];
    eventPlannerData!: IEventPlanner;
    venueData!: string;
    folder = environment.ep_coverpic_url;



    constructor(
      private eventPlannerService: EventPlannerService,
      private router: Router,
      ){}

      ngOnInit(): void {
        this.eventPlannerService.getEventPlanner().subscribe({
          next: (res) => {
            if (!res.data?.eventPlannerData) {
              this.router.navigate(['/vendor/event-planner/new-service', 'EP']);
            } else {
              this.eventPlannerData = res.data?.eventPlannerData;
            }
          },
          error: (err: any) => {
            console.error('Error:', err.message);
          }
        });
      }
}

