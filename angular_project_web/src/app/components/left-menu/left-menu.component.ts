import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,   } from '@angular/router';
@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css'
})
export class LeftMenuComponent{
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

  constructor(private router: Router) {
    this.setActivePage('home');
  }

  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  isHome = false;
  isSorting = false;
  isRecent = false;
  isPlaylists = false;
  isWatchlist = false;
  isContinue = false;
  isSettings = false;

  setActivePage(page: string) {
    this.isHome = page === 'home';
    this.isSorting = page === 'sorting';
    this.isRecent = page === 'newest';
    this.isPlaylists = page === 'playlists';
    this.isWatchlist = page === 'watchlist';
    this.isContinue = page === 'continue';
    this.isSettings = page === 'settings';
  }
}
