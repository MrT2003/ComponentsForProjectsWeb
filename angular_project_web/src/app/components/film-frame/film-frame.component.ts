import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { MovieService } from '../../service/MovieService/movie.service';
//MODELS
import { MovieList } from '../../model/Movies';
@Component({
  selector: 'app-film-frame',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './film-frame.component.html',
  styleUrl: './film-frame.component.css'
})
export class FilmFrameComponent {

  isComplete = false;

  constructor(private router: Router, private filmsService: FilmsServiceService, private movieService: MovieService) {}

  @Input() item!: MovieList;

  goToDescription(movie: MovieList){
    this.filmsService.goToDescription(movie);
  }


  checkIfComplete() {
    if (this.item.current_episode.startsWith('Hoàn tất') || this.item.current_episode.startsWith('FULL')) {
      this.isComplete = true;
    }
  }

}
