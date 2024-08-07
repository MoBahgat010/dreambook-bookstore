import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    CartProducts: [],
    Cartloader: false,
    cartTotal: 0
}

export const AddToCartAction = createAsyncThunk("ProductCartSlice/addToCart", async ({ id, quantity}, { getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry; 
    const response = await axios.post('http://localhost:3500/api/v1/carts', {
        'product': id,
        // 'quantity': quantity
      }, {
        headers: {
          'token': token,
          'currency': countryCurrency,
        //   'Content-Type': 'application/json'
        }
      }
    );
})

export const ProductCartSlice = createSlice({
    name: 'productCart',
    initialState: initialstate,
    reducers: {
        addProduct: (state, action) => {
            let flag = true;
            state.CartProducts.forEach(product => {
                if (product.id === action.payload.id) {
                    product.quantity += action.payload.quantity; 
                    state.cartTotal += action.payload.quantity * action.payload.price;
                    flag = false;
                }
            });
            if(flag) {
                state.cartTotal += action.payload.quantity * action.payload.price;
                state.CartProducts.push(action.payload);
            }
        },
        removeProduct: (state, action) => {
            state.CartProducts = state.CartProducts.filter(product => product.id !== action.payload.id);
            state.cartTotal -= action.payload.quantity * action.payload.price;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(AddToCartAction.pending, (state = initialstate) => {
                state.Cartloader = true;
            })
            .addCase(AddToCartAction.fulfilled, (state = initialstate) => {
                state.Cartloader = false;
            })
            .addCase(AddToCartAction.rejected, (state = initialstate) => {
                state.Cartloader = false;
            })
}) 

export const { addProduct, removeProduct } = ProductCartSlice.actions;
export default ProductCartSlice.reducer;