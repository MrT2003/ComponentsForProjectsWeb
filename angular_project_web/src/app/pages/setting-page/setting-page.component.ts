import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { MovieService } from '../../service/MovieService/movie.service';
import { APIMoviesModel } from '../../model/Movies';
import { User } from '../../model/User';
import { ListItem } from '../../model/List';
// import { ContnListService } from '../../service/ContnListService/contn-list.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { WatchListService } from '../../service/WatchListService/watch-list.service';
import { ContinueListService } from '../../service/ContinueListService/continue-list.service';
import { FavoriteListService } from '../../service/FavoriteListService/favorite-list.service';
import { ListManagerService } from '../../service/ListManagerService/list-manager.service';
import { FilmFrameComponent } from '../../components/film-frame/film-frame.component';
// import { ContinueList, PostContinueMovie } from '../../model/List';
// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [RouterModule, CommonModule, LeftMenuComponent, FilmFrameComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css',
})
export class SettingPageComponent implements OnInit {
  lokiPath = 'assets/images/loki.jpg';
  avatarPath = 'assets/images/avatar.jpg';
  cameraPath = 'assets/images/camera.png';
  logoutPath = 'assets/images/Log Out.png';


  movieService = inject(MovieService);

  favoriteList: ListItem[] = [];
  watchList: ListItem[] = [];
  continueList: ListItem[] = [];
  renderList: ListItem[] = [];

  isFavorite = false;
  isContinue = false;
  isWatchList = false;
  // registerObj: PostContinueMovie = new PostContinueMovie()

  // continueList = signal<ContinueList[]>([]);
  // contListService = inject(ContnListService);

  user: User | null = null;

  constructor(private router: Router,
              private authService: AuthService,
              private favoriteListService: FavoriteListService,
              private watchListService: WatchListService,
              private continueListService: ContinueListService,
              private listManager: ListManagerService) {}
  ngOnInit(): void {
    // this.loadContinueList();
    this.user = this.authService.getUser();
    console.log('User:', this.user);
    this.favoriteListService.getFavoriteList().subscribe((data) => {
      this.listManager.setFavoriteList(data);
    });

    this.watchListService.getWatchList().subscribe((data) => {
      this.listManager.setWatchList(data);
    });

    this.continueListService.getContinueList().subscribe((data) => {
      this.listManager.setContinueList(data);
    });
    this.listManager.renderList$.subscribe((list) => {
      this.renderList = list;
    });
    this.listManager.isFavorite$.subscribe(
      (state) => (this.isFavorite = state)
    );
    this.listManager.isWatchList$.subscribe(
      (state) => (this.isWatchList = state)
    );
    this.listManager.isContinue$.subscribe(
      (state) => (this.isContinue = state)
    );
  }

  openFavoriteList(): void {
    this.listManager.openFavoriteList();
  }

  openWatchList(): void {
    this.listManager.openWatchList();
  }

  openContinueList(): void {
    this.listManager.openContinueList();
  }
  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/signin']).then(() => {
      console.log('Navigated to /signin');
    });
  }
}
