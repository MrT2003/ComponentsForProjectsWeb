import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIMoviesModel, MovieList } from '../../model/Movies';
import { MasterService } from '../../service/master.service';
import { CountryList, GenreList, YearList } from '../../model/Categories';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sorting-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
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

  masterService = inject(MasterService);
  genreList = signal<GenreList[]>([]);
  yearList = signal<YearList[]>([]);
  countryList = signal<CountryList[]>([]);
  movieList = signal<MovieList[]>([]);

  selectedGenre: string = '';
  selectedYear: string = '';
  selectedCountry: string = '';

  ngOnInit(): void {
    this.loadGenres();
    this.loadYears();
    this.loadCountries();
  }
  loadGenres() {
    this.masterService.getAllGenres().subscribe((res: GenreList[]) => {
      this.genreList.set(res);
    });
  }

  loadYears() {
    this.masterService.getAllYears().subscribe((res: YearList[]) => {
      this.yearList.set(res);
    });
  }

  loadCountries() {
    this.masterService.getAllCoutries().subscribe((res: CountryList[]) => {
      this.countryList.set(res);
    });
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  filterMovies() {
    if (this.selectedYear) {
      this.masterService.getMoviesByYears(this.selectedYear).subscribe(
        (res) => {
          this.movieList.set(res.items);
        },
        (err) => {
          console.error('Error fetching movies by year:', err);
        }
      );
    } else if (this.selectedGenre) {
      this.masterService.getMoviesByGenres(this.selectedGenre).subscribe(
        (res) => {
          this.movieList.set(res.items);
        },
        (err) => {
          console.error('Error fetching movies by genre:', err);
        }
      );
    } else if (this.selectedCountry) {
      this.masterService.getMoviesByCountries(this.selectedCountry).subscribe(
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
}
