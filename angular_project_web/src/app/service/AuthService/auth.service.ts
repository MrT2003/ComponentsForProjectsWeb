import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Sửa import cho chính xác (không dùng `jwtDecode` dưới dạng object)

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor() {}
  http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(userData: {
    fullName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, userData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: { id: string } = jwtDecode(token); // Giải mã token
        console.log('Decoded Token:', decodedToken); // Kiểm tra toàn bộ payload
        return decodedToken.id || null; // Trả về id nếu có
      } catch (error) {
        console.error('Error decoding token:', error); // Log lỗi nếu token không hợp lệ
        return null;
      }
    }
    console.warn('No token found');
    return null; // Trường hợp không có token
  }
}
