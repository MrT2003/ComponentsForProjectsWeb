import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
//SERVICES  
import { MovieService } from '../../service/MovieService/movie.service';
import { CategoryService } from '../../service/CategoryService/category.service';

import { GenreFrameComponent } from '../genre-frame/genre-frame.component';
import { NewestFrameComponent } from '../newest-frame/newest-frame.component';
import { ContinueFrameComponent } from '../continue-frame/continue-frame.component';
//MODELS
import { APIMoviesModel, MovieList, NewestList, TvList } from '../../model/Movies';
import { GenreList } from '../../model/Categories';
import { GenreGridComponent } from '../genre-grid/genre-grid.component';
import { MenuGenreGridComponent } from "../menu-genre-grid/menu-genre-grid.component";
@Component({
  selector: 'app-right-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, GenreFrameComponent, MenuGenreGridComponent, NewestFrameComponent, ContinueFrameComponent, MenuGenreGridComponent],
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.css'
})
export class RightMenuComponent implements OnInit {

  constructor(private router: Router, private movieService: MovieService, private categoryService: CategoryService) {}

  newestList = signal<NewestList[]>([]);
  genreList =  signal<GenreList[]>([]);
  trackById(index: number, item: GenreList): number {
    return item._id; // Trả về thuộc tính `_id` làm giá trị duy nhất
  }
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
