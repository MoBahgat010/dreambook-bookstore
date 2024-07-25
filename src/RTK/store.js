import { configureStore } from "@reduxjs/toolkit";
import SelectCountrySlice from "./Slices/SelectedCountrySlice"
import SelectedCurrencySlice from "./Slices/SelectedCurrencySlice"
import ProductsWishListSlice from "./Slices/ProductsWishListSlice"
import ProductCartSlice from "./Slices/ProductCartSlice"
import ComponentsSlice from "./Slices/ComponentsSlice"

export const store = configureStore({
    reducer: {
        SelectCountry: SelectCountrySlice,
        SelectedCurrency: SelectedCurrencySlice,
        WishList: ProductsWishListSlice,
        Cart: ProductCartSlice,
        Components: ComponentsSlice
    }
})