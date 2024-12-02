import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIMoviesModel } from '../model/Movies';
import { GenreList } from '../model/Categories';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiMovies: String = 'http://localhost:5000/api/movies/';
  apiCategories: String = 'http://localhost:5000/api/categories/';

  constructor(private http: HttpClient) {}

  // MOVIES
  getAllMovies():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "movies")
  }
  getAllTvSeries():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "tv-series")
  }

  //CATEGORIES
  getAllGenres():Observable<GenreList[]> {
    return this.http.get<GenreList[]>(this.apiCategories + "genres")
  }
}
