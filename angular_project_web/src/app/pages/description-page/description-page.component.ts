import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { MasterService } from '../../service/master.service';

import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { FilmFrameComponent } from '../../components/film-frame/film-frame.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FilmGridComponent, LeftMenuComponent],
  templateUrl: './description-page.component.html',
  styleUrl: './description-page.component.css',
})
export class DescriptionPageComponent implements OnInit {
  wedPath = 'assets/images/Wednesday.png';
  lokiPath = 'assets/images/loki.jpg';
  bg = 'assets/images/image.png';

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

  description: any;
  routerDesc = inject(Router);
  constructor(private router: ActivatedRoute) {}
  masterService = inject(MasterService);
  newestList = signal<NewestList[]>([]);

  ngOnInit(): void {
    this.loadDescription()
    this.loadNewestMovies();
  }


  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  loadDescription() {
    this.router.queryParams.subscribe((params) => {
      this.description = params;
    });
  }

  loadNewestMovies(){
    this.masterService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items); 
    })
  }
  // getMovie(){
  //   const movies = this.movieList(); // Lấy danh sách phim từ signal
  //   if (movies.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * movies.length); // Chọn chỉ số ngẫu nhiên
  //     this.selectedMovie.set(movies[randomIndex]); // Gán bộ phim ngẫu nhiên vào signal
  //   }
  // }
  goToDescription(movie: MovieList) {
    this.routerDesc.navigate(['/description'], {
      queryParams: {
        name: movie.name,
        thumb_url: movie.thumb_url,
        description: movie.description,
        poster_url: movie.poster_url,
      },
    });
  }
}
