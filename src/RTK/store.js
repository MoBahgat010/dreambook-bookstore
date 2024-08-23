import { configureStore } from "@reduxjs/toolkit";
import SelectCountrySlice from "./Slices/SelectedCountrySlice"
import ProductsWishListSlice from "./Slices/ProductsWishListSlice"
import ProductCartSlice from "./Slices/ProductCartSlice"
import ComponentsSlice from "./Slices/ComponentsSlice"
import AuthorizationSlice from "./Slices/AuthorizationSlice";
import FetchProductsSlice from "./Slices/FetchProductsSlice";
import NewsEmailSlice from "./Slices/NewsEmailSlice";

export const store = configureStore({
    reducer: {
        SelectCountry: SelectCountrySlice,
        WishList: ProductsWishListSlice,
        Cart: ProductCartSlice,
        Components: ComponentsSlice,
        Authorization: AuthorizationSlice,
        ShopPage: FetchProductsSlice,
        NewsEmail: NewsEmailSlice
    }
})