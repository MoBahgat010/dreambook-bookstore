import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    CartProducts: []
}

export const ProductCartSlice = createSlice({
    name: 'productCart',
    initialState: initialstate,
    reducers: {
        addProduct: (state, action) => {
            state.CartProducts.push(action.payload)
        },
        removeProduct: (state, action) => {
            // state.CartProducts = state.CartProducts.filter((product) => product.id !== action.payload)
            state.CartProducts.splice(action.payload, 1);
        }
    }
}) 

export const { addProduct, removeProduct } = ProductCartSlice.actions;
export default ProductCartSlice.reducer;