import { Component, inject, input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products-service/products-service';
import { CartService } from '../../../core/services/cart-service/cart';

@Component({
  imports: [RouterLink],
  selector: 'app-single-product',
  styleUrl: './single-product.scss',
  templateUrl: './single-product.html',
})
export class SingleProduct {
  public productServ = inject(ProductsService);
  public cartServ = inject(CartService);

  public product = input<IProduct>({} as IProduct);

  public addToCart(event: PointerEvent) {
    event.stopPropagation();
    this.cartServ.addToCart(this.product());
  }

  public deleteFromCart(event: PointerEvent) {
    event.stopPropagation();
    this.cartServ.delete(this.product());
  }
}
