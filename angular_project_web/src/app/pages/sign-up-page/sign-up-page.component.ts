import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  logoPath = 'assets/images/logo.png';
  googlePath = 'assets/images/mdi_google.png';
  facebookPath = 'assets/images/Vector.png';

  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  router = inject(Router);
  authService = inject(AuthService);

  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService
      .register({
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          alert('Registration failed. Please try again.');
          console.error(err);
        },
      });
  }

  onSignInPage(): void {
    this.router.navigate(['/signin']);
  }
}
