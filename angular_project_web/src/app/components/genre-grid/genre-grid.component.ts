import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { GenreFrameComponent } from '../genre-frame/genre-frame.component';
import { GenreList } from '../../model/Categories';
@Component({
  selector: 'app-genre-grid',
  standalone: true,
  imports: [CommonModule,GenreFrameComponent ],
  templateUrl: './genre-grid.component.html',
  styleUrl: './genre-grid.component.css'
})
export class GenreGridComponent {
  @Input() items!: GenreList[];
  @Input() columns: number = 3; // Số cột mặc định
  @Input() trackByFn: (index: number, item: any) => any = (index, item) => item; // Hàm trackBy tùy chỉnh
  @Input() itemTemplate!: TemplateRef<any>; // TemplateRef để render mỗi item
  @Input() displayFrame: number = 3;
}
