import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlAPI = environment.baseURL;

  private selectedProduct = new Subject<Product>();
  productSelected = this.selectedProduct.asObservable();

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.urlAPI + "/api/product/index");
  }

  getProduct(id : number){
    return this.http.get<Product[]>(this.urlAPI + `/api/product/detail/${id}`);
  }

  selectProduct(product: Product){
    this.selectedProduct.next(product);
  }

  addProduct(product : Product){
      return this.http.post(this.urlAPI + "/api/product/add", product);
  }

  updateProduct(product: Product)
  {
      return this.http.put<Product>(this.urlAPI + `/api/product/update/${product.id}`, product);
  }

  deleteProduct(id : number)  {
        return this.http.delete<Product>(this.urlAPI + `/api/product/delete/${id}`);
  }
}
