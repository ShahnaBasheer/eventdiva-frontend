import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { environment } from '../../../../../environments/environment';
import { IVenue } from '../../../../core/models/venue.model';


@Component({
  selector: 'app-upper-image-part',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upper-image-part.component.html',
  styleUrl: './upper-image-part.component.css'
})


export class UpperImagePartComponent implements OnInit{

    @Input({required: true}) CompanyInfo!: IEventPlanner | IVenue;
    @Input({required: true}) Menu: string[] = [];
    @Input({required: true}) Title: string = '';
    imageUrl: string = '';

    ngOnInit(): void {
    }


}
