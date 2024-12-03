import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor() {}
  http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Lưu token vào localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Lấy token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Xóa token khi logout
  logout(): void {
    localStorage.removeItem('token');
  }
}
