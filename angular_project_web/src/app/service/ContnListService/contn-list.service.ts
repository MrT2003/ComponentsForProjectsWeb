import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIMoviesModel } from '../../model/Movies';
import { Observable } from 'rxjs';
// import {AuthService} from ;

@Injectable({
  providedIn: 'root'
})
export class ContnListService {
  apiUrl: string = 'http://localhost:5000/api/lists/continueList';

  constructor(private http: HttpClient) {}
  

  // getContnList():Observable<APIMoviesModel> {
  //   return this.http.get<APIMoviesModel>(this.apiContnList)
  // } 
  getContinueList(): Observable<APIMoviesModel> {
    const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RhOWJmZDI3NWRmMmFiOGY2NTIwYiIsImlhdCI6MTczMzg2NDIzMSwiZXhwIjoxNzMzOTUwNjMxfQ.-gdJMBqCUjTwmo0aJhH6F6RJCrk-LZe1MiAhZ9Z_80s'); // Giả sử bạn lưu token vào localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log( "aloalo");
    return this.http.get<APIMoviesModel>(this.apiUrl, { headers });
  }
  
}


