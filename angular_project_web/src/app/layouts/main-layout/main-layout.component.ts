import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { RightMenuComponent } from '../../components/right-menu/right-menu.component';
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppFooterComponent, AppHeaderComponent, LeftMenuComponent, RightMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit  {
  isExpanded = false;

  constructor(private menuToggleService: MenuToggleService) {}

  ngOnInit(): void {
    // Subscribe to the menu state to react to changes
    this.menuToggleService.rightMenuState$.subscribe(state => {
      this.isExpanded = !state; // Use isCollapsed to control visibility (inverted logic)
    });
  }
}
