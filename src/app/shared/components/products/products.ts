import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../core/services/products-service/products-service';
import { SingleProduct } from '../single-product/single-product';

@Component({
  imports: [SingleProduct],
  selector: 'app-products',
  styleUrl: './products.scss',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public productsServ = inject(ProductsService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          return this.productsServ.getProducts(params['id']);
        }),
      )
      .subscribe();
  }
}
