import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { GenreList } from '../../model/Categories';

@Component({
  selector: 'app-genre-frame',
  standalone: true,
  imports: [],
  templateUrl: './genre-frame.component.html',
  styleUrl: './genre-frame.component.css'
})
export class GenreFrameComponent {
    @Input() image!: string;
    @Input() name!: string;
    @Input() itemTemplate!: TemplateRef<any>; // TemplateRef để render mỗi item
    @Input() item!: GenreList;
}
