import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { Products } from './shared/components/products/products';
import { ContactUs } from './features/contact-us/contact-us';
import { ProfileInfo } from './features/profile-info/profile-info';
import { isLoginGuard } from './core/guards/is-login-guard';
import { SingleProductDescription } from './shared/components/single-product-description/single-product-description';
import { Cart } from './features/cart/cart';

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
        path: 'products/:category',
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
  {
    path: 'product-description/:category/:id',
    component: SingleProductDescription,
  },
  {
    path: 'carts',
    component: Cart,
  },
];
