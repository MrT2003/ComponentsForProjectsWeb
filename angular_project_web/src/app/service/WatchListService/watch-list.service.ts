import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItem } from '../../model/List';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private apiUrl = 'http://localhost:5000/api/lists/watchList';

  constructor(private http: HttpClient) {}

  // Fetch watch list
  getWatchList(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrl);
  }

  // Add to watch list
  addToWatchList(item: Partial<ListItem>): Observable<ListItem> {
    return this.http.post<ListItem>('http://localhost:5000/api/lists', item);
  }

  // Delete from watch list
  deleteFromWatchList(movieId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${movieId}`);
  }
}
