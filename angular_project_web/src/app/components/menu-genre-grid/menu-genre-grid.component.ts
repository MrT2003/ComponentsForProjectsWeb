import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { GenreFrameComponent } from '../genre-frame/genre-frame.component';
import { GenreList } from '../../model/Categories';
@Component({
  selector: 'app-menu-genre-grid',
  standalone: true,
  imports: [CommonModule,GenreFrameComponent ],
  templateUrl: './menu-genre-grid.component.html',
  styleUrl: './menu-genre-grid.component.css'
})
export class MenuGenreGridComponent {
  @Input() items!: GenreList[];
  @Input() columns: number = 2; // Số cột mặc định
  @Input() trackByFn: (index: number, item: any) => any = (index, item) => item; // Hàm trackBy tùy chỉnh
  @Input() itemTemplate!: TemplateRef<any>; // TemplateRef để render mỗi item
  @Input() displayFrame: number = 2;


  
}
