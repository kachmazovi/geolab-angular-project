import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { baseUrl } from '../user-services/api-requests';
import { delay, Observable, tap } from 'rxjs';
import { ErrorService } from '../error-service';
import { SpinnerService } from '../spinner-service';
import {
  ICategory,
  IComment,
  IProduct,
  IProductDescription,
} from '../../../shared/interfaces/products.interface';

@Service()
export class ProductsApi {
  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);
  private spinnerServ = inject(SpinnerService);

  public getProductsCategories(): Observable<ICategory[]> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.http.get<ICategory[]>(`${baseUrl}/categories`).pipe(
      delay(2000),
      tap(
        () => {
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('there is not any category');
          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }

  public getProducts(model: string): Observable<IProduct[]> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.http.get<IProduct[]>(`${baseUrl}/${model}`).pipe(
      delay(2000),
      tap(
        () => {
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('there is not any category');
          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }

  public getProductDescription(category: string, id: string): Observable<IProductDescription> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.http.get<IProductDescription>(`${baseUrl}/${category}Descriptions/${id}`).pipe(
      tap(
        () => {
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('there is not any product info');
          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }

  public addComment(
    product: { comments: IComment[] },
    id: string,
  ): Observable<IProductDescription> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.http.patch<IProductDescription>(`${baseUrl}/acerDescriptions/${id}`, product).pipe(
      tap(
        () => {
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('there is not any product info');
          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }
}
