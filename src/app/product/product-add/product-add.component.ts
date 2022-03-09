import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { AppState } from 'src/app/core/store/app.state';
import * as productActions from 'src/app/core/store/product/product.actions';
import *as productSelectors from 'src/app/core/store/product/product.selector';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product$ !: Observable<Product>;
  isLoading$ !: Observable<any>;
  error$ !: Observable<any>;
  // Form
  isUpdate = false;
  form !: FormGroup;
  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error'
    }
  ];
  fileList1 = [...this.defaultFileList];

  constructor(private fb : FormBuilder,
    private store$ : Store<AppState>,
    private route : ActivatedRoute) {

      this.form = this.fb.group({
        id : [''],
        name : ['', Validators.required],
        image : ['', Validators.required],
        unitPrice : ['', Validators.required],
        discount : ['', Validators.required],
        quantity : ['', Validators.required],
        description : ['', Validators.required],
        special : ['', Validators.required],
        clickCount: [''],
        productDate: [''],
        latest: [''],
        categoryId : ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          this.isUpdate = true;
          this.store$.dispatch(productActions.getProduct({id : params['id']}));
          this.store$.select(productSelectors.getProduct).subscribe(
            (product) => {
              this.product$ = of(product);
              if(product != null){
                this.form.patchValue({id : product.id, name : product.name,
                  image : product.image,
                  unitPrice : product.unitPrice,
                  discount : product.discount,
                  quantity :product.quantity,
                  description : product.description,
                  special : product.special,
                  clickCount: product.clickCount,
                  productDate: product.productDate,
                  latest: product.latest,
                  categoryId : product.categoryId,
                });
              }
            }
          );
        }


        this.isLoading$ = this.store$.select(productSelectors.getProductIsLoading);
        this.isLoading$.subscribe(isLoad => this.isLoading$ = isLoad);

        this.error$ = this.store$.select(productSelectors.getProductError);
        this.error$.subscribe(err => this.error$ = err);
      })
  }

  addProduct(){
    let product : Product = this.form.getRawValue();
    this.store$.dispatch(productActions.addProduct({product : product}));
    this.store$.select(productSelectors.getProduct).subscribe(
      product => {
        this.product$ = of(product);
        if(product != undefined) {
          this.form.reset();
        }
      }
    );
  }

  updateProduct(){
    const pro : Product = this.form.getRawValue();
    console.log(pro);
    this.store$.dispatch(productActions.updateProduct({product : pro}));
  }

}
