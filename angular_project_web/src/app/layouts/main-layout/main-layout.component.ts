import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
import { RightMenuComponent } from '../../components/right-menu/right-menu.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AppFooterComponent, AppHeaderComponent, LeftMenuComponent, RightMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
