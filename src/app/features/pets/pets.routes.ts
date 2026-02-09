import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";

export const PETS_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/pet-list/pet-list').then(m => m.PetList), canActivate: [authGuard]},
  {path: 'new', loadComponent: () => import('./pages/pet-create/pet-create').then(m => m.PetCreate), canActivate: [authGuard]},
  {path: ':id', loadComponent: () => import('./pages/pet-details/pet-details').then(m => m.PetDetails), canActivate: [authGuard]}
]