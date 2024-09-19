import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})


export class CardComponent implements OnInit{
  @Input({required: true}) cardItems!: IEventPlanner;
  @Input({required: true}) vendorType!: string;
  imageUrl!: string;


  ngOnInit(): void {
    if (this.cardItems?.coverPic) {
      this.imageUrl = `${environment.baseUrl}${environment.ep_coverpic_url}${this.cardItems.coverPic}`
    }
  }

}
