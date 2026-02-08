import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'about', component: About},
  {path: 'products', loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)},
  {path: 'animals', loadChildren: () => import('./features/animals/animals.routes').then(m => m.ANIMALS_ROUTES)},
  {path: 'pets', loadChildren: () => import('./features/pets/pets.routes').then(m => m.PETS_ROUTES)},
  {path: '**', redirectTo: ''}
];
