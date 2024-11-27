import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent {
  logoPath = 'assets/images/logo.png';
  googlePath = 'assets/images/mdi_google.png';
  facebookPath = 'assets/images/Vector.png';

  constructor(private router: Router) {}

  onSignIn(): void {
    this.router.navigate(['/home']);
  }
}
