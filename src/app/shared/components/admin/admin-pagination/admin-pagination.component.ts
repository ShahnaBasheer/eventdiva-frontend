import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-pagination',
  standalone: true,
  imports: [ CommonModule  ],
  templateUrl: './admin-pagination.component.html',
  styleUrl: './admin-pagination.component.css'
})

export class AdminPaginationComponent {
  @Output() pageCountEmitter = new EventEmitter<number>();
  @Input({required: true}) totalPages!: number;
  pages: number[] = [];
  selectedPage = 1;



  onSelectPage(page: number){
    if (page > 0 && page <= this.totalPages) {
      this.selectedPage = page;
      this.pageCountEmitter.emit(page);
    }
  }

  ngOnInit(){
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
