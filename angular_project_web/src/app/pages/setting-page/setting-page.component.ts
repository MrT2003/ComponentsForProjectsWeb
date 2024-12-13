import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { MovieService } from '../../service/MovieService/movie.service';
import { APIMoviesModel } from '../../model/Movies';
import { User } from '../../model/User';

import { ContnListService } from '../../service/ContnListService/contn-list.service';
import { AuthService } from '../../service/AuthService/auth.service';

import { ContinueList, PostContinueMovie } from '../../model/List';
// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [RouterModule, CommonModule, LeftMenuComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css',
})
export class SettingPageComponent implements OnInit {
  lokiPath = 'assets/images/loki.jpg';
  avatarPath = 'assets/images/avatar.jpg';
  cameraPath = 'assets/images/camera.png';
  logoutPath = 'assets/images/Log Out.png';

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

  isCollapsed = false; 
  movieService = inject(MovieService);
  registerObj: PostContinueMovie = new PostContinueMovie()
  
  continueList = signal<ContinueList[]>([]);
  contListService = inject(ContnListService);

  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.loadContinueList();
    this.user = this.authService.getUser();
    
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  loadContinueList() {
    this.contListService.getContinueList().subscribe((res: ContinueList[]) => {
      this.continueList.set(res);
    });
  }

  addMovie() {
    this.contListService.postContinueList(this.registerObj).subscribe((res: ContinueList[]) => {
      this.continueList.set(res);
    });
  }
  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/signin']).then(() => {
      console.log('Navigated to /signin');
    });
  }
}
                            