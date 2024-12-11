import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommentsComponent } from '../../components/comment-section/comments/comments.component';
import { RightMenuComponent } from '../../components/right-menu/right-menu.component';
//SERVICES   
import {MenuToggleService} from '../../service/MenuService/menu-toggle-service.service';
import { MovieService } from '../../service/MovieService/movie.service';
import { CategoryService } from '../../service/CategoryService/category.service';
//MODELS
import { GenreList } from '../../model/Categories';
import { APIMoviesModel, MovieList, NewestList } from '../../model/Movies';
import { MovieDetailsModel } from '../../model/WatchMovies';
import { SafeUrlPipe } from '../../pipes/SafeUrlPipe';
@Component({
  selector: 'app-watch-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CommentsComponent,
    RightMenuComponent,
    SafeUrlPipe
  ],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.css',
})
export class WatchPageComponent implements OnInit {
  [x: string]: any;
  avtcmt = 'assets/images/avatar.jpg';
  //img right menu
  newest = 'assets/res-rightmenu/rick.jpg';
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';

  constructor(
    private router: ActivatedRoute,
    private menuToggleService: MenuToggleService
  ) {}
  //servie
  movieService = inject(MovieService);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);


  watch: any;
  routerDesc = inject(Router);
  newestList = signal<NewestList[]>([]);
  genreList = signal<GenreList[]>([]);
  episodeArray: number[] = [];
  isExpanded = false;
  slug: string | undefined;
  embedUrl: string | null = null;

  // watchmovie = signal<MovieDetailsModel[]>([]);
  ngOnInit(): void {
    this.loadNewestMovies();
    this.loadAllGenres();
    this.loadWatch();
    this.loadWatchMovie();
    this.menuToggleService.rightMenuState$.subscribe((state) => {
      this.isExpanded = !state; // Use isCollapsed to control visibility (inverted logic)
    });
  }

  loadNewestMovies() {
    this.movieService.getNewestMovies().subscribe((res: APIMoviesModel) => {
      this.newestList.set(res.items);
    });
  }

  loadAllGenres() {
    this.categoryService.getAllGenres().subscribe((res: GenreList[]) => {
      this.genreList.set(res);
    });
  }

  // loadWatchMovie(): void {
  //   if (this.slug) {
  //     this.movieService.watchMovie(this.slug).subscribe((res: MovieDetailsModel) => {
  //       this.watchmovie.set([res]);
  //     });
  //   } else {
  //     console.error('Slug is undefined');
  //   }
  // }

  loadWatchMovie(): void {
    this.route.queryParams.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.movieService.watchMovie(slug).subscribe(
          (data: MovieDetailsModel) => {
            this.watch = data;
            const firstEpisode = data.movie.episodes[0]?.items[0];
            if (firstEpisode) {
              this.embedUrl = firstEpisode.embed;
            }
          },
        );
      }
    });
  }

  loadWatch() {
    this.router.queryParams.subscribe((params) => {
      const totalEpisodes = parseInt(params['total_episodes'], 10) || 0;
      this.watch = {
        name: params['name'],
        total_episodes: totalEpisodes,
        poster_url: params['poster_url'],
        slug: params['slug'],
      };
      this.episodeArray = Array.from(
        { length: totalEpisodes },
        (_, i) => i + 1
      ); // Tạo mảng [1, 2, ..., totalEpisodes]
    });
  }
  // goToWatch(movie: MovieList) {
  //   this.routerDesc.navigate(['/watch'], {
  //     queryParams: {
  //       name: movie.name,
  //       total_episodes: movie.total_episodes,
  //       poster_url: movie.poster_url,
  //       slug: movie.slug,
  //     },
  //   });
  // }
}
