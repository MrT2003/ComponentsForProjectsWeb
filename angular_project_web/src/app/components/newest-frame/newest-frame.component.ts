import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieList } from '../../model/Movies';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { MovieService } from '../../service/MovieService/movie.service';
import { ListItem } from '../../model/List';
import { WatchListService } from '../../service/WatchListService/watch-list.service';
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

    constructor(private filmsService: FilmsServiceService, private movieService: MovieService, private watchListService: WatchListService) {}
    
    goToWatch(movie: MovieList) {
      this.filmsService.goToWatch(movie);
    }
    addToWatchList(): void {
        this.movieService.getMoviesDetails(this.item.slug).subscribe({ 
            next: (data) => {
            console.log("SHow me",data.movie);
            const watchListItem: Partial<ListItem> = {
              listType: 'watchList',
              movieId: data.movie.id, // Replace 'id' with the actual field name for movie ID
              name: data.movie.original_name,
              poster: data.movie.thumb_url,
              slug: data.movie.slug,
              currentEpisode: data.movie.current_episode, // Default episode for newly added movies
              quality: data.movie.quality || 'HD',
              language: data.movie.language || 'Vietsub',
              year: data.movie.category?.[3]?.list?.[0]?.name,
            };
            console.log("SHow me",watchListItem);
            this.watchListService.addToWatchList(watchListItem).subscribe({
              next: () => {},
              error: (err) => {
                console.error('Error adding movie to Continue List:', err);
              },
            });
            },
            error: (err) => {
                console.error('Error getting movie details:', err);
            },
        });
      }    
}


