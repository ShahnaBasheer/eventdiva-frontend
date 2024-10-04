import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-search',
  standalone: true,
  imports: [ CommonModule, FormsModule, ],
  templateUrl: './sort-search.component.html',
  styleUrl: './sort-search.component.css'
})
export class SortSearchComponent {
  limit: number = 10;

  @Output() limitEmitter = new EventEmitter<number>();


  onSelectPageSize(value: number){
    this.limitEmitter.emit(value);
  }



}
