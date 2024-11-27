import { Component } from '@angular/core';

@Component({
  selector: 'app-watch-page',
  standalone: true,
  imports: [],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.css'
})
export class WatchPageComponent {
  avtcmt = 'assets/images/avatar.jpg';
  //img right menu
  newest = 'assets/res-rightmenu/rick.jpg'; 
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';
}
