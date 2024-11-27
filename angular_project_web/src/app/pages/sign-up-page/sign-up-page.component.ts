import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  logoPath = 'assets/images/logo.png';
  googlePath = 'assets/images/mdi_google.png';
  facebookPath = 'assets/images/Vector.png';

  constructor(private router: Router) {}

  onSignUp(): void {
    this.router.navigate(['/home']);
  }

  onSignInPage(): void {
    this.router.navigate(['/signin']);
  }

}
