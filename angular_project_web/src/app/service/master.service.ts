import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIMoviesModel } from '../model/Movies';
import { CountryList, GenreList, YearList } from '../model/Categories';

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
  

  //CATEGORIES
  getAllGenres():Observable<GenreList[]> {
    return this.http.get<GenreList[]>(this.apiCategories + "genres")
  }
  getAllYears():Observable<YearList[]> {
    return this.http.get<YearList[]>(this.apiCategories + "years")
  }
  getAllCoutries():Observable<CountryList[]> {
    return this.http.get<CountryList[]>(this.apiCategories + "countries")
  }
}
