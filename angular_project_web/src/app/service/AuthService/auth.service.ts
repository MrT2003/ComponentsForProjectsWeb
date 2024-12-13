import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map  } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Sửa import cho chính xác (không dùng `jwtDecode` dưới dạng object)
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  http = inject(HttpClient);

  // Observable to track the logged-in user
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = this.getUser();
    if (savedUser) {
      this.currentUserSubject.next(savedUser); // Set the user if found in localStorage
    }
  }  

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: User) => {
        // Save token and user inside the AuthService
        this.saveToken(response.token);
        this.saveUser(response);
        return response; // Return the user object for further use if needed
      })
    );
  }

  register(userData: { fullName: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, userData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user); // Update the current user
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null); // Clear the current user
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
