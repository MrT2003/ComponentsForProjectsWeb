import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmFrameComponent } from '../film-frame/film-frame.component';
import { MovieList } from '../../model/Movies';
@Component({
  selector: 'app-film-grid',
  standalone: true,
  imports: [FilmFrameComponent, CommonModule],
  templateUrl: './film-grid.component.html',
  styleUrl: './film-grid.component.css'
})
export class FilmGridComponent {
  @Input() description!: string;
  @Input() displayFrame: number = 3;
  @Input() films: MovieList[] = []; 
  @Input() notSorting: boolean = true; 
}
