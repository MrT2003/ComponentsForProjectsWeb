import { AfterViewInit, Component, ElementRef, inject, Input, signal, TemplateRef, ViewChild } from '@angular/core';
import { GenreList } from '../../model/Categories';
import { MovieService } from '../../service/MovieService/movie.service';
import { MovieList } from '../../model/Movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-frame',
  standalone: true,
  imports: [],
  templateUrl: './genre-frame.component.html',
  styleUrl: './genre-frame.component.css'
})
export class GenreFrameComponent {


    @Input() image!: string;
    @Input() name!: string;
    @Input() itemTemplate!: TemplateRef<any>; // TemplateRef để render mỗi item
    @Input() item!: GenreList;
    movieService = inject(MovieService);
    movieList = signal<MovieList[]>([]);

    constructor(private router: Router) {}
    
    goToGenre(genreSlug: string) {
      this.router.navigate(['/sorting'], { queryParams: { genre: genreSlug } });
    }
   
}
