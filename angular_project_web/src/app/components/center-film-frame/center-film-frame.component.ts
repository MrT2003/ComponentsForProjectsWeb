import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewestList, MovieList } from '../../model/Movies';

import { FilmsServiceService } from '../../service/films-service.service';
@Component({
  selector: 'app-center-film-frame',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './center-film-frame.component.html',
  styleUrl: './center-film-frame.component.css'
})
export class CenterFilmFrameComponent {
    @Input() newestFilm: MovieList[] = [];

    constructor(private filmsService: FilmsServiceService) {}

    goToWatch(movie: MovieList){
      this.filmsService.goToWatch(movie);
    }
}
