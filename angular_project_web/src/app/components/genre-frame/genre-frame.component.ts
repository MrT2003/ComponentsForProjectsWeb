import { Component, Input } from '@angular/core';

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
}
