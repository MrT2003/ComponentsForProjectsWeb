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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full',
  },

  { path: 'signin', component: SignInPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'description', component: DescriptionPageComponent },
  { path: 'watch', component: WatchPageComponent },
  { path: 'settings', component: SettingPageComponent },
  { path: 'sorting', component: SortingPageComponent },
  { path: 'newest', component: NewestFilmPageComponent },
  { path: 'genres', component: GenresPageComponent },
];
