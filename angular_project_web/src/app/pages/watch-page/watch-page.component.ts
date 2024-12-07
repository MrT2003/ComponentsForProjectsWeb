import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GenreList } from '../../model/Categories';
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-watch-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.css'
})
export class WatchPageComponent implements OnInit{
  avtcmt = 'assets/images/avatar.jpg';
  //img right menu
  newest = 'assets/res-rightmenu/rick.jpg'; 
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';
  // masterService: any;

  constructor(private router: Router) {}
  masterService = inject(MasterService);

  newestList = signal<NewestList[]>([]);
  genreList = signal<GenreList[]>([]);
 
  ngOnInit(): void {
    this.loadNewestMovies();
    this.loadAllGenres();
  }

  loadNewestMovies(){
    this.masterService.getNewestMovies().subscribe((res:APIMoviesModel) => {
      this.newestList.set(res.items); 

    })
  }

  loadAllGenres(){
    this.masterService.getAllGenres().subscribe((res:GenreList[]) => {
      this.genreList.set(res); 
    })
  }
  goToDescription(movie: MovieList) {
    this.router.navigate(['/description'], {
      queryParams: {
        name: movie.name,
        thumb_url: movie.thumb_url,
        description: movie.description,
        poster_url: movie.poster_url,
      },
    });
  }
}
