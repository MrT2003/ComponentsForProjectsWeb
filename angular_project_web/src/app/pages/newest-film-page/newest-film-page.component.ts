import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

//COMPONENTS
import { LeftMenuComponent } from "../../components/left-menu/left-menu.component";
import { FilmGridComponent } from "../../components/film-grid/film-grid.component";

//SERVICES
import { MovieService } from '../../service/MovieService/movie.service';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';

//MODELS
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { NewfilmFrameComponent } from "../../components/newfilm-frame/newfilm-frame.component";

@Component({
  selector: 'app-newest-film-page',
  standalone: true,
  imports: [RouterModule, CommonModule, LeftMenuComponent, FilmGridComponent, NewfilmFrameComponent],
  templateUrl: './newest-film-page.component.html',
  styleUrl: './newest-film-page.component.css',
})

export class NewestFilmPageComponent implements OnInit{
// newest: any;
// displayFrame: any;



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

  @Input() newest: NewestList[] = [];
  @Input() displayFrame: number = 3;



  // isCollapsed = false;
  isLeftMenuOpen = false;


  movieService = inject(MovieService)
  movieList = signal<MovieList []>([]);
  newestList = signal<MovieList []>([]);
  selectedMovie = signal<MovieList | null>(null);
  // hoveredMovie!: MovieList

  hoveredMovie: MovieList = {
    name: '',
    slug: '',
    original_name: '',
    thumb_url: '',
    poster_url: '',
    created: '',
    modified: '',
    description: '',
    total_episodes: 0,
    current_episode: '',
    time: '',
    quality: '',
    language: '',
    director: '',
    casts: ''
  };

  ngOnInit(): void {
    this.loadAllMovies()
    this.loadNewestMovies();
  }
  // toggleMenu(): void {
  //   this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  // }
  // onWatchMovie() { this.router.navigate(['/watch']); }

  updateHoveredMovie(movie: MovieList) { this.hoveredMovie = movie; }

  loadNewestMovies() {
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items);

      if (this.newestList().length > 0) {
        // Gán giá trị đầu tiên của newestList cho hoveredMovie
        this.hoveredMovie = this.newestList()[0];
      }

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
    this.movieService.getMoviesDetails(movie.slug).subscribe((data) => {
      console.log("SHow me",data);
      this.filmsService.goToDescription(data.movie);
    });
  }

  scrollLeft() {
    const container = document.querySelector('.container-row');
    if (container) {
      container.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    const container = document.querySelector('.container-row');
    if (container) {
      container.scrollBy({
        left: 300, // Adjust the scroll amount as needed
        behavior: 'smooth'
      });
    }
  }

}
