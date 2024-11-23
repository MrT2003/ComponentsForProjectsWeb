import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  logoPath = 'assets/images/logo.png';
  googlePath = 'assets/images/mdi_google.png';
  facebookPath = 'assets/images/Vector.png';
}
