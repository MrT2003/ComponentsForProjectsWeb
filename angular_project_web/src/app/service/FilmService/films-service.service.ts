import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MovieList } from '../../model/Movies';
@Injectable({
  providedIn: 'root'
})
export class FilmsServiceService {

  constructor(private router: Router) {}

  // Navigate to the description page with the movie's data
  goToDescription(movie: MovieList) {
    this.router.navigate(['/description'], {
      queryParams: {
        name: movie.original_name,
        thumb_url: movie.thumb_url,
        description: movie.description,
        poster_url: movie.poster_url,
      },
    });
  }

  // Navigate to the watch page with the movie's data
  goToWatch(movie: MovieList) {
    this.router.navigate(['/watch'], {
      queryParams: {
        name: movie.original_name,
        total_episodes: movie.total_episodes,
        poster_url: movie.poster_url,
        slug: movie.slug,
      },
    });
  }
}
