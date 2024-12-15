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
  // addToContinueList(item: Partial<ListItem>): Observable<ListItem> {
  //   return this.http.post<ListItem>('http://localhost:5000/api/lists', item);
  // }
  addToContinueList(item: Partial<ListItem>): Observable<ListItem> {

    return new Observable((observer) => {
      this.getContinueList().subscribe((list) => {
        // Check if the list has more than 18 items
        if (list.length >= 18) {
          const lastItem = list[list.length - 1];
          this.deleteFromContinueList(lastItem.movieId).subscribe(() => {
            // After deleting the last item, add the new one
            this.http.post<ListItem>('http://localhost:5000/api/lists', item).subscribe((newItem) => {
              observer.next(newItem);
              observer.complete();
            });
          });
        } else {
          // Add item directly if the list is below the limit
          this.http.post<ListItem>('http://localhost:5000/api/lists', item).subscribe((newItem) => {
            observer.next(newItem);
            observer.complete();
          });
        }
      });
    });
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
