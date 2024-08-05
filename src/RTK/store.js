import { configureStore } from "@reduxjs/toolkit";
import SelectCountrySlice from "./Slices/SelectedCountrySlice"
import SelectedCurrencySlice from "./Slices/SelectedCurrencySlice"
import ProductsWishListSlice from "./Slices/ProductsWishListSlice"
import ProductCartSlice from "./Slices/ProductCartSlice"
import ComponentsSlice from "./Slices/ComponentsSlice"
import AuthorizationSlice from "./Slices/AuthorizationSlice";
import FetchProductsSlice from "./Slices/FetchProductsSlice";

export const store = configureStore({
    reducer: {
        SelectCountry: SelectCountrySlice,
        SelectedCurrency: SelectedCurrencySlice,
        WishList: ProductsWishListSlice,
        Cart: ProductCartSlice,
        Components: ComponentsSlice,
        Authorization: AuthorizationSlice,
        ShopPage: FetchProductsSlice
    }
})