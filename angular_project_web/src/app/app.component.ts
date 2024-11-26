import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_project_web';
  frame4 = 'assets/images/Frame 4.png'
  logo='assets/images/logo.png';
  search ='assets/images/search-icon.png';
  filter = 'assets/images/Filter.png';
  avt ='assets/images/avatar.jpg';
}
