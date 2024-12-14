import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User} from '../../../model/User';
//SERVICES   
import { MenuToggleService } from '../../../service/MenuService/menu-toggle-service.service';
import { MovieService } from '../../../service/MovieService/movie.service';
import { AuthService } from '../../../service/AuthService/auth.service';
//MODELS
import { APIMoviesModel, MovieList } from '../../../model/Movies';
@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit{

  search = 'assets/images/search-icon.png';
  filter = 'assets/images/Filter.png';
  logo = 'assets/images/logo.png';
  avt = 'assets/images/avatar.jpg';
  searchText: string = '';
  movieList = signal<MovieList []>([]);
  filteredMovies = signal<MovieList []>([]);
  isHome = false;
  isMovies = false;
  isTvSeries = false;

  user: User | null = null;

  movieService = inject(MovieService)

  ngOnInit(): void {
    this.loadMovies();
    this.user = this.authService.getUser();
    this.authService.currentUser$.subscribe((user) => {
      console.log('Current user:', user); // Debugging user data
      this.user = user;
    });
  }

  constructor(private menuToggleService: MenuToggleService, private authService: AuthService) {
    this.setActivePage('home');
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe((res: APIMoviesModel) => {
      this.movieList.set(res.items);
    });
  }

  onSearch(): void {
    const searchText = this.searchText.trim().toLowerCase(); // Lấy giá trị từ input và chuyển thành chữ thường
    const movies = this.movieList(); // Lấy mảng phim từ signal

    if (searchText) {
      // Tìm phim có tên chứa giá trị tìm kiếm
      const filtered = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchText)
      );
      this.filteredMovies.set(filtered); // Cập nhật filteredMovies
    } else {
      // Nếu không có gì để tìm kiếm, xóa danh sách kết quả
      this.filteredMovies.set([]);
    }
  }
  setActivePage(page: string) {
    this.isHome = page === 'home';
    this.isMovies = page === 'movies';
    this.isTvSeries = page === 'tvseries';
  }
  onLogoClick() {
    this.menuToggleService.toggleLeftMenu();
  }
  toggleRightMenu() {
    this.menuToggleService.toggleRightMenu();
  }
}
