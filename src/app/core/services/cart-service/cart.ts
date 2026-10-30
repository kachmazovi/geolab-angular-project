import { Service, signal } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/products.interface';

@Service()
export class CartService {
  public addedLaptops = signal<IProduct[]>([]);

  constructor() {
    this.addedLaptops.set(
      localStorage.getItem('laptops') ? JSON.parse(localStorage.getItem('laptops') as string) : [],
    );
  }

  public isAdded(laptop: IProduct): boolean {
    return !!this.addedLaptops().find((l) => l.id === laptop.id && l.name === laptop.name);
  }

  public addToCart(laptop: IProduct): void {
    this.addedLaptops.update((laptops: IProduct[]) => {
      laptops.push(laptop);
      return laptops;
    });

    localStorage.setItem('laptops', JSON.stringify(this.addedLaptops()));
  }

  public delete(laptop: IProduct): void {
    const i = this.addedLaptops().findIndex((l) => l.id === laptop.id && l.name === laptop.name);
    this.addedLaptops.update((laptops) => {
      laptops.splice(i, 1);
      return laptops;
    });

    localStorage.setItem('laptops', JSON.stringify(this.addedLaptops()));
  }
}
