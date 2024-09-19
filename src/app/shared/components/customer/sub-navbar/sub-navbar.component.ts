import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.css'
})


export class SubNavbarComponent {
  @Input({ required: true }) heading!: String;
}
