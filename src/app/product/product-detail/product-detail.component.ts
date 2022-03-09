import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { AppState } from 'src/app/core/store/app.state';
import * as productActions from 'src/app/core/store/product/product.actions';
import * as productSelectors from 'src/app/core/store/product/product.selector';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$ !: Observable<Product>;
  isLoading$ !: Observable<any>;
  error$ !: Observable<any>;

  constructor(private route : ActivatedRoute,
    private store : Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.store.dispatch(productActions.getProduct({id : params['id']}));

        this.isLoading$ = this.store.select(productSelectors.getProductIsLoading);
        this.isLoading$.subscribe(isLoad => this.isLoading$ = isLoad);

        this.error$ = this.store.select(productSelectors.getProductError);
        this.error$.subscribe(err => this.error$ = err);
      }
    );

  }

}
