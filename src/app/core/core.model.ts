import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProductEffects } from "./store/product/product.effects";
import { productReducer } from "./store/product/product.reducer";
// import { productReducer2 } from "./store/product/product.reducer";

@NgModule({
  imports: [
    StoreModule.forFeature('feature_product', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class CoreModule {}

