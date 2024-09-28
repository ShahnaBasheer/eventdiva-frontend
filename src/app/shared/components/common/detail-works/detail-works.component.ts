import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-detail-works',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detail-works.component.html',
  styleUrl: './detail-works.component.css'
})


export class DetailWorksComponent{
   @Input() portfolios: string[] = [];
}
