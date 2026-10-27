import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products-service/products-service';
import { IComment, IProductDescription } from '../../interfaces/products.interface';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/user-services/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-single-product-description',
  styleUrl: './single-product-description.scss',
  templateUrl: './single-product-description.html',
})
export class SingleProductDescription implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public productsServ = inject(ProductsService);
  public userServ = inject(AuthService);

  public productDescription = signal<IProductDescription>({} as IProductDescription);
  public comment = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.productsServ
      .getProductDescription(this.activatedRoute.snapshot.params['id'])
      .subscribe((product) => {
        console.log(product);
        this.productDescription.set(product);
      });
  }

  public addComment() {
    const product: { comments: IComment[] } = {
      comments: [...this.productDescription().comments],
    };

    product.comments.push({
      author: this.userServ.userInfo()?.username as string,
      date: String(new Date().toLocaleString()),
      comment: this.comment.value as string,
    });

    this.productsServ
      .addComment(product, this.activatedRoute.snapshot.params['id'])
      .subscribe((product) => {
        this.productDescription.set(product);
        this.comment.reset();
      });
  }
}
