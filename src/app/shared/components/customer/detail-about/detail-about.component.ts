import { CommonModule } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { decode } from 'html-entities'; // Import the decode function from the library


@Component({
  selector: 'app-detail-about',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-about.component.html',
  styleUrl: './detail-about.component.css'
})

export class DetailAboutComponent implements OnInit{
  @Input({required: true }) about!: string;
  @Input({required: true }) extraInfo!: string[];
  @Input({required: true }) Title!: string;
  sanitizedHtml: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(){
     const decodedHtml = decode(this.about);
     this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(decodedHtml) as string;
  }
}
