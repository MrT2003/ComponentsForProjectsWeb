import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() maxVisiblePages: number = 5; // Maximum number of visible pages (default: 5)

  @Output() pageChange = new EventEmitter<number>();

  // Get an array of visible page numbers
  getPagesArray(): number[] {
    const pages: number[] = [];

    // Determine the start and end of the visible page range
    const halfRange = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages, this.currentPage + halfRange);

    // Adjust start and end if near the beginning or end of the range
    if (startPage === 1) {
      endPage = Math.min(this.totalPages, this.maxVisiblePages);
    } else if (endPage === this.totalPages) {
      startPage = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Emit event when the previous button is clicked
  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // Emit event when the next button is clicked
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  // Emit event when a specific page is selected
  goToPage(page: number): void {
    this.pageChange.emit(page);
  }
}
