import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products-service/products-service';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  public productsServ = inject(ProductsService);

  constructor() {
    this.productsServ.getCategories();
  }
}
