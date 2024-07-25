import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    wishproducts: []
}

export const ProductsWishListSlice = createSlice({
    name: "ProductsWishList",
    initialState: initialstate,
    reducers: {
        addProductToWishList: (state, action) => {
            state.wishproducts.push(action.payload)
        },
        removeProductFromWishList: (state, action) => {
            // state.wishproducts = state.wishproducts.filter((product) => product.id !== action.payload);
            state.wishproducts.splice(action.payload, 1);
        }
    }
})

export const { addProductToWishList, removeProductFromWishList } = ProductsWishListSlice.actions;
export default ProductsWishListSlice.reducer;