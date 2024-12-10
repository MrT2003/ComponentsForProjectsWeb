import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

//COMPONENTS
import { LeftMenuComponent } from "../../components/left-menu/left-menu.component";
import { FilmGridComponent } from "../../components/film-grid/film-grid.component";

//SERVICES   
import { MovieService } from '../../service/MovieService/movie.service';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';

//MODELS
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';

@Component({
  selector: 'app-newest-film-page',
  standalone: true,
  imports: [RouterModule, CommonModule, LeftMenuComponent, FilmGridComponent],
  templateUrl: './newest-film-page.component.html',
  styleUrl: './newest-film-page.component.css',
})
export class NewestFilmPageComponent implements OnInit{
  constructor(private router: Router,private filmsService: FilmsServiceService) {} 
  lokiPath = 'assets/images/loki.jpg';
  sideBarPath = 'assets/res-leftmenu/sidebar.png';

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


  

  
  isCollapsed = false; 



  movieService = inject(MovieService)
  movieList = signal<MovieList []>([]);
  newestList = signal<MovieList []>([]);
  selectedMovie = signal<MovieList | null>(null);


  ngOnInit(): void {
    this.loadAllMovies()
    this.loadNewestMovies();
    // this.loadNewestMovies()
  }
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
  // onWatchMovie() { this.router.navigate(['/watch']); }

  loadNewestMovies() {
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items);
    })
  }

  loadAllMovies() {
    this.movieService.getAllMovies().subscribe((res: APIMoviesModel) => {
      this.movieList.set(res.items);
      this.selectRandomMovie(); // Hoặc chọn phim đầu tiên tùy nhu cầu
    });
  }
  selectRandomMovie() {
    const movies = this.movieList(); // Lấy danh sách phim từ signal
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length); // Chọn chỉ số ngẫu nhiên
      this.selectedMovie.set(movies[randomIndex]); // Gán bộ phim ngẫu nhiên vào signal
    }
  }
  goToWatch(movie: MovieList){
    this.filmsService.goToWatch(movie);
  }
  goToDescription(movie: MovieList) {
    this.filmsService.goToDescription(movie);
  }
}
