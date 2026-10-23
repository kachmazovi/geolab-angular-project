import { inject, Service, signal } from '@angular/core';
import { ProductsApi } from './products-api';
import { ICategory, IProduct } from '../../../shared/interfaces/products.interface';
import { Observable, tap } from 'rxjs';

@Service()
export class ProductsService {
  private productsApi = inject(ProductsApi);
  public categories = signal<ICategory[]>([]);
  public products = signal<IProduct[]>([]);

  public getCategories(): void {
    this.productsApi.getProductsCategories().subscribe((value) => {
      this.categories.set(value);
      console.log(value);
    });
  }

  public getProducts(model: string): Observable<IProduct[]> {
    return this.productsApi.getProducts(model).pipe(
      tap((value) => {
        console.log(value);
        this.products.set(value);
      }),
    );
  }
}
