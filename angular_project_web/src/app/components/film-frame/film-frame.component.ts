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

  @Input() quality!: string;
  @Input() language!: string;
  @Input() thumb_url!: string;
  @Input() original_name!: string;
  @Input() year!: string;
  @Input() current_episode!: string;
  @Input() slug!: string;
  slugChoose!: string;

  constructor(private router: Router, private filmsService: FilmsServiceService, private movieService: MovieService) {}
  @Input() item!: any;

  goToDescription() {
    this.getSlug();
    this.movieService.getMoviesDetails(this.slugChoose).subscribe((data) => {
      console.log("SHow me",data);
      this.filmsService.goToDescription(data.movie);
    });
  }

  checkIfComplete() {
    if (this.item.current_episode.startsWith('Hoàn tất') || this.item.current_episode.startsWith('FULL')) {
      this.isComplete = true;
    }
  }
  getSlug() {
    if (this.item.slug) {
      this.slugChoose  = this.item.slug;
    } else
    if (this.slug)
    {
      this.slugChoose = this.slug;
    }
  }

}
