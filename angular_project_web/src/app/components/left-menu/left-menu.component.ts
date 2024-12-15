import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { ListManagerService } from '../../service/ListManagerService/list-manager.service';
@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'] // Make sure the styleUrls array is correct
})
export class LeftMenuComponent implements OnInit {
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

  // Declare all state variables to track which menu item is active
  isHome = false;
  isSorting = false;
  isRecent = false;
  isSettings = false;

  isCollapsed = false; // Trạng thái menu: mở (false) hoặc thu nhỏ (true)

  constructor(private router: Router, private menuToggleService: MenuToggleService, private authService: AuthService, private listManager:ListManagerService) {}

  ngOnInit(): void {
    // Subscribe to the menu state to react to changes
    this.menuToggleService.menuState$.subscribe(state => {
      this.isCollapsed = !state; // Use isCollapsed to control visibility (inverted logic)
    });

    // Set the default active page
    this.setActivePage('home');
  }

  // Set active page logic based on input
  setActivePage(page: string) {
    this.isHome = page === 'home';
    this.isSorting = page === 'sorting';
    this.isRecent = page === 'newest';
    this.isSettings = page === 'settings';
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
    this.router.navigate(['/signin']);
  }
}
