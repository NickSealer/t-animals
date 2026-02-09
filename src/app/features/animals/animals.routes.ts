import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";

export const ANIMALS_ROUTES: Routes  = [
  {path: '', loadComponent: () => import('./pages/animal-list/animal-list').then(m => m.AnimalList)},
  {path: 'new', loadComponent: () => import('./pages/animal-create/animal-create').then(m => m.AnimalCreate), canActivate: [authGuard]},
  {path: ':id', loadComponent: () => import('./pages/animal-details/animal-details').then(m => m.AnimalDetails), canActivate: [authGuard]},
]