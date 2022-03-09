import { EntityState } from "@ngrx/entity";
import { Product } from "../../models/product.model";

export interface ProductState extends EntityState<Product>{
  products : Product[];
  currentItem: any;
  isLoading ?: boolean;
  error ?: any;
  selectedUserId: number |string | null;

  sort : 'asc' | 'desc' | null ;
}

