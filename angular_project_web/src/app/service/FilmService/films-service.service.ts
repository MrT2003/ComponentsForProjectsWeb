import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MovieList } from '../../model/Movies';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilmsServiceService {

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private router: Router) {}
  // Navigate to the description page with the movie's data
  goToDescription(movie: any) {
    this.loadingSubject.next(true);
    // Safely extract genre names from category.2.list
    const genres = movie.category?.[2]?.list
      ?.map((item: any) => item.name) // Map each item to its name
      .join(', '); // Join names into a single string
    const year = movie.category?.[3]?.list?.[0]?.name;
    this.router.navigate(['/description'], {
      queryParams: {
        id: movie.id,
        year: year,
        name: movie.original_name,
        poster_url: movie.poster_url,
        slug: movie.slug,
        current_episode: movie.current_episode,
        quality: movie.quality,
        language: movie.language,
        thumb_url: movie.thumb_url,
        description: movie.description,
        genres: genres || '', // Pass an empty string if genres is undefined
        movie: JSON.stringify(movie),
      },
    });

  }
  setLoading() {
    this.loadingSubject.next(false);
  }
  // Navigate to the watch page with the movie's data
  goToWatch(movie: any) {
    this.router.navigate(['/watch'], {
      queryParams: {
        id: movie.id,
        name: movie.original_name,
        // total_episodes: movie.total_episodes,
        poster_url: movie.poster_url,
        slug: movie.slug,
        movie: JSON.stringify(movie)
      },
    });
  }
}
