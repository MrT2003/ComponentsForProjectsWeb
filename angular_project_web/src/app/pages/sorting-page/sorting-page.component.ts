import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIMoviesModel } from '../../model/Movies';
import { MasterService } from '../../service/master.service';
import { GenreList } from '../../model/Categories';
@Component({
  selector: 'app-sorting-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sorting-page.component.html',
  styleUrl: './sorting-page.component.css',
})
export class SortingPageComponent implements OnInit {
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
  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  masterService = inject(MasterService);
  genreList = signal<GenreList[]>([]);

  ngOnInit(): void {
    this.loadGenres();
  }
  loadGenres() {
    this.masterService.getAllGenres().subscribe((res: GenreList[]) => {
      this.genreList.set(res);
    });
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
}
