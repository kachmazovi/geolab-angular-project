import { Component, inject, input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products-service/products-service';

@Component({
  imports: [RouterLink],
  selector: 'app-single-product',
  styleUrl: './single-product.scss',
  templateUrl: './single-product.html',
})
export class SingleProduct {
  public productServ = inject(ProductsService);

  public product = input<IProduct>({} as IProduct);
}
