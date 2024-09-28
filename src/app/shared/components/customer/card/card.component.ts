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


export class CardComponent {
  @Input({required: true}) cardItems!: IEventPlanner;
  @Input({required: true}) vendorType!: string;
  imageUrl!: string;



}
