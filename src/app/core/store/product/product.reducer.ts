import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import * as ProductAction from "../product/product.actions";
import { Product } from "../../models/product.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { orderBy } from "lodash";
// const initialState : ProductState = {
//   products: [],
//   currentItem: null,
//   isLoading : false,
//   error: null,
//   sort: null,
// };

// Start @Entity

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState : ProductState = adapter.getInitialState({
  products: [],
  currentItem: null,
  isLoading : false,
  selectedUserId: null,
  error: null,
  sort: null,
})

const { selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getSelectedProductId = (state : ProductState) => state.selectedUserId;

// select the array of user ids
export const selectProductIds = selectIds;

// select the dictionary of user entities
export const selectProductEntities = selectEntities;

// select the array of users
export const selectAllProducts = selectAll;

// select the total user count
export const selectProductTotal = selectTotal;


export const productReducer = createReducer(
  initialState,
  on(ProductAction.getProducts, (state) => {
    return {...state, isLoading: true};
  }),
  on(ProductAction.getProductsFailure, (state, {error}) => {
    return {...state, isLoading: false, error : error};
  }),
  on(ProductAction.getProductsSuccess, (state, {products}) => {
    return adapter.addMany(products, {...state, isLoading: false, products : products});
  }),
////
  on(ProductAction.getProduct, (state) => {
    return {...state, isLoading: true};
  }),
  on(ProductAction.getProductFailure, (state, {error}) => {
    return {...state, isLoading: false, error : error};
  }),
  on(ProductAction.getProductSuccess, (state, {product}) => {
    return adapter.addOne(product, {...state, isLoading: false ,currentItem: product});
  }),
////
  on(ProductAction.updateProduct, (state) => {
    return {...state, isLoading: true};
  }),
  on(ProductAction.updateProductFailure, (state , {error}) => {
    return {...state,isLoading : false, error : error};
  }),
  on(ProductAction.updateProductSuccess, (state : any, {product}) => {
    return {...state, currentItem: product.id, isLoading: false, error : null};
  }),
  ////
  on(ProductAction.deleteProduct, (state) => {
    return {...state, isLoading: true};
  }),
  on(ProductAction.deleteProductFailure, (state , {error}) => {
    return {...state, isLoading: false, error : error};
  }),
  on(ProductAction.deleteProductSuccess, (state, {id}) => {
    return {...state, isLoading: false, products: state.products.filter((x : any) => x.id !== id)};
  }),

  ////
  on(ProductAction.addProduct, (state) => {
    return {...state, isLoading: true};
  }),
  on(ProductAction.addProductFailure, (state, {error}) => {
    return {...state, isLoading: false, error : error};
  }),
  on(ProductAction.addProductSuccess, (state : any, {product}) => {
    return {...state, isLoading: false,currentItem: product, error : null};
  }),

  on(ProductAction.sortingProducts, (state , {sort}) => {
    let products = state.products;
    const sortOrder = !state.sort ? null : state.sort === 'asc' ? 'asc' : 'desc';
      if (sortOrder) {
        products = orderBy([...products], ['name'], [sortOrder]);
      } 
    return {...state, isLoading: false, products : products, sort : sort}
  }),

)


// End @Entity


// export const productReducer = createReducer(
//   initialState,
//   on(ProductAction.getProducts, (state) => {
//     return {...state, isLoading: true};
//   }),
//   on(ProductAction.getProductsFailure, (state, {error}) => {
//     return {...state, isLoading: false, error : error};
//   }),
//   on(ProductAction.getProductsSuccess, (state, {products}) => {
//     return {...state, isLoading: false, products: products};
//   }),
// ////
//   on(ProductAction.getProduct, (state) => {
//     return {...state, isLoading: true};
//   }),
//   on(ProductAction.getProductFailure, (state, {error}) => {
//     return {...state, isLoading: false, error : error};
//   }),
//   on(ProductAction.getProductSuccess, (state, {product}) => {
//     return {...state, isLoading: false, currentItem: product};
//   }),
// ////
//   on(ProductAction.updateProduct, (state) => {
//     return {...state, isLoading: true};
//   }),
//   on(ProductAction.updateProductFailure, (state , {error}) => {
//     return {...state,isLoading : false, error : error};
//   }),
//   on(ProductAction.updateProductSuccess, (state : any, {product}) => {
//     return {...state, currentItem: product.id, isLoading: false, error : null};
//   }),
//   ////
//   on(ProductAction.deleteProduct, (state) => {
//     return {...state, isLoading: true};
//   }),
//   on(ProductAction.deleteProductFailure, (state , {error}) => {
//     return {...state, isLoading: false, error : error};
//   }),
//   on(ProductAction.deleteProductSuccess, (state, {id}) => {
//     return {...state, isLoading: false, products: state.products.filter((x : any) => x.id !== id)};
//   }),

//   ////
//   on(ProductAction.addProduct, (state) => {
//     return {...state, isLoading: true};
//   }),
//   on(ProductAction.addProductFailure, (state, {error}) => {
//     return {...state, isLoading: false, error : error};
//   }),
//   on(ProductAction.addProductSuccess, (state : any, {product}) => {
//     return {...state, isLoading: false, currentItem: product, error : null};
//   }),

// )

// export function productReducer2( state: ProductState = initialState,
//   action: ProductAction.ProductActions) : ProductState{
//     switch(action.type){
//       // get All product
//       case ProductAction.GET_PRODUCTS:
//         return {...state, status: 'loading'}
//       case ProductAction.GET_PRODUCTS_FAILURE:
//         return { ...state, status: 'error', products: [], error: action.error };
//       case ProductAction.GET_PRODUCTS_SUCCESS:
//         let products = action.products;
//         const sortOrder = state.sort;
//         if (sortOrder) {
//           products = orderBy([...products], ['createdAt'], [sortOrder]);
//         }
//         return { ...state, status: 'idle', products, error: '' };

//         // get One product
//       case ProductAction.GET_PRODUCT:
//           return {...state, status: 'loading'}
//       case ProductAction.GET_PRODUCT_FAILURE:
//         return {
//           ...state,
//           status: 'error',
//           currentItem: null,
//           error: action.error,
//         };
//       case ProductAction.GET_PRODUCT_SUCCESS:
//         return { ...state, status: 'idle', currentItem: action.product };

//         // update product
//       case ProductAction.UPDATE_PRODUCT:
//           return {...state, status: 'loading'}
//       case ProductAction.UPDATE_PRODUCT_FAILURE:
//         return {
//           ...state,
//           status: 'error',
//           currentItem: null,
//           error: action.error,
//         };
//       case ProductAction.UPDATE_PRODUCT_SUCCESS:
//         return { ...state, status: 'idle', currentItem: action.product };

//       // delete product
//       case ProductAction.DELETE_PRODUCT:
//           return {...state, status: 'loading'}
//       case ProductAction.DELETE_PRODUCT_FAILURE:
//         return {
//           ...state,
//           status: 'error',
//           currentItem: null,
//           error: action.error,
//         };
//       case ProductAction.DELETE_PRODUCT_SUCCESS:
//         return { ...state, status: 'idle', currentItem: action.product };

//       // save product
//       case ProductAction.ADD_PRODUCT:
//           return {...state, status: 'loading'}
//       case ProductAction.ADD_PRODUCT_FAILURE:
//         return {
//           ...state,
//           status: 'error',
//           currentItem: null,
//           error: action.error,
//         };
//       case ProductAction.ADD_PRODUCT_SUCCESS:
//         return { ...state, status: 'idle', currentItem: action.product };


//       case ProductAction.SORTING_PRODUCTS:
//         {
//           let products = state.products;
//           const sortOrder = !action.sort ? null : action.sort === 'asc' ? 'asc' : 'desc';
//           if (sortOrder) {
//             products = orderBy([...products], ['createdAt'], [sortOrder]);
//           }
//           return {
//             ...state,
//             products,
//             sort: action.sort
//           };
//         }
//       default:
//         return state;
//     }
// }
