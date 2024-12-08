import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from "../../components/left-menu/left-menu.component";

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [RouterModule, CommonModule, LeftMenuComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css',
})
export class SettingPageComponent {
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

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed; // Đổi trạng thái
  }
}
