import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItem } from '../../model/List';

@Injectable({
  providedIn: 'root',
})
export class FavoriteListService {
  private apiUrl = 'http://localhost:5000/api/lists/favoriteList';

  constructor(private http: HttpClient) {}

  // Fetch favorite list
  getFavoriteList(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrl);
  }

  // Add to favorite list
  addToFavoriteList(item: Partial<ListItem>): Observable<ListItem> {
    return this.http.post<ListItem>('http://localhost:5000/api/lists', item);
  }

  // Delete from favorite list
  deleteFromFavoriteList(movieId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${movieId}`);
  }
}
