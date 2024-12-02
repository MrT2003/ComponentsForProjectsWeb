import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { APIMoviesModel, MovieList, TvList } from '../../model/Movies';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  image1 = 'assets/images/image_1.jpg';
  image2 = 'assets/images/image_2.jpg';
  image3 = 'assets/images/image_3.jpg';
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
 

//img right menu
  newest = 'assets/res-rightmenu/rick.jpg'; 
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';

  constructor(private router: Router) {}

  masterService = inject(MasterService)
  movieList = signal<MovieList []>([]);
  tvList = signal<TvList []>([]);
  

  ngOnInit(): void {
    this.loadAllMovies();
    this.loadAllTvSeries();
  }

  loadAllMovies() {
    this.masterService.getAllMovies().subscribe((res:APIMoviesModel) => {
      this.movieList.set(res.items);
    })
  }
  loadAllTvSeries() {
    this.masterService.getAllTvSeries().subscribe((res:APIMoviesModel) => {
      this.tvList.set(res.items);
    })
  }

  onSetting(): void {
    this.router.navigate(['/settings']);
  }

  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
}
