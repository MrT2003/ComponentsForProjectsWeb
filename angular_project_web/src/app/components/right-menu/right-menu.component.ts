import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
//SERVICES  
import { MovieService } from '../../service/MovieService/movie.service';
import { CategoryService } from '../../service/CategoryService/category.service';

//MODELS
import { APIMoviesModel, MovieList, NewestList, TvList } from '../../model/Movies';
import { GenreList } from '../../model/Categories';
@Component({
  selector: 'app-right-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.css'
})
export class RightMenuComponent implements OnInit {

  constructor(private router: Router, private movieService: MovieService, private categoryService: CategoryService) {}

  newestList = signal<NewestList[]>([]);
  genreList =  signal<GenreList[]>([]);

  ngOnInit(): void{
    this.loadNewestMovies();
    this.loadAllGenres();
  }

  loadAllGenres(){
    this.categoryService.getAllGenres().subscribe((res:GenreList[]) => {
      this.genreList.set(res); 
    })
  }

  loadNewestMovies(){
    this.movieService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items); 

    })
  }

  // loadContinueMovies(){
  //   this.movieService.getContinueMovies().subscribe((res:APIMoviesModel) => {
  //     this.movieList.set(res.items); 
  //   })
  // }
}
