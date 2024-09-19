import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { decode } from 'html-entities'; // Import the decode function from the library


@Component({
  selector: 'app-detail-about',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-about.component.html',
  styleUrl: './detail-about.component.css'
})

export class DetailAboutComponent {
  @Input() about!: string;
  @Input() extraInfo!: string[];
  @Input({required: true }) Title!: string;

  constructor(private sanitizer: DomSanitizer) {}

  get aboutHtml() {
    const decodedHtml = decode(this.about);
    return this.sanitizer.bypassSecurityTrustHtml(decodedHtml) as string;;
  }

}
