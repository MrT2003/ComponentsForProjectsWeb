import { Component } from '@angular/core';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css'
})
export class GenresPageComponent {
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
}
