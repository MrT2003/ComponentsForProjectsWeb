import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewestList, MovieList } from '../../model/Movies';

import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { ContnListService } from '../../service/ContnListService/contn-list.service';
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
  authService = inject(AuthService);
  contListService = inject(ContnListService);

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

  // goToWatch(movie: MovieList) {
  //   const userId = this.authService.getUserId();
  //   if (userId) {
  //     // const continueMovie = this.mapMovieToContinue(movie, userId); // Sửa thành userId
  //     this.contListService.postContinueList(continueMovie).subscribe({
  //       next: (res) => {
  //         console.log('Movie added to Continue List:', res);
  //         this.router.navigate(['/watch'], {
  //           queryParams: {
  //             name: movie.name,
  //             thumb_url: movie.thumb_url,
  //             total_episodes: movie.total_episodes,
  //             poster_url: movie.poster_url,
  //             slug: movie.slug,
  //           },
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Error adding movie to Continue List:', err);
  //       },
  //     });
  //   } else {
  //     console.error('User is not logged in or userId is missing');
  //   }
  // }

  // private mapMovieToContinue(
  //   movie: MovieList,
  //   userId: string
  // ): Partial<PostContinueMovie> {
  //   return {
  //     userId: userId,
  //     movieId: movie.slug, // Sử dụng slug làm movieId
  //     name: movie.name,
  //     poster: movie.poster_url,
  //     slug: movie.slug,
  //     currentEpisode: movie.current_episode || '1', // Mặc định là tập 1
  //     quality: movie.quality,
  //     language: movie.language || 'en',
  //     year: new Date(movie.created).getFullYear().toString(),
  //     listType: 'continue',
  //     totalUploadEpisodes: movie.total_episodes,
  //     clickedEpisode: 1, // Mặc định tập đầu tiên được click
  //     process: '0%', // Mặc định là chưa xem
  //   };
  // }
}
