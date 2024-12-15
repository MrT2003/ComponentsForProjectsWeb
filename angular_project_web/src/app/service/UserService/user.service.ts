import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://kh-movie-server.vercel.app/api/users';

  constructor(private http: HttpClient) {}

  // Get user by ID
  getUserById(userId: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Update user profile
  updateUserProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}`, data);
  }

  // Change password
  changePassword(oldPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/password`, { oldPassword, newPassword });
  }

  // Delete user profile
  deleteUserProfile(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}`);
  }

  // Change avatar (PATCH endpoint)
  changeAvatar(file: File): Observable<{ message: string; user: User; avatarUrl: string }> {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data
    return this.http.patch<{ message: string; user: User; avatarUrl: string }>(`${this.apiUrl}/avatar`, formData);
  }

  // Change image (PATCH endpoint)
  changeImage(file: File): Observable<{ message: string; user: User; imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data
    return this.http.patch<{ message: string; user: User; imageUrl: string }>(`${this.apiUrl}/image`, formData);
  }
}
