import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../model/Comment';  

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient) {}

  // Fetch comments for a specific movie
  getComments(movieId: string, page: number = 1, limit: number = 10): Observable<{ comments: Comment[]; totalPages: number; currentPage: number }> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<{ comments: Comment[]; totalPages: number; currentPage: number }>(`${this.apiUrl}/${movieId}`, { params });
  }

  // Create a new comment
  createComment(movieId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, { movieId, text });
  }

  // Delete a comment (Admin only)
  deleteComment(commentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${commentId}`);
  }
}
