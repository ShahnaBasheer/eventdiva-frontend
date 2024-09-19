import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-services',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-services.component.html',
  styleUrl: './detail-services.component.css'
})
export class DetailServicesComponent {
  @Input({required: true}) services!: string [];

}
