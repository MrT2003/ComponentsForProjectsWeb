import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { FilmGridComponent } from '../../components/film-grid/film-grid.component';
//SERVICES   
import { MovieService } from '../../service/MovieService/movie.service';
import { MenuToggleService } from '../../service/menu-toggle-service.service';
//MODELS
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';

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

  isLeftMenuOpen = false; 

  description: any;
  routerDesc = inject(Router);
  constructor(private router: ActivatedRoute, private menuToggleService: MenuToggleService) {}
  movieService = inject(MovieService);
  newestList = signal<NewestList[]>([]);

  ngOnInit(): void {
    this.loadDescription()
    this.loadNewestMovies();
    this.menuToggleService.menuState$.subscribe((state) => {
      this.isLeftMenuOpen = state;
    })
  }

  loadDescription() {
    this.router.queryParams.subscribe((params) => {
      this.description = params;
    });
  }

  loadNewestMovies(){
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items); 
    })
  }
}
