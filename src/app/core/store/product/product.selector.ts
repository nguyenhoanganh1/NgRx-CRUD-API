import { ActionReducerMap, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";
import * as productReducerSelector from './product.reducer';

const featureProduct = createFeatureSelector<ProductState>('feature_product');

// Start @Entity
export const getAllProductSelector = createSelector(featureProduct,
  productReducerSelector.selectAllProducts);

export const getProductIdsSelector = createSelector(
  featureProduct,
  productReducerSelector.selectProductIds
  // shorthand for productsState => fromProduct.selectProductIds(productsState)
);

export const selectProductEntities = createSelector(
  featureProduct,
  productReducerSelector.selectProductEntities
);

export const selectAllProducts = createSelector(
  featureProduct,
  productReducerSelector.selectAllProducts
);

export const selectProductTotal = createSelector(
  featureProduct,
  productReducerSelector.selectProductTotal
);

export const selectCurrentProductId = createSelector(
  featureProduct,
  productReducerSelector.getSelectedProductId
);

export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectCurrentProductId,
  (productEntities , productId) => productId && productEntities[productId]
);

//  End @Entity

export const getProducts = createSelector(featureProduct, (state : ProductState) => state.products);
export const getProduct = createSelector(featureProduct, (state : ProductState) => state.currentItem);
export const getSelectedProduct = createSelector(featureProduct, (state : ProductState, id : number)  => state.products.filter(x => x.id === id));
export const getProductError = createSelector(featureProduct, (state: ProductState) => state.error);
export const getProductIsLoading = createSelector(featureProduct, (state: ProductState) => state.isLoading );
export const sortingProduct = createSelector(featureProduct, (state : ProductState) => state.sort);
