import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoadingComponent } from '../../components/loading/loading.component';
//SERVICES 
import { MovieService } from '../../service/MovieService/movie.service';
//MODELS
import { APIMoviesModel, MovieList } from '../../model/Movies';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent, PaginationComponent, LoadingComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent implements OnInit {
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
  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  movieService = inject(MovieService);
  movieList = signal<MovieList[]>([]);
  router = inject(Router);

  currentPage = 1; 
  itemsPerPage = 10; 
  totalItems = 0;
  totalPages = 0; 
  loading = true;

  ngOnInit(): void {
    // this.loadAllMovies();
    this.loadMoviesByPages(this.currentPage);
    setTimeout(() => {
      this.loading = false; // Set loading to false after 1 second
    }, 400);
  }
  
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
  onSetting(): void {
    this.router.navigate(['/settings']);
  }
  loadAllMovies() {
    this.movieService.getAllMovies().subscribe((res:APIMoviesModel) => {
      this.movieList.set(res.items);
    })
  }
 
  loadMoviesByPages(page: number) {
    this.movieService.getMoviesByPages(page).subscribe((res: APIMoviesModel) => {
      this.movieList.set(res.items);
      this.totalItems = res.paginate.total_items; // Cập nhật totalItems từ phản hồi của API
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Tính lại tổng số trang
    });
  }


  goToDescription(movie: MovieList) {
    this.router.navigate(['/description'], {
      queryParams: {
        name: movie.name,
        thumb_url: movie.thumb_url,
        description: movie.description,
        poster_url: movie.poster_url,
      },
    });
  }

  pageChanged(newPage: number) { 
    this.currentPage = newPage; 
    this.loadMoviesByPages(newPage);
    }


  
}

