import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIMoviesModel } from '../../model/Movies';
import { MovieDetailsModel } from '../../model/WatchMovies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiMovies: String = 'http://localhost:5000/api/movies/';
  
  constructor(private http: HttpClient) {}
  
  // MOVIES
  getAllMovies():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "movies")
  }
  getNewestMovies():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "newest")
  }
  getAllTvSeries():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "tv-series")
  }

  getMoviesByYears(year: string): Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(`${this.apiMovies}year/${year}`)
  }
  getMoviesByCountries(country: string): Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(`${this.apiMovies}country/${country}`);
  }
  getMoviesByGenres(genre: string): Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(`${this.apiMovies}genres/${genre}`);
  }
  
  // WATCH MOVIES
  watchMovie(slug: string): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(`${this.apiMovies}${slug}`);
  }
  

  

}
