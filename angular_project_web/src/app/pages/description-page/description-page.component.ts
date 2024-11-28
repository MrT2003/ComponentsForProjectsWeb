import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './description-page.component.html',
  styleUrl: './description-page.component.css'
})
export class DescriptionPageComponent {
  wedPath = 'assets/images/Wednesday.png';
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

}
