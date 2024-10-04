import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.css'
})


export class SubNavbarComponent {
  @Input({ required: true }) heading!: String;

  searchTerm: string = '';

  // EventEmitter to send search term to the parent component
  @Output() searchEvent = new EventEmitter<string>();

  // Function triggered when Enter is pressed
  onSearch() {
    this.searchEvent.emit(this.searchTerm); // Emit search term to parent
  }
}
