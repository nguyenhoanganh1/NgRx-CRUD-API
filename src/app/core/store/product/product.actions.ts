import { ActionType, createAction, props } from "@ngrx/store";
import { Product } from "../../models/product.model";

export const GET_PRODUCTS = "@Product/GetAll";
export const GET_PRODUCTS_FAILURE = "@Product/GetAllFailure";
export const GET_PRODUCTS_SUCCESS = "@Product/GetAllSuccess";

export const GET_PRODUCT = "@Product/GetOne";
export const GET_PRODUCT_FAILURE = "@Product/GetOneFailure";
export const GET_PRODUCT_SUCCESS = "@Product/GetOneSuccess";

export const ADD_PRODUCT = "@Product/Add";
export const ADD_PRODUCT_FAILURE = "@Product/AddFailure";
export const ADD_PRODUCT_SUCCESS = "@Product/AddSuccess";

export const UPDATE_PRODUCT = "@Product/Update";
export const UPDATE_PRODUCT_FAILURE = "@Product/UpdateFailure";
export const UPDATE_PRODUCT_SUCCESS = "@Product/UpdateSuccess";

export const DELETE_PRODUCT = "@Product/Delete";
export const DELETE_PRODUCT_FAILURE = "@Product/DeleteFailure";
export const DELETE_PRODUCT_SUCCESS = "@Product/DeleteSuccess";

export const SORTING_PRODUCTS = '@Product/Sorting';

export const getProducts = createAction(GET_PRODUCTS);
export const getProductsFailure = createAction(GET_PRODUCTS_FAILURE, props<{error : string}>());
export const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS, props<{products : Product[]}>());

export const getProduct = createAction(GET_PRODUCT, props<{id : number}>());
export const getProductFailure = createAction(GET_PRODUCT_FAILURE, props<{error : string}>());
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS, props<{product : Product}>());

export const updateProduct = createAction(UPDATE_PRODUCT, props<{product : Product}>());
export const updateProductFailure = createAction(UPDATE_PRODUCT_FAILURE, props<{error : string}>());
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS, props<{product : Product}>());

export const deleteProduct = createAction(DELETE_PRODUCT, props<{id : number}>());
export const deleteProductFailure = createAction(DELETE_PRODUCT_FAILURE, props<{error : string}>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{id : number}>());

export const addProduct = createAction(ADD_PRODUCT, props<{product : Product}>());
export const addProductFailure = createAction(ADD_PRODUCT_FAILURE, props<{error : string}>());
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{product : Product}>());

export const sortingProducts = createAction(SORTING_PRODUCTS, props<{sort: 'asc' | 'desc' | null}>());

export type ProductActions =
  | ActionType<typeof getProducts>
  | ActionType<typeof getProductsFailure>
  | ActionType<typeof getProductsSuccess>
  | ActionType<typeof getProduct>
  | ActionType<typeof getProductFailure>
  | ActionType<typeof getProductSuccess>
  | ActionType<typeof updateProduct>
  | ActionType<typeof updateProductFailure>
  | ActionType<typeof updateProductSuccess>
  | ActionType<typeof deleteProduct>
  | ActionType<typeof deleteProductFailure>
  | ActionType<typeof deleteProductSuccess>
  | ActionType<typeof addProduct>
  | ActionType<typeof addProductFailure>
  | ActionType<typeof addProductSuccess>
  | ActionType<typeof sortingProducts>;


