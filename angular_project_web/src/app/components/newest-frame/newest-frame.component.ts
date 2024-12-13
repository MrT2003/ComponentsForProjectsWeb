import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieList } from '../../model/Movies';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';

@Component({
  selector: 'app-newest-frame',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './newest-frame.component.html',
  styleUrl: './newest-frame.component.css'
})
export class NewestFrameComponent {
    @Input() poster_url!: string;
    @Input() name!: string;
    @Input() current_episode!: string;
    @Input() item!: MovieList;

    constructor(private filmsService: FilmsServiceService) {}

    
    goToWatch(movie: MovieList) {
      this.filmsService.goToWatch(movie);
    }
}


