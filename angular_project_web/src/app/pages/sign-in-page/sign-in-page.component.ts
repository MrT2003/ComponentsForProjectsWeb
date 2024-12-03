import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent {
  logoPath = 'assets/images/logo.png';
  googlePath = 'assets/images/mdi_google.png';
  facebookPath = 'assets/images/Vector.png';

  emailId = '';
  password = '';

  // constructor(private router: Router) {}
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  onSignIn(): void {
    this.authService.login(this.emailId, this.password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']); // Chuyển hướng sau khi đăng nhập thành công
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
