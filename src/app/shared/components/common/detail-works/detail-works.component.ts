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


export class DetailWorksComponent implements OnInit{
   @Input() portfolios: string[] = [];
   @Input({ required: true })folder: string = '';
   imageUrl: string = `${environment.baseUrl}`;

   ngOnInit(){
       this.imageUrl += this.folder;
   }
}