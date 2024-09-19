import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})


export class StatusBadgeComponent {
  @Input({required: true}) status!: string | undefined;
}
