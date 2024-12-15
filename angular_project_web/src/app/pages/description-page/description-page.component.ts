import { Component, OnInit, signal, inject, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, first  } from 'rxjs';
//COMPONENTS
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
import { LoadingComponent } from '../../components/loading/loading.component';
//SERVICES
import { MovieService } from '../../service/MovieService/movie.service';
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { ContinueListService } from '../../service/ContinueListService/continue-list.service';
import { FavoriteListService } from '../../service/FavoriteListService/favorite-list.service';
import { WatchListService } from '../../service/WatchListService/watch-list.service';
//MODELS
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { ListItem } from '../../model/List';
import { MovieDetail } from '../../model/WatchMovies';


@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent, LeftMenuComponent, LoadingComponent],
  templateUrl: './description-page.component.html',
  styleUrl: './description-page.component.css',
})
export class DescriptionPageComponent implements OnInit {
  wedPath = 'assets/images/Wednesday.png';
  lokiPath = 'assets/images/loki.jpg';
  bg = 'assets/images/image.png';

  isWatch$ = new BehaviorSubject<boolean>(false);
  isFavorite$ = new BehaviorSubject<boolean>(false);

  isWatchSubject = this.isWatch$.asObservable();
  isFavoriteSubject = this.isFavorite$.asObservable();

  loading = true;

  isLeftMenuOpen = false;
  description!: any;

  routerDesc = inject(Router);
  constructor(private activeRouter: ActivatedRoute,
              private menuToggleService: MenuToggleService,
              private continueListService: ContinueListService,
              private favoriteListService: FavoriteListService,
              private watchListService: WatchListService,
              private filmsService: FilmsServiceService ) {}
  movieService = inject(MovieService);
  newestList = signal<NewestList[]>([]);
  // @Input() item!: MovieList;


  ngOnInit(): void {
    this.loadDescription();
    this.loadNewestMovies();
    this.menuToggleService.menuState$.subscribe((state) => {
      this.isLeftMenuOpen = state;
    });

    // Simulate a 1-second loading delay
    setTimeout(() => {
      this.loading = false; // Set loading to false after 1 second
    }, 400);
  }


  loadDescription() {
    this.activeRouter.queryParams.subscribe((params) => {
      this.description = params;
      if (this.description.id !== undefined) {
        console.log('Description ID:', this.description.id);
        this.checkInitialIcon();
      }
      console.log('Description:', this.description);
    });
  }

  loadNewestMovies(){
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items);
    })
    console.log(this.newestList);
  }
  goToWatch(movie: MovieList) {
    this.filmsService.goToWatch(movie);
  }

  addToContinueList(): void {
    const continueListItem: Partial<ListItem> = {
      listType: 'continueList',
      movieId: this.description.id, // Replace 'id' with the actual field name for movie ID
      name: this.description.name,
      poster: this.description.thumb_url,
      slug: this.description.slug,
      currentEpisode: this.description.current_episode, // Default episode for newly added movies
      quality: this.description.quality || 'HD',
      language: this.description.language || 'Vietsub',
      year: this.description.year,

    };
    this.continueListService.addToContinueList(continueListItem).subscribe({
      next: () => {
        // this.goToWatch(this.description); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error adding movie to Continue List:', err);
    }});
    this.goToWatch(this.description);
  }
  addToFavoriteList(): void {
    const favoriteListItem: Partial<ListItem> = {
      listType: 'favoriteList',
      movieId: this.description.id, // Replace 'id' with the actual field name for movie ID
      name: this.description.name,
      poster: this.description.thumb_url,
      slug: this.description.slug,
      currentEpisode: this.description.current_episode, // Default episode for newly added movies
      quality: this.description.quality || 'HD',
      language: this.description.language || 'Vietsub',
      year: this.description.year,
    };

    this.favoriteListService.addToFavoriteList(favoriteListItem).subscribe({
      next: () => {
        this.isFavorite$.next(true); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error adding movie to Continue List:', err);
      },
    });
  }

  deleteFavoriteList(): void {
    this.favoriteListService.deleteFromFavoriteList(this.description.id).subscribe({
      next: () => {
        this.isFavorite$.next(false); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error deleting movie from Favorite List:', err);
      },
    });
  }

  addToWatchList(): void {
    const watchListItem: Partial<ListItem> = {
      listType: 'watchList',
      movieId: this.description.id, // Replace 'id' with the actual field name for movie ID
      name: this.description.name,
      poster: this.description.thumb_url,
      slug: this.description.slug,
      currentEpisode: this.description.current_episode, // Default episode for newly added movies
      quality: this.description.quality || 'HD',
      language: this.description.language || 'Vietsub',
      year: this.description.year,
    };

    this.watchListService.addToWatchList(watchListItem).subscribe({
      next: () => {
        this.isWatch$.next(true); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error adding movie to Continue List:', err);
      },
    });
  }

  deleteWatchList(): void {
    this.watchListService.deleteFromWatchList(this.description.id).subscribe({
      next: () => {
        this.isWatch$.next(false); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error deleting movie from Favorite List:', err);
      },
    });
  }
  toggleWatchList(): void {
    if (!this.isWatch$.value) {
      this.addToWatchList();
    } else {
      this.deleteWatchList();
    }
    this.isWatch$.next(!this.isWatch$.value);
  }

  checkInitialIcon(): void {
    this.favoriteListService.getFavoriteList().subscribe({
      next: (data) => {
        const found = data.find((item) => item.movieId === this.description.id);
        this.isFavorite$.next(!!found);
        console.log('Initial favorite status:', this.isFavorite$.value);
      },
      error: (err) => console.error('Error fetching favorite list:', err),
    });
    this.watchListService.getWatchList().subscribe({
      next: (data) => {
        const found = data.find((item) => item.movieId === this.description.id);
        this.isWatch$.next(!!found);
        console.log('Initial watch status:', this.isWatch$.value);
      },
      error: (err) => console.error('Error fetching watch list:', err),
    });
  }
  saveAndWatch(){
    // this.addToContinueList();
    this.goToWatch(this.description);
  }

}

