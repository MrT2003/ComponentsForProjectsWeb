import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/User';
// SERVICES
import { MenuToggleService } from '../../../service/MenuService/menu-toggle-service.service';
import { MovieService } from '../../../service/MovieService/movie.service';
import { AuthService } from '../../../service/AuthService/auth.service';
// MODELS
import { APIMoviesModel, MovieList } from '../../../model/Movies';
import { FilmsServiceService } from '../../../service/FilmService/films-service.service';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit {
  search = 'assets/images/search-icon.png';
  filter = 'assets/images/Filter.png';
  logo = 'assets/images/logo.png';
  avt = 'assets/images/avatar.jpg';
  searchText: string = '';
  movieList = signal<MovieList[]>([]);
  filteredMovies = signal<MovieList[]>([]);
  isHome = false;
  isMovies = false;
  isTvSeries = false;

  user: User | null = null;

  // movieService = inject(MovieService);

  @Input() slug!: string;
  slugChoose!: string;
  @Input() item!: any;

  constructor(
    private menuToggleService: MenuToggleService,
    private authService: AuthService,
    private filmsService: FilmsServiceService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load toàn bộ danh sách phim khi khởi tạo
    this.loadMovies();

    // Lấy thông tin user hiện tại
    this.user = this.authService.getUser();
    this.authService.currentUser$.subscribe((user) => {
      console.log('Current user:', user);
      this.user = user;
    });

    this.router.events.subscribe(() => {
      this.setActivePage();
    });

    // Set active page on init
    this.setActivePage();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (res: APIMoviesModel) => {
        this.movieList.set(res.items);
        this.filteredMovies.set(res.items); // Hiển thị danh sách đầy đủ ban đầu
      },
      (err) => {
        console.error('Error fetching movies:', err);
      }
    );
  }

  onSearch(): void {
    const searchText = this.searchText.trim();
    if (searchText) {
      this.searchMovies(searchText);
    } else {
      // Nếu ô tìm kiếm trống, hiển thị lại toàn bộ danh sách
      this.filteredMovies.set(this.movieList());
    }
  }

  searchMovies(searchText: string): void {
    this.movieService.getMoviesByKey(searchText).subscribe(
      (res) => {
        this.filteredMovies.set(res.items);
      },
      (err) => {
        console.error('Error searching movies:', err);
      }
    );
  }

  setActivePage() {
    const currentPath = this.router.url;
    this.isHome = currentPath === '/home';
    this.isMovies = currentPath === '/movie';
    this.isTvSeries = currentPath === '/tvseries';
  }

  onLogoClick() {
    this.menuToggleService.toggleLeftMenu();
  }

  toggleRightMenu() {
    this.menuToggleService.toggleRightMenu();
  }

  getSlug(movie: MovieList) {
    if (movie.slug) {
      this.slugChoose = movie.slug;
    } else if (this.slug) {
      this.slugChoose = this.slug;
    }
  }

  goToDescriptionFromSearch(movie: MovieList) {
    this.filmsService.goToDescription(movie);
    this.filteredMovies.set([]);
    this.searchText = ''; // Xóa text đã nhập

    this.getSlug(movie);
    this.movieService.getMoviesDetails(this.slugChoose).subscribe((data) => {
      console.log('Show movie details:', data);
      this.filmsService.goToDescription(data.movie);
    });

  }
}
