import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vendor-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-pagination.component.html',
  styleUrl: './vendor-pagination.component.css'
})


export class VendorPaginationComponent {
  @Output() pageCountEmitter = new EventEmitter<number>();
  @Input({required: true}) totalPages: number = 1;
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
