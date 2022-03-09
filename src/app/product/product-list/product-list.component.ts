import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createSelector, select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';
import { AppState } from 'src/app/core/store/app.state';
import * as productActions from 'src/app/core/store/product/product.actions';
import *as productSelectors from 'src/app/core/store/product/product.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // drawer
  visible = false;
  //
  products$ !: Observable<Product[]>;
  error$ !: Observable<any>;
  isLoading$ !: Observable<any>;
  isProductLoaded$ !: Observable<any>;
  sorting$ !: Observable<any>;
  sortCtrl = new FormControl(null);
  //form
  form !: FormGroup;
  // upload
  loading = false;
  avatarUrl?: string;
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

  constructor(private store$ : Store<AppState>,
    private router : Router,
    private fb : FormBuilder,
    private msg: NzMessageService) {

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
    this.store$.dispatch(productActions.getProducts());
    this.store$.select(productSelectors.getProducts).subscribe(
      products => {
        this.products$ = of([...products]);
        // console.log(products);
    });

    // this.store$.select(productSelectors.selectProductTotal).subscribe(
    //   total => {console.log(total)}
    // );

    this.isLoading$ = this.store$.pipe(select(productSelectors.getProductIsLoading));
    this.isLoading$.subscribe(isload => this.isLoading$ = isload);

    this.error$ = this.store$.pipe(select(productSelectors.getProductError));
    this.error$.subscribe(err => this.error$ = err);

    this.store$.pipe(select(productSelectors.sortingProduct)).subscribe(
      sort => this.sortCtrl.setValue(sort));
    this.sortCtrl.valueChanges.subscribe(value => this.setSorting(value));
  }

  setSorting(order : 'asc' | 'desc'){
    this.store$.dispatch(productActions.sortingProducts({sort : order}));
  }


  selectProductById(id : number){
    this.router.navigate(['product-detail', id]);
  }

  addProduct(){
    this.router.navigate(['product-add']);
  }

  updateProduct(){
    const pro : Product = this.form.getRawValue();
    // this.store$.dispatch(productActions.updateProduct({product : pro}));
  }

  deleteProduct(id : number){
    this.store$.dispatch(productActions.deleteProduct({id : id}));
  }

  open(data : Product): void {
    // this.form.setValue(data);
    this.router.navigate(['product-add', data.id]);
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  // Upload image product
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}

