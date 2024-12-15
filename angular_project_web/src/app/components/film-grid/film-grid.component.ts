import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmFrameComponent } from '../film-frame/film-frame.component';
import { MovieList } from '../../model/Movies';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { GridService } from '../../service/GridSercvice/grid.service';
@Component({
  selector: 'app-film-grid',
  standalone: true,
  imports: [FilmFrameComponent, CommonModule],
  templateUrl: './film-grid.component.html',
  styleUrl: './film-grid.component.css'
})
export class FilmGridComponent {
  @Input() description!: string;
  @Input() displayRow: number = 12;
  @Input() displayFrame: number = 3;
  @Input() films: MovieList[] = []; 
  @Input() notSorting: boolean = true; 
  @Input() pageType: string = ''
  gridService = inject(GridService);

  isHome = false;
  isMovies = false;
  isTvSeries = false;

  constructor(private filmsService: FilmsServiceService) {
    
  }

  moveToPage() {
    switch(this.pageType) {
      case 'movie':
        this.gridService.navigate('/movie');
        break;
      case 'tvseries':
        this.gridService.navigate('/tvseries');
        break;
      // case 'genre':
      //   this.gridService.navigate('/genre');
      //   break;
      // case 'newest':
      //   this.gridService.navigate('/newest');
      //   break;
      // case 'continue':
      //   this.gridService.navigate('/continue');
      //   break;
      default:
        console.error('Unknown page:', this.pageType);
    }
  }
}
