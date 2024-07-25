import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    products: []
}

export const ProductCartSlice = createSlice({
    name: 'productCart',
    initialState: initialstate,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload)
        }
    }
}) 

export const { addProduct, removeProduct } = ProductCartSlice.actions;
export default ProductCartSlice.reducer;