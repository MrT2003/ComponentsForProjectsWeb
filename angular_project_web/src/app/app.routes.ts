import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { SortingPageComponent } from './pages/sorting-page/sorting-page.component';
import { NewestFilmPageComponent } from './pages/newest-film-page/newest-film-page.component';
import { GenresPageComponent } from './pages/genres-page/genres-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guard/auth.guard';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { TvseriesPageComponent } from './pages/tvseries-page/tvseries-page.component';
import { FilmGridComponent } from './components/film-grid/film-grid.component';
export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInPageComponent },
      { path: 'signup', component: SignUpPageComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'description', component: DescriptionPageComponent },
      { path: 'watch', component: WatchPageComponent },
      { path: 'settings', component: SettingPageComponent },
      { path: 'sorting', component: SortingPageComponent },
      { path: 'newest', component: NewestFilmPageComponent },
      { path: 'genres', component: GenresPageComponent },
      { path: 'movie', component: MoviePageComponent },
      { path: 'tvseries', component: TvseriesPageComponent },
      { path: 'test', component: FilmGridComponent},
    ],
  },
];
