import { Component } from '@angular/core';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-detail-reviews',
  standalone: true,
  imports: [
    ReviewComponent
  ],
  templateUrl: './detail-reviews.component.html',
  styleUrl: './detail-reviews.component.css'
})
export class DetailReviewsComponent {

}
