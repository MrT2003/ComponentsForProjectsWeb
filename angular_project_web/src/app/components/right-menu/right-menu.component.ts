import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
//SERVICES  
import { MasterService } from '../../service/master.service';
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

  constructor(private router: Router, private masterService: MasterService) {}

  newestList = signal<NewestList[]>([]);
  genreList =  signal<GenreList[]>([]);

  ngOnInit(): void{
    this.loadNewestMovies();
    this.loadAllGenres();
  }

  loadAllGenres(){
    this.masterService.getAllGenres().subscribe((res:GenreList[]) => {
      this.genreList.set(res); 
    })
  }

  loadNewestMovies(){
    this.masterService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items); 

    })
  }

  // loadContinueMovies(){
  //   this.masterService.getContinueMovies().subscribe((res:APIMoviesModel) => {
  //     this.movieList.set(res.items); 
  //   })
  // }
}
