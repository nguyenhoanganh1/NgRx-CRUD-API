import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "src/app/services/product.service";
import * as productActions from './product.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from "../../models/product.model";

@Injectable()
export class ProductEffects{

  constructor(private productService : ProductService,
    private actions$ : Actions){}

    loadProductsEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.getProducts),
        switchMap(action => {
          const subject = "Products";
          return this.productService.getProducts().pipe(
            map(products => {
              return productActions.getProductsSuccess({ products : products });
            }),
            catchError(error => {
              return of(productActions.getProductsFailure({ error : error }));
            })
          );
        })
      );
    });

    loadProductEffect = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.getProduct),
        switchMap(action => {
          const subject = "Product";
          return this.productService.getProduct(action.id).pipe(
            map((product : any) => {
              return productActions.getProductSuccess({ product : product });
            }),
            catchError(error => {
              return of(productActions.getProductFailure({ error : error }));
            })
          )
        })
      );
    });

    addProductEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.addProduct),
        switchMap((action) => {
          const subject = "ADD PRODUCT";
          return this.productService.addProduct(action.product).pipe(
            map(product  => {
              return productActions.addProductSuccess({ product : action.product });
            }),
            catchError(error => {
              return of(productActions.addProductFailure({ error  }));
            })
          );
        })
      );
    });

    updateProductEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.updateProduct),
        switchMap(action => {
          return this.productService.updateProduct(action.product).pipe(
            map(product => {
              return productActions.updateProductSuccess({product : action.product});
            }),
            catchError(error => {
              return of(productActions.updateProductFailure({ error}));
            })
          )
        })
      );
    });

    deleteProductEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.deleteProduct),
        switchMap(action => {
          return this.productService.deleteProduct(action.id).pipe(
            map(currentItem => {
              return productActions.deleteProductSuccess({id : action.id});
            }),
            catchError(error => {
              return of(productActions.deleteProductFailure({error : error}))
            })
          )
        })
      );
    });
}