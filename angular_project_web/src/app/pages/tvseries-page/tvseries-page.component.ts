import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
//SERVICES   
import { MovieService } from '../../service/MovieService/movie.service';
//MODELS
import { APIMoviesModel, MovieList, TvList } from '../../model/Movies';

@Component({
  selector: 'app-tvseries-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent],
  templateUrl: './tvseries-page.component.html',
  styleUrl: './tvseries-page.component.css'
 
})
export class TvseriesPageComponent implements OnInit {
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
  tvList = signal<TvList []>([]);
  
  router = inject(Router);


  ngOnInit(): void {
    this.loadAllTvSeries();
    
  }
  
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
  onSetting(): void {
    this.router.navigate(['/settings']);
  }
  loadAllTvSeries() {
    this.movieService.getAllTvSeries().subscribe((res:APIMoviesModel) => {
      this.tvList.set(res.items);
    })
  }
  goToDescription(movie: MovieList) {
    this.router.navigate(['/description'], {
      queryParams: {
        name: movie.name,
        thumb_url: movie.thumb_url,
        description: movie.description,
      },
    });
  }

}


