import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from "../../components/left-menu/left-menu.component";
import { MovieService } from '../../service/MovieService/movie.service';
import { APIMoviesModel} from '../../model/Movies';
import { ContinueMovie } from '../../model/List';
import { ContnListService } from '../../service/ContnListService/contn-list.service';
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

  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)
  movieService = inject(MovieService)
  // watchMovie: BehaviorSubject<WatchMovie[]> = new BehaviorSubject<WatchMovie[]>([]);
  continueMovie = signal<ContinueMovie[]>([]);
continueList: any;
  // watchMovie: WatchMovie[] = [];
  // Thêm phương thức trackByIndex 
  trackByIndex(index: number): number { return index; }

  constructor(private contListService: ContnListService) {}
  ngOnInit(): void { 
    this.loadContinueList(); 
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }

  // loadContinuelist(): void { 
  //   this.contListService.getContnList().subscribe((res: APIMoviesModel) => { 
  //     this.continueMovie.set(res.items);
  //   })
  // }
  loadContinueList(): void {
    this.contListService.getContinueList().subscribe(
      (res: APIMoviesModel) => {
        this.continueMovie.set(res.items);// Giả sử dữ liệu trả về có thuộc tính `items`
      },
      (error) => {
        console.error('Error fetching continue list', error);
      }
    );
  }

}
