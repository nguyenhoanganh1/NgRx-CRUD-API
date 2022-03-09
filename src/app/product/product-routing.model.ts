import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent
      },
      {
        path: 'product-add' ,
        component: ProductAddComponent,

      },
      {
        path: 'product-add/:id' ,
        component: ProductAddComponent,

      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
