import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewestList, MovieList } from '../../model/Movies';

import { FilmsServiceService } from '../../service/FilmService/films-service.service';
@Component({
  selector: 'app-center-film-frame',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './center-film-frame.component.html',
  styleUrl: './center-film-frame.component.css',
})
export class CenterFilmFrameComponent {
  @Input() newestFilm: MovieList[] = [];

  constructor(private filmsService: FilmsServiceService) {}

  router = inject(Router);

  goToWatch(movie: MovieList) {
    this.router.navigate(['/watch'], {
      queryParams: {
        name: movie.name,
        total_episodes: movie.total_episodes,
        poster_url: movie.poster_url,
        slug: movie.slug,
      },
    });
  }
}
