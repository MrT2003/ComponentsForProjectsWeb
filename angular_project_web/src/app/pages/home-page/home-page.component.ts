import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  image1 = 'assets/images/image_1.jpg';
  image2 = 'assets/images/image_2.jpg';
  image3 = 'assets/images/image_3.jpg';
  lokiPath = 'assets/images/loki.jpg';
}
