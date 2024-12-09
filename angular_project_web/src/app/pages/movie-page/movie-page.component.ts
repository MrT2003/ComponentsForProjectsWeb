import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { APIMoviesModel, MovieList } from '../../model/Movies';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent],
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

  masterService = inject(MasterService);
  movieList = signal<MovieList[]>([]);
  router = inject(Router);


  ngOnInit(): void {
    this.loadAllMovies();
  }
  
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
  onSetting(): void {
    this.router.navigate(['/settings']);
  }
  loadAllMovies() {
    this.masterService.getAllMovies().subscribe((res:APIMoviesModel) => {
      this.movieList.set(res.items);
    })
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

  
}

