import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryList, GenreList, YearList } from '../../model/Categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  apiCategories: String = 'http://localhost:5000/api/categories/';
  constructor(private http: HttpClient) { }
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
