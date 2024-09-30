import { Component, Input, OnInit } from '@angular/core';
import { DetailAboutComponent } from '../../customer/detail-about/detail-about.component';
import { DetailWorksComponent } from '../detail-works/detail-works.component';
import { DetailReviewsComponent } from '../../customer/detail-reviews/detail-reviews.component';
import { DetailHeadersComponent } from '../detail-headers/detail-headers.component';
import { DetailAddressComponent } from '../detail-address/detail-address.component';
import { DetailServicesComponent } from '../detail-services/detail-services.component';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-planner-body-detail',
  standalone: true,
  imports: [
    DetailAboutComponent,
    DetailWorksComponent,
    DetailReviewsComponent,
    DetailHeadersComponent,
    DetailAddressComponent,
    DetailServicesComponent,
    CommonModule
  ],
  templateUrl: './planner-body-detail.component.html',
  styleUrl: './planner-body-detail.component.css',
})


export class PlannerBodyDetailComponent {
  @Input({required: true}) eventPlanner!: IEventPlanner;

  ngOnInit(){
    console.log(this.eventPlanner, "heyyy")
  }
}
