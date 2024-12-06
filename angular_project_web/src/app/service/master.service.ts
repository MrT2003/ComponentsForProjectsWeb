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
  getAllTvSeries():Observable<APIMoviesModel> {
    return this.http.get<APIMoviesModel>(this.apiMovies + "tv-series")
  }
  // getMoviesByFilters(filters: { genre: string, year: string, country: string }): Observable<APIMoviesModel> {
  //   let url = `${this.apiMovies}movies?`;

  //   if (filters.genre) url += `genre=${filters.genre}&`;
  //   if (filters.year) url += `year=${filters.year}&`;
  //   if (filters.country) url += `country=${filters.country}&`;

  //   return this.http.get<APIMoviesModel>(url);
  // }

  getMoviesByFilters(year: string, genre: string, country: string): Observable<APIMoviesModel> {
    const url = `${this.apiMovies}?year=${year}&genre=${genre}&country=${country}`;
    return this.http.get<APIMoviesModel>(url);
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
