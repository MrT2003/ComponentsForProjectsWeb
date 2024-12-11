import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

//COMPONENTS
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { RightMenuComponent } from '../../components/right-menu/right-menu.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
import { CenterFilmFrameComponent } from '../../components/center-film-frame/center-film-frame.component';
//SERVICES

import { MovieService } from '../../service/MovieService/movie.service';
//MODELS
import {
  APIMoviesModel,
  MovieList,
  NewestList,
  TvList,
} from '../../model/Movies';
import { GenreList } from '../../model/Categories';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    LeftMenuComponent,
    RightMenuComponent,
    CenterFilmFrameComponent,
    FilmGridComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  image1 = 'assets/images/image_1.jpg';
  image2 = 'assets/images/image_2.jpg';
  image3 = 'assets/images/image_3.jpg';
  lokiPath = 'assets/images/loki.jpg';

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

  //img right menu
  newest = 'assets/res-rightmenu/rick.jpg';
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';

  constructor(
    private router: Router,
    private filmsService: FilmsServiceService,
    private menuToggleService: MenuToggleService
  ) {}

  movieService = inject(MovieService);

  movieList = signal<MovieList[]>([]);
  tvList = signal<TvList[]>([]);
  newestList = signal<NewestList[]>([]);
  genreList = signal<GenreList[]>([]);

  isExpanded = false;
  moveRight = false;
  moveRightFull = false;
  leftMenuOpen: boolean = false;
      
  ngOnInit(): void {
    this.loadAllMovies();
    this.loadAllTvSeries();
    this.loadNewestMovies();
    this.menuToggleService.rightMenuState$.subscribe((state) => {
      this.isExpanded = !state; // Use isCollapsed to control visibility (inverted logic)
    });
    this.menuToggleService.menuState$.subscribe((state) => {
      this.leftMenuOpen = state;
    });
    if ((this.isExpanded && this.leftMenuOpen) || this.leftMenuOpen) {
      this.moveRight = true;
    }
    if (!this.isExpanded && this.leftMenuOpen) {
      this.moveRightFull = true;
    }
  }

  toggleRightMenu() {
    this.isExpanded = !this.isExpanded;
  }

  loadAllMovies() {
    this.movieService.getAllMovies().subscribe((res: APIMoviesModel) => {
      this.movieList.set(res.items);
    });
  }

  loadAllTvSeries() {
    this.movieService.getAllTvSeries().subscribe((res: APIMoviesModel) => {
      this.tvList.set(res.items);
    });
  }

  loadNewestMovies() {
    this.movieService.getNewestMovies().subscribe((res: APIMoviesModel) => {
      this.newestList.set(res.items);
    });
  }

  onSetting(): void {
    this.router.navigate(['/settings']);
  }

  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  goToWatch(movie: MovieList) {
    this.filmsService.goToWatch(movie);
  }
  
  goToDescription(movie: MovieList) {
    this.filmsService.goToDescription(movie);
  }
}
