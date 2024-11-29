import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-newest-film-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './newest-film-page.component.html',
  styleUrl: './newest-film-page.component.css',
})
export class NewestFilmPageComponent {
  constructor(private router: Router) {} 
  lokiPath = 'assets/images/loki.jpg';
  sideBarPath = 'assets/res-leftmenu/sidebar.png';

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

  isCollapsed = false; 

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
  onWatchMovie() { this.router.navigate(['/watch']); }
}
