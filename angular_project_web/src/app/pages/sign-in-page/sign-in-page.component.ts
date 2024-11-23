import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  logoPath = '/angular_project_web/src/assets/images/logo.png';
  googlePath = '/angular_project_web/src/assets/images/mdi_google.png';
}
