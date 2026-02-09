import { Routes } from "@angular/router";

export const MOVIES_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/movies/movies').then(m => m.Movies)}
]