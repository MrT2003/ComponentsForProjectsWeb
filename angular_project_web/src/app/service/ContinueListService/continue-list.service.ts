import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItem } from '../../model/List';

@Injectable({
  providedIn: 'root',
})
export class ContinueListService {
  private apiUrl = 'http://localhost:5000/api/lists/continueList';

  constructor(private http: HttpClient) {}

  // Fetch continue list
  getContinueList(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrl);
  }

  // Add to continue list
  addToContinueList(item: Partial<ListItem>): Observable<ListItem> {
    return this.http.post<ListItem>('http://localhost:5000/api/lists', item);
  }

  // Update continue list
  updateContinueList(movieId: string, clickedEpisode: number): Observable<ListItem> {
    return this.http.put<ListItem>(this.apiUrl, { movieId, clickedEpisode });
  }

  // Delete from continue list
  deleteFromContinueList(movieId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${movieId}`);
  }
}
