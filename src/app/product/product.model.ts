import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ProductAddComponent } from './product-add/product-add.component';


@NgModule({
  declarations: [ProductListComponent,
    ProductDetailComponent,
    ProductAddComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    NzIconModule,
    NzEmptyModule,
    NzCardModule,
    NzAvatarModule,
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSwitchModule,
    NzUploadModule,
    NzMessageModule,
  ],
  exports: [
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductModule { }
