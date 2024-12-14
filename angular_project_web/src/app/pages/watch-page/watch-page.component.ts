import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CommentComponent } from '../../components/comment-section/comment/comment.component';
import { CommentsComponent } from '../../components/comment-section/comments/comments.component';
import { RightMenuComponent } from '../../components/right-menu/right-menu.component';
//SERVICES
import { MenuToggleService } from '../../service/MenuService/menu-toggle-service.service';
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
  avtcmt = 'assets/images/avatar.jpg';
  newest = 'assets/res-rightmenu/rick.jpg';
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';

  constructor(
    private router: ActivatedRoute,
    private menuToggleService: MenuToggleService
  ) {}
  movieService = inject(MovieService);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);

  watch: any;
  routerDesc = inject(Router);
  newestList = signal<NewestList[]>([]);
  genreList = signal<GenreList[]>([]);
  episodeArray: any[] = [];  // Changed to store episode data with embed URL, slug, etc.
  isExpanded = false;
  slug: string | undefined;
  embedUrl: string | null = null;
  movieID!: string;

  ngOnInit(): void {
    this.loadWatchMovie(); // Call the method to load movie data
    this.menuToggleService.rightMenuState$.subscribe((state) => {
      this.isExpanded = !state; // Use isCollapsed to control visibility (inverted logic)
    });
  }

  loadWatchMovie(): void {
    this.route.queryParams.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.movieService
          .watchMovie(slug)
          .subscribe((data: MovieDetailsModel) => {
            this.movieID = data.movie.id;
            this.watch = data.movie;
            console.log(this.watch.name);
            this.episodeArray = data.movie.episodes.map((episode) => {
              return episode.items.map((item) => ({
                episodeNumber: item.name, 
                embedUrl: item.embed,     
                slug: item.slug,          
              }));
            }).flat();

            const firstEpisode = this.episodeArray[0];
            if (firstEpisode) {
              this.embedUrl = firstEpisode.embedUrl;
              this.slug = firstEpisode.slug;
            }
          });
      }
    });
  }

  changeEpisode(episodeSlug: string): void {
    const episode = this.episodeArray.find(e => e.slug === episodeSlug);
    if (episode) {
      this.embedUrl = episode.embedUrl;  // Cập nhật URL cho iframe
      this.slug = episode.slug;  // Cập nhật slug cho tập được chọn
    }
  }

  
}
