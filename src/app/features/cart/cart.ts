import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service/cart';
import { IProduct } from '../../shared/interfaces/products.interface';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  public cartsServ = inject(CartService);

  public deleteFromCart(laptop: IProduct): void {
    this.cartsServ.delete(laptop);
  }

  public get price(): number {
    return this.cartsServ.addedLaptops().reduce((previousValue, laptop) => {
      return previousValue + Number(laptop.price.split(' ')[0]);
    }, 0);
  }
}
