import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})


export class BookingCardComponent implements OnInit{

  @Input({ required: true }) item!: any;
  imgUrl = `${environment.baseUrl}`

  ngOnInit(): void {
        if(this.item.venueId){
          this.imgUrl += `${environment.vv_coverpic_url}${this.item.venueId.coverPic}`;
        } else if(this.item.eventPlannerId){
          this.imgUrl += `${environment.ep_coverpic_url}${this.item.eventPlannerId.coverPic}`;
        }

        console.log(this.imgUrl + this.item.coverPic)
  }
}
