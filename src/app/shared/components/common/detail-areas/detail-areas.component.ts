import { Component, Input } from '@angular/core';
import { ICapacity } from '../../../../core/models/venue.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-areas',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-areas.component.html',
  styleUrl: './detail-areas.component.css'
})


export class DetailAreasComponent {
  @Input({required: true}) capacity!: ICapacity[];
}
