import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIMoviesModel, MovieList } from '../../model/Movies';
import { Observable } from 'rxjs';
import { ContinueList, PostContinueMovie } from '../../model/List';
// import {AuthService} from ;

@Injectable({
  providedIn: 'root',
})
export class ContnListService {
  apiUrl: string = 'http://localhost:5000/api/lists';

  http = inject(HttpClient);

  getContinueList(): Observable<ContinueList[]> {
    return this.http.get<ContinueList[]>(this.apiUrl + '/watchList');
  }

  postContinueList(movie: Partial<ContinueList>): Observable<ContinueList[]> {
    console.log('Sending data to API:', movie); // Log dữ liệu trước khi gửi
    return this.http.post<ContinueList[]>(`${this.apiUrl}`, movie);
  }
}
