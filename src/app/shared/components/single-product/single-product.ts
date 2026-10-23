import { Component, input } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';

@Component({
  imports: [],
  selector: 'app-single-product',
  styleUrl: './single-product.scss',
  templateUrl: './single-product.html',
})
export class SingleProduct {
  public product = input<IProduct>({} as IProduct);
}
