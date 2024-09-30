import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VendorPaginationComponent } from '../../vendors/vendor-pagination/vendor-pagination.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [VendorPaginationComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})


export class PaginationComponent {
  @Output() pageCountEmitter = new EventEmitter<number>();
  @Input({required: true}) totalPages = 1;
  pages: number[] = [];
  selectedPage = 1;



  onSelectPage(page: number){
    if (page > 0 && page <= this.totalPages) {
      this.pageCountEmitter.emit(page);
      this.selectedPage = page;
    }
  }

  ngOnInit(){
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
