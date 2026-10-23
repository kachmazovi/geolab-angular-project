import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { Products } from './shared/components/products/products';
import { ContactUs } from './features/contact-us/contact-us';
import { ProfileInfo } from './features/profile-info/profile-info';
import { isLoginGuard } from './core/guards/is-login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/products/acer',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products/:id',
        component: Products,
      },
    ],
  },
  {
    path: 'contact-us',
    component: ContactUs,
  },
  {
    path: 'profile',
    component: ProfileInfo,
    canActivate: [isLoginGuard],
  },
];
