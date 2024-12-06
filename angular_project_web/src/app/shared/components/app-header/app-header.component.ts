import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MasterService } from '../../../service/master.service';
import { APIMoviesModel, MovieList } from '../../../model/Movies';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit{

  search = 'assets/images/search-icon.png';
  filter = 'assets/images/Filter.png';
  logo = 'assets/images/logo.png';
  avt = 'assets/images/avatar.jpg';
  searchText: string = '';
  movieList = signal<MovieList []>([]);
  filteredMovies = signal<MovieList []>([]);

  masterService = inject(MasterService)


  ngOnInit(): void {
    this.loadMovies()
    this.onSearch()

  }

  loadMovies(): void {
    this.masterService.getAllMovies().subscribe((res:APIMoviesModel) => {
      this.movieList.set(res.items);
    })
  }

  onSearch(): void {
    const searchText = this.searchText.trim().toLowerCase();
    const movies = this.movieList(); 

    if (searchText) {
      // Tìm phim có tên chứa giá trị tìm kiếm
      const filtered = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchText)
      );
      this.filteredMovies.set(filtered); 
    } else {
      this.filteredMovies.set([]);
    }
  }
}
