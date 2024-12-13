import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
//SERVICES
import { MovieService } from '../../service/MovieService/movie.service';
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';
import { ContinueListService } from '../../service/ContinueListService/continue-list.service';
import { FavoriteListService } from '../../service/FavoriteListService/favorite-list.service';
//MODELS
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { ListItem } from '../../model/List';

@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent, LeftMenuComponent],
  templateUrl: './description-page.component.html',
  styleUrl: './description-page.component.css',
})
export class DescriptionPageComponent implements OnInit {
  wedPath = 'assets/images/Wednesday.png';
  lokiPath = 'assets/images/loki.jpg';
  bg = 'assets/images/image.png';

  // icon left menu
  show = 'assets/res-leftmenu/Arrow down-circle.png';
  home = 'assets/res-leftmenu/Squircle.png';
  sort = 'assets/res-leftmenu/Discover.png';
  recent = 'assets/res-leftmenu/Recent.png';
  playlists = 'assets/res-leftmenu/Playlists.png';
  watchlist = 'assets/res-leftmenu/Watchlist.png';
  continue = 'assets/res-leftmenu/Continue.png';
  settings = 'assets/res-leftmenu/Settings.png';
  logout = 'assets/res-leftmenu/Log Out.png';
  sideBarPath = 'assets/res-leftmenu/sidebar.png';

  isLeftMenuOpen = false;
  isFavorite = false;

  description: any;
  routerDesc = inject(Router);
  constructor(private activeRouter: ActivatedRoute, private router: Router, private menuToggleService: MenuToggleService, private continueListService: ContinueListService, private favoriteListService: FavoriteListService) {}
  movieService = inject(MovieService);
  newestList = signal<NewestList[]>([]);

  ngOnInit(): void {
    this.loadDescription()
    this.checkInitialFavorite();
    this.loadNewestMovies();
    this.menuToggleService.menuState$.subscribe((state) => {
      this.isLeftMenuOpen = state;
    })
  }

  loadDescription() {
    this.activeRouter.queryParams.subscribe((params) => {
      this.description = params;
      console.log('Description:', this.description);
    });
  }

  loadNewestMovies(){
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items);
    })
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
        this.router.navigate(['/watch']); // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error adding movie to Continue List:', err);
      },
    });
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
        this.isFavorite = true; // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error adding movie to Continue List:', err);
      },
    });
  }
  deleteFavoriteList(): void {
    this.favoriteListService.deleteFromFavoriteList(this.description.id).subscribe({
      next: () => {
        this.isFavorite = false; // Navigate to the watch page
      },
      error: (err) => {
        console.error('Error deleting movie from Favorite List:', err);
      },
    });
  }

  checkInitialFavorite(): void {
    this.favoriteListService.getFavoriteList().subscribe({
      next: (data) => {
        const found = data.find((item) => item.movieId === this.description.id);
        this.isFavorite = !!found;
      },
      error: (err) => console.error('Error fetching favorite list:', err),
    });
  }
}
