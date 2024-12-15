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
import { EpisodeItem, MovieDetailsModel } from '../../model/WatchMovies';
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
  ) {
    this.movieID = '';
  }
  movieService = inject(MovieService);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);

  watch: any;
  routerDesc = inject(Router);
  newestList = signal<NewestList[]>([]);
  genreList = signal<GenreList[]>([]);
  // episodeArray: any[] = [];  // Changed to store episode data with embed URL, slug, etc.
  episodeArray = signal<EpisodeItem[]>([]);
  isExpanded = false;
  slug: string | undefined;
  embedUrl: string | null = null;
  movieID!: string;
  name!: string;

  ngOnInit(): void {
    this.loadWatchMovie(); // Call the method to load movie data
    this.menuToggleService.rightMenuState$.subscribe((state) => {
      this.isExpanded = !state; // Use isCollapsed to control visibility (inverted logic)
    });
  }

  loadWatchMovie(): void {
    this.route.queryParams.subscribe((params) => {
      const slug = params['slug'];
      this.movieID = params['id'];
      if (slug) {
        this.movieService.watchMovie(slug).subscribe((data: MovieDetailsModel) => {
          // Lưu thông tin phim
          this.movieID = data.movie.id;
          this.name = data.movie.original_name;
          this.watch = data;

          // Chuyển đổi episodes sang EpisodeItem[]
          this.episodeArray.set(
            data.movie.episodes
              .map((episode) =>
                episode.items.map((item) => ({
                  name: item.name,
                  slug: item.slug,
                  embed: item.embed,
                  m3u8: item.m3u8,
                }))
              )
              .flat()
              .filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.slug === value.slug
                ))
              )
          );


          // Lấy tập đầu tiên làm mặc định nếu có
          const firstEpisode = this.episodeArray()[0];
          if (firstEpisode) {
            this.embedUrl = firstEpisode.embed;
            this.slug = firstEpisode.slug;
          }
        });
      }
    });
  }

  changeEpisode(episodeSlug: string): void {
    const episode = this.episodeArray().find((e) => e.slug === episodeSlug);
    if (episode) {
      this.embedUrl = episode.embed;  // Cập nhật URL cho iframe
      this.slug = episode.slug;      // Cập nhật slug của tập
    }
  }


}
