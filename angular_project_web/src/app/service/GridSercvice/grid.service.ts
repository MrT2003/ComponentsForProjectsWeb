import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  

  constructor(private router: Router) { }

  isHome = false;
  isMovies = false;
  isTvSeries = false;

  navigate(path: string) { this.router.navigate([path]);}

 
}
