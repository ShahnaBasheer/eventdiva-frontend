import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-headers',
  standalone: true,
  imports: [],
  templateUrl: './detail-headers.component.html',
  styleUrl: './detail-headers.component.css'
})
export class DetailHeadersComponent {
  @Input({required: true}) header!: string;

}
