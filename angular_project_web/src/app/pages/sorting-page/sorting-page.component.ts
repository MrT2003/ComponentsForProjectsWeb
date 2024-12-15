import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
//COMPONENTS
import { LeftMenuComponent } from "../../components/left-menu/left-menu.component";
import { FilmFrameComponent } from '../../components/film-frame/film-frame.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

//SERVICES
import { CategoryService } from '../../service/CategoryService/category.service';
import { MovieService } from '../../service/MovieService/movie.service';
//MODELS
import { APIMoviesModel, MovieList } from '../../model/Movies';
import { CountryList, GenreList, YearList } from '../../model/Categories';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sorting-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LeftMenuComponent, FilmFrameComponent, FilmGridComponent, PaginationComponent],
  templateUrl: './sorting-page.component.html',
  styleUrl: './sorting-page.component.css',
})
export class SortingPageComponent implements OnInit {
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

  categoryService = inject(CategoryService);
  genreList = signal<GenreList[]>([]);
  yearList = signal<YearList[]>([]);
  countryList = signal<CountryList[]>([]);

  movieService = inject(MovieService);
  movieList = signal<MovieList[]>([]);

  selectedGenre: string = '';
  selectedYear: string = '';
  selectedCountry: string = '';

  currentPage = 1; 
  itemsPerPage = 10; 
  totalItems = 0;
  totalPages = 0; 
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadGenres();
    this.loadYears();
    this.loadCountries();

    this.route.queryParams.subscribe(params => {
      if (params['genre']) {
        this.selectedGenre = params['genre'];
        this.filterMovies();
        
      }
    });
  }
  loadGenres() {
    this.categoryService.getAllGenres().subscribe((res: GenreList[]) => {
      this.genreList.set(res);
    });
  }

  loadYears() {
    this.categoryService.getAllYears().subscribe((res: YearList[]) => {
      this.yearList.set(res);
    });
  }

  loadCountries() {
    this.categoryService.getAllCoutries().subscribe((res: CountryList[]) => {
      this.countryList.set(res);
    });
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  filterMovies() {
    if (this.selectedYear) {
      this.movieService.getMoviesByYears(this.selectedYear).subscribe(
        (res) => {
          this.movieList.set(res.items);
        },
        (err) => {
          console.error('Error fetching movies by year:', err);
        }
      );
    } else if (this.selectedGenre) {
      this.movieService.getMoviesByGenres(this.selectedGenre).subscribe(
        (res) => {
          this.movieList.set(res.items);
        },
        (err) => {
          console.error('Error fetching movies by genre:', err);
        }
      );
    } else if (this.selectedCountry) {
      this.movieService.getMoviesByCountries(this.selectedCountry).subscribe(
        (res) => {
          this.movieList.set(res.items);
        },
        (err) => {
          console.error('Error fetching movies by country:', err);
        }
      );
    } else {
      console.warn('No filters selected!');
    }
    this.loadMoviesByPages(this.currentPage);
  }

  resetFilters() {
    // Xóa giá trị đã chọn cho year, genre, và country
    this.selectedYear = '';
    this.selectedCountry = '';
    this.selectedGenre = '';

    // Reset danh sách phim
    this.movieList.set([]);

    console.log('Filters reset. Ready for new selection!');
  }

  loadMoviesByPages(page: number) {
    let observable;

    if (this.selectedYear) {
      observable = this.movieService.getMoviesByYearsAndPages(this.selectedYear, this.currentPage);
    } else if (this.selectedGenre) {
      observable = this.movieService.getMoviesByGenresAndPages(this.selectedGenre, this.currentPage);
    } else if (this.selectedCountry) {
      observable = this.movieService.getMoviesByCountriesAndPages(this.selectedCountry, this.currentPage);
    } else {
      observable = this.movieService.getMoviesByPages(page); // Default to all movies if no filters
    }

    observable.subscribe((res: APIMoviesModel) => {
      this.movieList.set(res.items);
      this.totalItems = res.paginate.total_items; 
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }
  pageChanged(newPage: number) { 
    this.currentPage = newPage; 
    this.loadMoviesByPages(newPage);
    }

    
}
